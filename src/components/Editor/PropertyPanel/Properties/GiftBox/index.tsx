import React, { useState } from 'react';
import { useBuilderStore } from '../../../../../store/builderStore';
import type { BlockInstance } from '../../../../../types';

interface GiftBoxPropertiesProps {
  block: BlockInstance;
}

export const GiftBoxProperties = ({ block }: GiftBoxPropertiesProps) => {
  const { updateBlockContent, updateBlockStyle } = useBuilderStore();
  const [activeTab, setActiveTab] = useState<'tasarim' | 'icerik' | 'islevler'>('tasarim');
  
  // Temel değerleri al
  const boxCount = block.content.boxCount || 3;
  const boxType = block.content.boxType || 'gift';
  const animationType = block.content.animationType || 'fade';
  const couponType = block.content.couponType || 'random';
  const allowReplay = block.content.allowReplay || false;
  const couponCodes = block.content.couponCodes || ['INDIRIM10', 'INDIRIM15', 'INDIRIM20', 'INDIRIM25', 'INDIRIM30'];
  const useForm = block.content.useForm || false;
  const formFields = block.content.formFields || [];
  const singleCouponWithTryAgain = block.content.singleCouponWithTryAgain || false;
  
  // İçerik güncelleme fonksiyonu
  const handleContentChange = (key: string, value: any) => {
    updateBlockContent(block.id, {
      ...block.content,
      [key]: value
    });
  };
  
  // Stil güncelleme fonksiyonu
  const handleStyleChange = (key: string, value: string) => {
    updateBlockStyle(block.id, { [key]: value });
  };
  
  // Kupon kodlarını güncelleme
  const handleCouponCodeChange = (index: number, value: string) => {
    const newCouponCodes = [...couponCodes];
    newCouponCodes[index] = value;
    handleContentChange('couponCodes', newCouponCodes);
  };
  
  // Kupon kodu ekleme
  const handleAddCouponCode = () => {
    const newCouponCodes = [...couponCodes, `INDIRIM${couponCodes.length + 1}0`];
    handleContentChange('couponCodes', newCouponCodes);
  };
  
  // Kupon kodu silme
  const handleRemoveCouponCode = (index: number) => {
    const newCouponCodes = [...couponCodes];
    newCouponCodes.splice(index, 1);
    handleContentChange('couponCodes', newCouponCodes);
  };

  // Form alanı ekleme
  const handleAddFormField = () => {
    const newFormFields = [...formFields, {
      type: 'input-text',
      label: `Alan ${formFields.length + 1}`,
      placeholder: 'Değer girin',
      required: false
    }];
    handleContentChange('formFields', newFormFields);
  };

  // Form alanı silme
  const handleRemoveFormField = (index: number) => {
    const newFormFields = [...formFields];
    newFormFields.splice(index, 1);
    handleContentChange('formFields', newFormFields);
  };

  // Form alanı güncelleme
  const handleFormFieldChange = (index: number, key: string, value: any) => {
    const newFormFields = [...formFields];
    newFormFields[index] = {
      ...newFormFields[index],
      [key]: value
    };
    handleContentChange('formFields', newFormFields);
  };

  // Kupon kodlarını kutu sayısına eşitleme
  const syncCouponCodesWithBoxCount = () => {
    if (singleCouponWithTryAgain) return;
    
    const currentCount = couponCodes.length;
    if (currentCount < boxCount) {
      // Kupon kodu ekle
      const newCodes = [...couponCodes];
      for (let i = currentCount; i < boxCount; i++) {
        newCodes.push(`INDIRIM${i + 1}0`);
      }
      handleContentChange('couponCodes', newCodes);
    } else if (currentCount > boxCount && couponType === 'segmented') {
      // Kupon kodu çıkar
      handleContentChange('couponCodes', couponCodes.slice(0, boxCount));
    }
  };
  
  return (
    <div className="p-4">
      <h3 className="text-lg font-medium mb-4">Hediye Kutusu Ayarları</h3>
      
      {/* Tab Menüsü */}
      <div className="flex border-b mb-4">
        <button
          className={`py-2 px-4 ${activeTab === 'tasarim' ? 'border-b-2 border-primary-500 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('tasarim')}
        >
          Tasarım
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'icerik' ? 'border-b-2 border-primary-500 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('icerik')}
        >
          İçerik
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'islevler' ? 'border-b-2 border-primary-500 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('islevler')}
        >
          İşlevler
        </button>
      </div>
      
      {/* Tasarım Ayarları */}
      {activeTab === 'tasarim' && (
        <div>
          {/* Kutu Sayısı */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Kutu Sayısı</label>
            <div className="flex items-center">
              <input
                type="range"
                min="1"
                max="5"
                value={boxCount}
                onChange={(e) => {
                  const newBoxCount = parseInt(e.target.value, 10);
                  handleContentChange('boxCount', newBoxCount);
                  // Kutu sayısı değiştiğinde kupon kodlarını güncelle
                  setTimeout(syncCouponCodesWithBoxCount, 0);
                }}
                className="flex-grow mr-2"
              />
              <span className="w-8 text-center">{boxCount}</span>
            </div>
          </div>
          
          {/* Kutu Tipi */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Kutu Tipi</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                className={`p-2 border rounded flex flex-col items-center ${boxType === 'gift' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}`}
                onClick={() => handleContentChange('boxType', 'gift')}
              >
                <span className="text-2xl mb-1">🎁</span>
                <span className="text-sm">Hediye Kutusu</span>
              </button>
              <button
                className={`p-2 border rounded flex flex-col items-center ${boxType === 'envelope' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}`}
                onClick={() => handleContentChange('boxType', 'envelope')}
              >
                <span className="text-2xl mb-1">✉️</span>
                <span className="text-sm">Zarf</span>
              </button>
            </div>
          </div>
          
          {/* Animasyon Tipi */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Açılma Animasyonu</label>
            <select
              value={animationType}
              onChange={(e) => handleContentChange('animationType', e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="fade">Solma (Fade)</option>
              <option value="zoom">Yakınlaşma (Zoom)</option>
              <option value="burst">Patlama (Burst)</option>
              <option value="spin">Dönme (Spin)</option>
            </select>
          </div>
          
          {/* Arkaplan Rengi */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Arkaplan Rengi</label>
            <div className="flex">
              <input
                type="text"
                value={block.style.backgroundColor || '#ffffff'}
                onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                className="flex-grow p-2 border rounded"
              />
              <div className="w-10 h-10 border border-gray-300 overflow-hidden ml-2">
                <input
                  type="color"
                  value={block.style.backgroundColor || '#ffffff'}
                  onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                  className="w-12 h-12 -m-1 cursor-pointer"
                />
              </div>
            </div>
          </div>
          
          {/* Text Rengi */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Metin Rengi</label>
            <div className="flex">
              <input
                type="text"
                value={block.style.color || '#000000'}
                onChange={(e) => handleStyleChange('color', e.target.value)}
                className="flex-grow p-2 border rounded"
              />
              <div className="w-10 h-10 border border-gray-300 overflow-hidden ml-2">
                <input
                  type="color"
                  value={block.style.color || '#000000'}
                  onChange={(e) => handleStyleChange('color', e.target.value)}
                  className="w-12 h-12 -m-1 cursor-pointer"
                />
              </div>
            </div>
          </div>
          
          {/* Font Ayarları */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Font Ailesi</label>
            <select
              value={block.style.fontFamily || 'sans-serif'}
              onChange={(e) => handleStyleChange('fontFamily', e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="sans-serif">Sans-serif</option>
              <option value="serif">Serif</option>
              <option value="monospace">Monospace</option>
              <option value="cursive">Cursive</option>
              <option value="fantasy">Fantasy</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Font Boyutu</label>
            <div className="flex items-center">
              <input
                type="range"
                min="12"
                max="24"
                value={parseInt(block.style.fontSize || '16', 10)}
                onChange={(e) => handleStyleChange('fontSize', `${e.target.value}px`)}
                className="flex-grow mr-2"
              />
              <span className="w-12 text-center">{block.style.fontSize || '16px'}</span>
            </div>
          </div>
        </div>
      )}
      
      {/* İçerik Ayarları */}
      {activeTab === 'icerik' && (
        <div>
          {/* Başlık */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Başlık</label>
            <input
              type="text"
              value={block.content.title || 'Bir kutu seç ve şansını dene!'}
              onChange={(e) => handleContentChange('title', e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          
          {/* Açıklama */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Açıklama</label>
            <textarea
              value={block.content.description || 'Sürpriz bir indirim kuponu kazanabilirsin.'}
              onChange={(e) => handleContentChange('description', e.target.value)}
              className="w-full p-2 border rounded"
              rows={2}
            />
          </div>
          
          {/* Sonuç Başlığı */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Sonuç Başlığı</label>
            <input
              type="text"
              value={block.content.resultTitle || 'Tebrikler!'}
              onChange={(e) => handleContentChange('resultTitle', e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          
          {/* Sonuç Mesajı */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Sonuç Mesajı</label>
            <input
              type="text"
              value={block.content.resultMessage || 'İndirim kuponunuz:'}
              onChange={(e) => handleContentChange('resultMessage', e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          
          {/* Buton Metni */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Buton Metni</label>
            <input
              type="text"
              value={block.content.buttonText || 'Kuponu Kullan'}
              onChange={(e) => handleContentChange('buttonText', e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          
          {/* Buton URL */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Buton URL</label>
            <input
              type="text"
              value={block.content.buttonUrl || '#'}
              onChange={(e) => handleContentChange('buttonUrl', e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          
          {/* Hata Başlığı */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Hata Başlığı</label>
            <input
              type="text"
              value={block.content.errorTitle || 'Oops... Hata!'}
              onChange={(e) => handleContentChange('errorTitle', e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          
          {/* Hata Mesajı */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Hata Mesajı</label>
            <input
              type="text"
              value={block.content.errorMessage || 'Bir şeyler yanlış gitti. Lütfen tekrar deneyin.'}
              onChange={(e) => handleContentChange('errorMessage', e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          
          {/* Tekrar Dene Butonu */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Tekrar Dene Butonu</label>
            <input
              type="text"
              value={block.content.tryAgainText || 'Tekrar Dene'}
              onChange={(e) => handleContentChange('tryAgainText', e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      )}
      
      {/* İşlev Ayarları */}
      {activeTab === 'islevler' && (
        <div>
          {/* Form Elementleri */}
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="useForm"
                checked={useForm}
                onChange={(e) => handleContentChange('useForm', e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="useForm" className="text-sm font-medium">Form Elementleri Kullan</label>
            </div>
            
            {useForm && (
              <div className="mt-2 p-3 bg-gray-50 rounded border">
                <p className="text-xs text-gray-500 mb-2">
                  Kullanıcıdan bilgi toplamak için form alanları ekleyin.
                </p>
                
                {formFields.map((field: any, index: number) => (
                  <div key={index} className="mb-3 p-2 bg-white rounded border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Alan {index + 1}</span>
                      <button
                        onClick={() => handleRemoveFormField(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Kaldır
                      </button>
                    </div>
                    
                    <div className="mb-2">
                      <label className="block text-xs text-gray-600 mb-1">Alan Tipi</label>
                      <select
                        value={field.type}
                        onChange={(e) => handleFormFieldChange(index, 'type', e.target.value)}
                        className="w-full p-1.5 text-sm border rounded"
                      >
                        <option value="input-text">Metin</option>
                        <option value="input-email">E-posta</option>
                        <option value="input-phone">Telefon</option>
                        <option value="checkbox">Onay Kutusu</option>
                      </select>
                    </div>
                    
                    <div className="mb-2">
                      <label className="block text-xs text-gray-600 mb-1">Etiket</label>
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) => handleFormFieldChange(index, 'label', e.target.value)}
                        className="w-full p-1.5 text-sm border rounded"
                      />
                    </div>
                    
                    {field.type !== 'checkbox' && (
                      <div className="mb-2">
                        <label className="block text-xs text-gray-600 mb-1">Placeholder</label>
                        <input
                          type="text"
                          value={field.placeholder}
                          onChange={(e) => handleFormFieldChange(index, 'placeholder', e.target.value)}
                          className="w-full p-1.5 text-sm border rounded"
                        />
                      </div>
                    )}
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`required-${index}`}
                        checked={field.required}
                        onChange={(e) => handleFormFieldChange(index, 'required', e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor={`required-${index}`} className="text-xs text-gray-600">Zorunlu Alan</label>
                    </div>
                  </div>
                ))}
                
                <button
                  onClick={handleAddFormField}
                  className="w-full mt-2 py-1.5 px-3 border border-gray-300 rounded text-sm hover:bg-gray-50"
                >
                  + Form Alanı Ekle
                </button>
              </div>
            )}
          </div>
          
          {/* Kupon Tipi */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Kupon Tipi</label>
            <select
              value={couponType}
              onChange={(e) => {
                handleContentChange('couponType', e.target.value);
                // Kupon tipi değiştiğinde kupon kodlarını güncelle
                setTimeout(syncCouponCodesWithBoxCount, 0);
              }}
              className="w-full p-2 border rounded"
            >
              <option value="random">Rastgele</option>
              <option value="fixed">Sabit (Hep Aynı)</option>
              <option value="segmented">Segmentli (Her Kutuya Özel)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              {couponType === 'random' && 'Kuponlar rastgele dağıtılır.'}
              {couponType === 'fixed' && 'Her zaman aynı kupon verilir.'}
              {couponType === 'segmented' && 'Her kutuya özel kupon atanır.'}
            </p>
          </div>

          {/* Tek Kupon Kodu Kullanımı */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="singleCouponWithTryAgain"
              checked={singleCouponWithTryAgain}
              onChange={(e) => handleContentChange('singleCouponWithTryAgain', e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="singleCouponWithTryAgain" className="text-sm">
              Tek Kupon Kodu Kullan (Diğer kutularda "Tekrar Dene" göster)
            </label>
          </div>
          
          {/* Sabit Kupon İndeksi - Sadece sabit tipte göster */}
          {couponType === 'fixed' && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Sabit Kupon</label>
              <select
                value={block.content.fixedCouponIndex || 0}
                onChange={(e) => handleContentChange('fixedCouponIndex', parseInt(e.target.value, 10))}
                className="w-full p-2 border rounded"
              >
                {couponCodes.map((code: string, index: number) => (
                  <option key={index} value={index}>
                    {code}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          {/* Kupon Kodları */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Kupon Kodları {singleCouponWithTryAgain ? '(Sadece ilk kupon kullanılacak)' : ''}
            </label>
            {couponCodes.map((code: string, index: number) => (
              <div key={index} className="mb-2 flex items-center">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => handleCouponCodeChange(index, e.target.value)}
                  className="flex-grow p-2 border rounded"
                  disabled={singleCouponWithTryAgain && index > 0}
                />
                <button
                  onClick={() => handleRemoveCouponCode(index)}
                  className="ml-2 p-2 text-red-500 hover:text-red-700"
                  disabled={couponCodes.length <= 1 || (singleCouponWithTryAgain && index === 0)}
                >
                  ✕
                </button>
              </div>
            ))}
            
            {!singleCouponWithTryAgain && (
              <button
                onClick={handleAddCouponCode}
                className="mt-2 py-1 px-3 border border-gray-300 rounded text-sm hover:bg-gray-50"
              >
                + Kupon Ekle
              </button>
            )}
          </div>
          
          {/* Tekrar Oynatma İzni */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="allowReplay"
              checked={allowReplay}
              onChange={(e) => handleContentChange('allowReplay', e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="allowReplay" className="text-sm">Tekrar Oynatmaya İzin Ver</label>
          </div>
          
          <p className="text-xs text-gray-500 mb-4">
            Bu seçenek işaretlendiğinde, kullanıcı hediye kutusunu birden fazla kez açabilir. İşaretlenmediğinde, kutu sadece bir kez açılabilir (tarayıcı bazlı).
          </p>
          
          {/* Trigger Ayarları */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Gösterim Tetikleyici</label>
            <select
              value={block.content.triggerType || 'load'}
              onChange={(e) => handleContentChange('triggerType', e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="load">Sayfa Yüklenince</option>
              <option value="scroll">Belirli Scroll Mesafesinde</option>
              <option value="exit">Çıkış Niyetinde (Exit Intent)</option>
              <option value="click">Butona Tıklayınca</option>
            </select>
          </div>
          
          {/* Scroll Yüzdesi - Sadece scroll triggerında göster */}
          {block.content.triggerType === 'scroll' && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Scroll Yüzdesi (%)</label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={block.content.scrollPercentage || 50}
                  onChange={(e) => handleContentChange('scrollPercentage', parseInt(e.target.value, 10))}
                  className="flex-grow mr-2"
                />
                <span className="w-12 text-center">{block.content.scrollPercentage || 50}%</span>
              </div>
            </div>
          )}
          
          {/* Takip Kodu */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Takip Kodu (Opsiyonel)</label>
            <textarea
              value={block.content.trackingCode || ''}
              onChange={(e) => handleContentChange('trackingCode', e.target.value)}
              className="w-full p-2 border rounded font-mono text-sm"
              rows={3}
              placeholder="GTM, Facebook Pixel vb. takip kodları"
            />
            <p className="text-xs text-gray-500 mt-1">
              Bu kod, kupon gösterildiğinde çalıştırılacaktır.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}; 