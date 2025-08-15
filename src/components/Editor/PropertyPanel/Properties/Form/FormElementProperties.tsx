import { useState } from 'react';
import { useBuilderStore } from '../../../../../store/builderStore';
import type { BlockInstance } from '../../../../../types';

interface FormElementPropertiesProps {
  block: BlockInstance;
}

export const FormElementProperties = ({ block }: FormElementPropertiesProps) => {
  const { updateBlockContent, updateBlock } = useBuilderStore();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showStyleSettings, setShowStyleSettings] = useState(false);
  const [showPositionSettings, setShowPositionSettings] = useState(false);
  
  // Form elementi tipine göre özel özellikler
  const renderSpecificProperties = () => {
    switch (block.type) {
      case 'input-name':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Etiket
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.content.label || 'İsim Soyisim'}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, label: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Placeholder
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.content.placeholder || 'İsim ve soyisim giriniz'}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, placeholder: e.target.value })}
              />
            </div>
          </>
        );
        
      case 'input-email':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Etiket
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.content.label || 'E-posta'}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, label: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Placeholder
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.content.placeholder || 'E-posta adresinizi giriniz'}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, placeholder: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={block.content.validateEmail || true}
                  onChange={(e) => updateBlockContent(block.id, { ...block.content, validateEmail: e.target.checked })}
                />
                <span className="text-sm">E-posta Doğrulaması</span>
              </label>
            </div>
          </>
        );
        
      case 'input-phone':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Etiket
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.content.label || 'Telefon'}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, label: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Placeholder
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.content.placeholder || 'Telefon numaranızı giriniz'}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, placeholder: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Format
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.content.format || 'standard'}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, format: e.target.value })}
              >
                <option value="standard">Standart</option>
                <option value="withCountryCode">Ülke Kodu İle</option>
                <option value="formatted">Formatlı (xxx) xxx-xxxx</option>
              </select>
            </div>
          </>
        );
        
      case 'input-date':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Etiket
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.content.label || 'Tarih'}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, label: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Tarih
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.content.minDate || ''}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, minDate: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Tarih
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.content.maxDate || ''}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, maxDate: e.target.value })}
              />
            </div>
          </>
        );
        
      case 'input-gender':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Etiket
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.content.label || 'Cinsiyet'}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, label: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Seçenekler (virgülle ayırın)
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={(block.content.options || ['Erkek', 'Kadın', 'Diğer']).join(', ')}
                onChange={(e) => updateBlockContent(block.id, { 
                  ...block.content, 
                  options: e.target.value.split(',').map(option => option.trim()) 
                })}
              />
            </div>
          </>
        );
        
      case 'dropdown-city':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Etiket
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.content.label || 'Şehir'}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, label: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Placeholder
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.content.placeholder || 'Şehir seçiniz'}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, placeholder: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Seçenekler (her satırda bir şehir)
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={5}
                value={(block.content.options || ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya']).join('\n')}
                onChange={(e) => updateBlockContent(block.id, { 
                  ...block.content, 
                  options: e.target.value.split('\n').map(option => option.trim()).filter(option => option !== '')
                })}
              />
            </div>
          </>
        );

      case 'checkbox-consent':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Etiket
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.content.label || 'Onay'}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, label: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Onay Metni
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                value={block.content.text || 'Kullanım koşullarını kabul ediyorum.'}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, text: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={block.content.defaultChecked || false}
                  onChange={(e) => updateBlockContent(block.id, { ...block.content, defaultChecked: e.target.checked })}
                />
                <span className="text-sm">Varsayılan İşaretli</span>
              </label>
            </div>
          </>
        );

      case 'radio-consent':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Etiket
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.content.label || 'Seçenekler'}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, label: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Seçenekler (her satırda bir seçenek)
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={4}
                value={(block.content.options || ['Evet', 'Hayır', 'Belki']).join('\n')}
                onChange={(e) => updateBlockContent(block.id, { 
                  ...block.content, 
                  options: e.target.value.split('\n').map(option => option.trim()).filter(option => option !== '')
                })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Varsayılan Seçim
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.content.defaultValue || ''}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, defaultValue: e.target.value })}
              >
                <option value="">Seçim Yok</option>
                {(block.content.options || ['Evet', 'Hayır', 'Belki']).map((option: string, index: number) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </>
        );

      case 'submit-button':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Buton Metni
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.content.text || 'Gönder'}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, text: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Buton Rengi
              </label>
              <input
                type="color"
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md"
                value={block.content.buttonColor || '#0284c7'}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, buttonColor: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Yazı Rengi
              </label>
              <input
                type="color"
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md"
                value={block.content.textColor || '#ffffff'}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, textColor: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hover Rengi
              </label>
              <input
                type="color"
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md"
                value={block.content.hoverColor || '#0369a1'}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, hoverColor: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Buton Genişliği
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.content.buttonWidth || 'auto'}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, buttonWidth: e.target.value })}
              >
                <option value="auto">Otomatik</option>
                <option value="full">Tam Genişlik</option>
                <option value="half">Yarım Genişlik</option>
                <option value="custom">Özel</option>
              </select>
            </div>
            {block.content.buttonWidth === 'custom' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Özel Genişlik
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={block.content.customWidth || '150px'}
                  onChange={(e) => updateBlockContent(block.id, { ...block.content, customWidth: e.target.value })}
                />
              </div>
            )}
          </>
        );
        
      default:
        return null;
    }
  };
  
  // Pozisyon ayarları
  const renderPositionSettings = () => {
    return (
      <div className="mt-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            X Konumu (px veya %)
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={block.position.x}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value)) {
                updateBlock(block.id, { 
                  position: { ...block.position, x: value } 
                });
              }
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Y Konumu (px veya %)
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={block.position.y}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value)) {
                updateBlock(block.id, { 
                  position: { ...block.position, y: value } 
                });
              }
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Z-Index
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={block.zIndex || 1}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value)) {
                updateBlock(block.id, { zIndex: value });
              }
            }}
          />
        </div>
      </div>
    );
  };
  
  return (
    <div className="p-4">
      <h3 className="text-lg font-medium mb-4">Form Elementi Özellikleri</h3>
      
      {/* Temel özellikler */}
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={block.content.required || false}
            onChange={(e) => updateBlockContent(block.id, { ...block.content, required: e.target.checked })}
          />
          <span className="text-sm">Zorunlu Alan</span>
        </label>
      </div>
      
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={block.content.showError || false}
            onChange={(e) => updateBlockContent(block.id, { ...block.content, showError: e.target.checked })}
          />
          <span className="text-sm">Hata Mesajı Göster</span>
        </label>
      </div>
      
      {block.content.showError && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hata Mesajı
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={block.content.errorMessage || ''}
            onChange={(e) => updateBlockContent(block.id, { ...block.content, errorMessage: e.target.value })}
          />
        </div>
      )}
      
      {/* Element tipine özel özellikler */}
      {renderSpecificProperties()}
      
      {/* Stil ayarları */}
      <div className="mt-6">
        <button
          type="button"
          className="flex items-center text-sm text-blue-600 mb-3"
          onClick={() => setShowStyleSettings(!showStyleSettings)}
        >
          {showStyleSettings ? '▼' : '►'} Stil Ayarları
        </button>
        
        {showStyleSettings && (
          <div className="pl-4 border-l-2 border-blue-200">
            {/* Stil ve boyut ayarları */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Genişlik (px veya %)
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.style.width || '100%'}
                onChange={(e) => updateBlock(block.id, { 
                  style: { ...block.style, width: e.target.value } 
                })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Yükseklik (px)
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.style.height || 'auto'}
                onChange={(e) => updateBlock(block.id, { 
                  style: { ...block.style, height: e.target.value } 
                })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dolgu (Padding)
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.style.padding || '0'}
                onChange={(e) => updateBlock(block.id, { 
                  style: { ...block.style, padding: e.target.value } 
                })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kenar Boşluğu (Margin)
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.style.margin || '0'}
                onChange={(e) => updateBlock(block.id, { 
                  style: { ...block.style, margin: e.target.value } 
                })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kenarlık Rengi
              </label>
              <input
                type="color"
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md"
                value={block.style.borderColor || '#000000'}
                onChange={(e) => updateBlock(block.id, { 
                  style: { ...block.style, borderColor: e.target.value } 
                })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kenarlık Kalınlığı
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.style.borderWidth || '1px'}
                onChange={(e) => updateBlock(block.id, { 
                  style: { ...block.style, borderWidth: e.target.value } 
                })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kenarlık Tipi
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.style.borderStyle || 'solid'}
                onChange={(e) => updateBlock(block.id, { 
                  style: { ...block.style, borderStyle: e.target.value } 
                })}
              >
                <option value="none">Yok</option>
                <option value="solid">Düz</option>
                <option value="dashed">Kesikli</option>
                <option value="dotted">Noktalı</option>
                <option value="double">Çift</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kenarlık Yarıçapı
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.style.borderRadius || '0'}
                onChange={(e) => updateBlock(block.id, { 
                  style: { ...block.style, borderRadius: e.target.value } 
                })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Arka Plan Rengi
              </label>
              <input
                type="color"
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md"
                value={block.style.backgroundColor || '#ffffff'}
                onChange={(e) => updateBlock(block.id, { 
                  style: { ...block.style, backgroundColor: e.target.value } 
                })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Yazı Tipi Boyutu
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.style.fontSize || '16px'}
                onChange={(e) => updateBlock(block.id, { 
                  style: { ...block.style, fontSize: e.target.value } 
                })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Yazı Rengi
              </label>
              <input
                type="color"
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md"
                value={block.style.color || '#000000'}
                onChange={(e) => updateBlock(block.id, { 
                  style: { ...block.style, color: e.target.value } 
                })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Yazı Tipi Ailesi
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.style.fontFamily || 'Arial, sans-serif'}
                onChange={(e) => updateBlock(block.id, { 
                  style: { ...block.style, fontFamily: e.target.value } 
                })}
              >
                <option value="Arial, sans-serif">Arial</option>
                <option value="'Helvetica Neue', Helvetica, sans-serif">Helvetica</option>
                <option value="'Times New Roman', Times, serif">Times New Roman</option>
                <option value="Georgia, serif">Georgia</option>
                <option value="Verdana, Geneva, sans-serif">Verdana</option>
                <option value="'Courier New', Courier, monospace">Courier New</option>
                <option value="'Open Sans', sans-serif">Open Sans</option>
                <option value="'Roboto', sans-serif">Roboto</option>
              </select>
            </div>
          </div>
        )}
      </div>
      
      {/* Pozisyon ayarları */}
      <div className="mt-4">
        <button
          type="button"
          className="flex items-center text-sm text-blue-600 mb-3"
          onClick={() => setShowPositionSettings(!showPositionSettings)}
        >
          {showPositionSettings ? '▼' : '►'} Pozisyon Ayarları
        </button>
        
        {showPositionSettings && renderPositionSettings()}
      </div>
      
      {/* Gelişmiş özellikler */}
      <div className="mt-6">
        <button
          type="button"
          className="flex items-center text-sm text-blue-600"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? '▼' : '►'} Gelişmiş Özellikler
        </button>
        
        {showAdvanced && (
          <div className="mt-4 pl-4 border-l-2 border-blue-200">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Özel CSS
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={4}
                value={block.content.customCSS || ''}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, customCSS: e.target.value })}
                placeholder="örn: color: red; font-weight: bold;"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Veri İsmi (API için)
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.content.dataName || ''}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, dataName: e.target.value })}
                placeholder="örn: user_name"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Doğrulama Kuralı
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.content.validationRule || 'none'}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, validationRule: e.target.value })}
              >
                <option value="none">Yok</option>
                <option value="email">E-posta</option>
                <option value="phone">Telefon</option>
                <option value="number">Sayı</option>
                <option value="letters">Sadece Harfler</option>
                <option value="custom">Özel Regex</option>
              </select>
            </div>
            
            {block.content.validationRule === 'custom' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Özel Regex Deseni
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={block.content.customRegex || ''}
                  onChange={(e) => updateBlockContent(block.id, { ...block.content, customRegex: e.target.value })}
                  placeholder="örn: ^[a-zA-Z0-9]+$"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}; 