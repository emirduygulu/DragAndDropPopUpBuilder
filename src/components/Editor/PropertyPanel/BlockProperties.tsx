import type { BlockInstance } from '../../../types';
import { GiftBoxProperties } from './Properties/GiftBox';
import { CountdownProperties } from './Properties/Countdown/CountdownProperties';
import { useBuilderStore } from '../../../store/builderStore';
import { useState, useRef } from 'react';

interface BlockPropertiesProps {
  block: BlockInstance;
}

export const BlockProperties = ({ block }: BlockPropertiesProps) => {
  // Blok tipine göre uygun özellikler panelini göster
  const renderPropertiesPanel = () => {
    switch (block.type) {
      // Form bileşenleri - Henüz özel property panelleri oluşturulmadı
      case 'input-name':
      case 'input-email':
      case 'input-phone':
      case 'input-city':
      case 'input-gender':
      case 'input-address':
      case 'input-date':
      case 'dropdown-city':
      case 'checkbox-consent':
      case 'radio-consent':
      case 'submit-button':
        // Geçici olarak genel özellikler panelini kullan
        return renderBasicBlockProperties(block);
        
      // Special bileşenleri
      case 'gift-box':
        return <GiftBoxProperties block={block} />;
      case 'countdown-timer':
        return <CountdownProperties block={block} />;
      case 'progress-bar':
      case 'social-icons':
      case 'video':
      case 'spin-wheel':
        // Geçici olarak genel özellikler panelini kullan
        return renderBasicBlockProperties(block);
        
      // Basic bileşenler - Genel özellikler paneli
      case 'text':
      case 'image':
      case 'button':
      case 'divider':
      case 'spacer':
      case 'geometric':
      case 'html':
      case 'heading':
      case 'close-button':
        return renderBasicBlockProperties(block);
        
      // Diğer bileşenler için paneller eklenecek
      default:
        // Varsayılan özellikler paneli
        return (
          <div className="p-4">
            <p className="text-gray-500">Bu blok tipi için özellikler henüz eklenmedi.</p>
            <p className="text-sm text-gray-400 mt-2">Blok Tipi: {block.type}</p>
          </div>
        );
    }
  };
  
  // Basic bileşenler için genel özellikler paneli
  const renderBasicBlockProperties = (block: BlockInstance) => {
    const { updateBlockContent, updateBlockStyle, removeBlock, resizeBlock, moveBlock } = useBuilderStore();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    
    const handleStyleChange = (key: string, value: string) => {
      updateBlockStyle(block.id, { [key]: value });
    };
    
    const handleContentChange = (key: string, value: any) => {
      updateBlockContent(block.id, {
        ...block.content,
        [key]: value
      });
    };
    
    const handleSizeChange = (dimension: 'width' | 'height', value: string) => {
      const numValue = parseInt(value, 10);
      if (!isNaN(numValue) && numValue > 0) {
        resizeBlock(block.id, { 
          ...block.size, 
          [dimension]: numValue 
        });
      }
    };
    
    const handlePositionChange = (axis: 'x' | 'y', value: string) => {
      const numValue = parseInt(value, 10);
      if (!isNaN(numValue) && numValue >= 0) {
        moveBlock(block.id, { 
          ...block.position, 
          [axis]: numValue 
        });
      }
    };
    
    const handleDeleteBlock = () => {
      removeBlock(block.id);
    };
    
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      
      setUploadingImage(true);
      
      // FileReader kullanarak dosyayı base64'e çeviriyoruz
      const reader = new FileReader();
      reader.onloadend = () => {
        // Base64 formatındaki görsel verisini src olarak ayarlıyoruz
        if (typeof reader.result === 'string') {
          handleContentChange('src', reader.result);
          setUploadingImage(false);
        }
      };
      
      reader.onerror = () => {
        console.error('Görsel yükleme hatası');
        setUploadingImage(false);
      };
      
      reader.readAsDataURL(file);
    };
    
    const triggerFileInput = () => {
      fileInputRef.current?.click();
    };
    
    return (
      <div className="p-4 space-y-6">
        {/* Silme butonu */}
        <div>
          <button
            onClick={handleDeleteBlock}
            className="w-full py-2 bg-red-500 text-white font-medium rounded hover:bg-red-600 focus:outline-none"
          >
            Bloğu Sil
          </button>
        </div>
        
        {/* Blok tipi başlığı */}
        <div>
          <h3 className="font-medium mb-4">
            {block.type === 'text' && 'Metin Bloğu'}
            {block.type === 'image' && 'Görsel Bloğu'}
            {block.type === 'button' && 'Buton Bloğu'}
            {block.type === 'divider' && 'Ayırıcı Bloğu'}
            {block.type === 'spacer' && 'Boşluk Bloğu'}
            {block.type === 'geometric' && 'Geometrik Şekil Bloğu'}
            {block.type === 'html' && 'HTML Bloğu'}
            {block.type === 'heading' && 'Başlık Bloğu'}
            {block.type === 'close-button' && 'Kapat Butonu Bloğu'}
          </h3>
        </div>
        
        {/* İçerik ayarları - blok tipine göre değişir */}
        {(block.type === 'text' || block.type === 'heading') && (
          <div>
            <h4 className="font-medium mb-2">İçerik</h4>
            <textarea
              className="w-full p-2 border rounded"
              rows={3}
              value={block.content.text || ''}
              onChange={(e) => handleContentChange('text', e.target.value)}
            />
          </div>
        )}
        
        {block.type === 'image' && (
          <div>
            {/* Görsel Yükleme */}
            <div className="mb-4">
              <h4 className="font-medium mb-2">Görsel Yükle</h4>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                onClick={triggerFileInput}
                className="w-full py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 focus:outline-none"
                disabled={uploadingImage}
              >
                {uploadingImage ? 'Yükleniyor...' : 'Görsel Seç'}
              </button>
            </div>
            
            {/* Görsel Önizleme */}
            {block.content.src && (
              <div className="mb-4">
                <h4 className="font-medium mb-2">Önizleme</h4>
                <div className="border rounded p-2 flex justify-center">
                  <img 
                    src={block.content.src} 
                    alt={block.content.alt || ''} 
                    className="max-h-40 object-contain"
                  />
                </div>
              </div>
            )}
            
            {/* Görsel URL (Alternatif olarak manuel giriş) */}
            <div className="mb-4">
              <h4 className="font-medium mb-2">Görsel URL (Opsiyonel)</h4>
              <input
                type="text"
                className="w-full p-2 border rounded mb-2"
                value={block.content.src || ''}
                onChange={(e) => handleContentChange('src', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-xs text-gray-500">
                Görsel yüklenemediğinde veya ekran okuyucular için görüntülenir.
              </p>
            </div>
            
            {/* Alternatif Metin */}
            <div>
              <h4 className="font-medium mb-2">Alternatif Metin</h4>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={block.content.alt || ''}
                onChange={(e) => handleContentChange('alt', e.target.value)}
                placeholder="Görsel açıklaması"
              />
              <p className="text-xs text-gray-500 mt-1">
                Görsel yüklenemediğinde veya ekran okuyucular için görüntülenir.
              </p>
            </div>
          </div>
        )}
        
        {block.type === 'button' && (
          <div className="space-y-3">
            <div>
              <h4 className="font-medium mb-2">Buton Metni</h4>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={block.content.text || 'Buton'}
                onChange={(e) => handleContentChange('text', e.target.value)}
              />
            </div>
            <div>
              <h4 className="font-medium mb-2">Link URL</h4>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={block.content.url || '#'}
                onChange={(e) => handleContentChange('url', e.target.value)}
                placeholder="https://example.com"
              />
            </div>
          </div>
        )}
        
        {block.type === 'html' && (
          <div>
            <h4 className="font-medium mb-2">HTML Kodu</h4>
            <textarea
              className="w-full p-2 border rounded font-mono text-sm"
              rows={6}
              value={block.content.html || ''}
              onChange={(e) => handleContentChange('html', e.target.value)}
            />
          </div>
        )}
        
        <div>
          <h3 className="font-medium mb-4">Konum ve Boyut Ayarları</h3>
          
          <div className="grid grid-cols-2 gap-4">
            {/* X Konumu */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                X Konumu (px)
              </label>
              <input
                type="number"
                className="input w-full"
                min="0"
                value={block.position.x}
                onChange={(e) => handlePositionChange('x', e.target.value)}
              />
            </div>
            
            {/* Y Konumu */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Y Konumu (px)
              </label>
              <input
                type="number"
                className="input w-full"
                min="0"
                value={block.position.y}
                onChange={(e) => handlePositionChange('y', e.target.value)}
              />
            </div>
            
            {/* Genişlik */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Genişlik (px)
              </label>
              <input
                type="number"
                className="input w-full"
                min="10"
                value={block.size.width}
                onChange={(e) => handleSizeChange('width', e.target.value)}
              />
            </div>
            
            {/* Yükseklik */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Yükseklik (px)
              </label>
              <input
                type="number"
                className="input w-full"
                min="10"
                value={block.size.height}
                onChange={(e) => handleSizeChange('height', e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-4">Stil Ayarları</h3>
          
          <div className="space-y-4">
            {/* Metin Rengi */}
            {(block.type === 'text' || block.type === 'button' || block.type === 'heading') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Metin Rengi
                </label>
                <div className="flex">
                  <input
                    type="text"
                    className="input flex-grow"
                    value={block.style.color || '#000000'}
                    onChange={(e) => handleStyleChange('color', e.target.value)}
                  />
                  <div className="w-10 h-10 border border-gray-300 overflow-hidden ml-2">
                    <input
                      type="color"
                      className="w-12 h-12 -m-1 cursor-pointer"
                      value={block.style.color || '#000000'}
                      onChange={(e) => handleStyleChange('color', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Arkaplan Rengi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Arkaplan Rengi
              </label>
              <div className="flex">
                <input
                  type="text"
                  className="input flex-grow"
                  value={block.style.backgroundColor || 'transparent'}
                  onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                />
                <div className="w-10 h-10 border border-gray-300 overflow-hidden ml-2">
                  <input
                    type="color"
                    className="w-12 h-12 -m-1 cursor-pointer"
                    value={block.style.backgroundColor || '#ffffff'}
                    onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            {/* Font Boyutu */}
            {(block.type === 'text' || block.type === 'button' || block.type === 'heading') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Font Boyutu
                </label>
                <select
                  className="input w-full"
                  value={block.style.fontSize || '16px'}
                  onChange={(e) => handleStyleChange('fontSize', e.target.value)}
                >
                  <option value="12px">12px</option>
                  <option value="14px">14px</option>
                  <option value="16px">16px</option>
                  <option value="18px">18px</option>
                  <option value="20px">20px</option>
                  <option value="24px">24px</option>
                  <option value="28px">28px</option>
                  <option value="32px">32px</option>
                  <option value="36px">36px</option>
                  <option value="48px">48px</option>
                </select>
              </div>
            )}
            
            {/* Font Ailesi */}
            {(block.type === 'text' || block.type === 'button' || block.type === 'heading') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Font Ailesi
                </label>
                <select
                  className="input w-full"
                  value={block.style.fontFamily || 'sans-serif'}
                  onChange={(e) => handleStyleChange('fontFamily', e.target.value)}
                >
                  <option value="sans-serif">Sans-serif</option>
                  <option value="serif">Serif</option>
                  <option value="monospace">Monospace</option>
                  <option value="cursive">Cursive</option>
                  <option value="fantasy">Fantasy</option>
                </select>
              </div>
            )}
            
            {/* Font Ağırlığı */}
            {(block.type === 'text' || block.type === 'button' || block.type === 'heading') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Font Ağırlığı
                </label>
                <select
                  className="input w-full"
                  value={block.style.fontWeight || 'normal'}
                  onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
                >
                  <option value="normal">Normal</option>
                  <option value="bold">Kalın</option>
                  <option value="lighter">İnce</option>
                  <option value="bolder">Daha Kalın</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="400">400</option>
                  <option value="500">500</option>
                  <option value="600">600</option>
                  <option value="700">700</option>
                  <option value="800">800</option>
                  <option value="900">900</option>
                </select>
              </div>
            )}
            
            {/* Kenar Yuvarlaklığı */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kenar Yuvarlaklığı
              </label>
              <select
                className="input w-full"
                value={block.style.borderRadius || '0'}
                onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
              >
                <option value="0">Köşeli</option>
                <option value="4px">Hafif Yuvarlak (4px)</option>
                <option value="8px">Yuvarlak (8px)</option>
                <option value="16px">Çok Yuvarlak (16px)</option>
                <option value="24px">Tam Yuvarlak (24px)</option>
                <option value="50%">Daire</option>
              </select>
            </div>
            
            {/* Kenarlık */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kenarlık
              </label>
              <input
                type="text"
                className="input w-full"
                value={block.style.border || 'none'}
                onChange={(e) => handleStyleChange('border', e.target.value)}
                placeholder="1px solid #000000"
              />
            </div>
            
            {/* Özel CSS */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Özel CSS
              </label>
              <textarea
                className="input w-full"
                rows={5}
                placeholder="Örnek: box-shadow: 0 2px 4px rgba(0,0,0,0.1);"
                value={block.content.customCSS || ''}
                onChange={(e) => handleContentChange('customCSS', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                CSS özelliklerini yazın. Örnek: box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return renderPropertiesPanel();
}; 