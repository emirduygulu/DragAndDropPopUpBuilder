import { useState } from 'react';
import { useBuilderStore } from '../../../../../store/builderStore';
import type { BlockInstance } from '../../../../../types';

interface FormContainerPropertiesProps {
  block: BlockInstance;
}

export const FormContainerProperties = ({ block }: FormContainerPropertiesProps) => {
  const { updateBlockContent, updateBlockStyle } = useBuilderStore();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showFlexbox, setShowFlexbox] = useState(false);
  const [showStyling, setShowStyling] = useState(false);
  
  return (
    <div className="p-4 overflow-y-auto max-h-[calc(100vh-100px)]">
      <h3 className="text-lg font-medium mb-4">Form Konteyneri Özellikleri</h3>
      
      {/* Temel özellikler */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Form Başlığı
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={block.content.title || ''}
          onChange={(e) => updateBlockContent(block.id, { ...block.content, title: e.target.value })}
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Form Action URL
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={block.content.action || '#'}
          onChange={(e) => updateBlockContent(block.id, { ...block.content, action: e.target.value })}
          placeholder="örn: https://example.com/submit"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Form Method
        </label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={block.content.method || 'post'}
          onChange={(e) => updateBlockContent(block.id, { ...block.content, method: e.target.value })}
        >
          <option value="post">POST</option>
          <option value="get">GET</option>
        </select>
      </div>
      
      {/* Flexbox Ayarları */}
      <div className="mt-6">
        <button
          type="button"
          className="flex items-center text-sm text-blue-600 w-full justify-between"
          onClick={() => setShowFlexbox(!showFlexbox)}
        >
          <span className="font-medium">Flexbox Ayarları</span>
          <span>{showFlexbox ? '▼' : '►'}</span>
        </button>
        
        {showFlexbox && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Flex Yönü
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.content.flexDirection || 'column'}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, flexDirection: e.target.value })}
              >
                <option value="row">Yatay (Row)</option>
                <option value="column">Dikey (Column)</option>
                <option value="row-reverse">Yatay Ters (Row Reverse)</option>
                <option value="column-reverse">Dikey Ters (Column Reverse)</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Justify Content
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.content.justifyContent || 'flex-start'}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, justifyContent: e.target.value })}
              >
                <option value="flex-start">Başlangıç (flex-start)</option>
                <option value="center">Orta (center)</option>
                <option value="flex-end">Son (flex-end)</option>
                <option value="space-between">Aralıklı (space-between)</option>
                <option value="space-around">Çevrili (space-around)</option>
                <option value="space-evenly">Eşit Aralıklı (space-evenly)</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Align Items
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.content.alignItems || 'stretch'}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, alignItems: e.target.value })}
              >
                <option value="flex-start">Başlangıç (flex-start)</option>
                <option value="center">Orta (center)</option>
                <option value="flex-end">Son (flex-end)</option>
                <option value="stretch">Uzat (stretch)</option>
                <option value="baseline">Taban Çizgisi (baseline)</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Flex Wrap
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.content.flexWrap || 'nowrap'}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, flexWrap: e.target.value })}
              >
                <option value="nowrap">Sarma (nowrap)</option>
                <option value="wrap">Sar (wrap)</option>
                <option value="wrap-reverse">Ters Sar (wrap-reverse)</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gap (Boşluk)
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="w-20 px-3 py-2 border border-gray-300 rounded-md"
                  value={parseInt(block.content.gap?.replace('px', '') || '15')}
                  onChange={(e) => updateBlockContent(block.id, { ...block.content, gap: `${e.target.value}px` })}
                />
                <span className="ml-2">px</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Stil Ayarları */}
      <div className="mt-6">
        <button
          type="button"
          className="flex items-center text-sm text-blue-600 w-full justify-between"
          onClick={() => setShowStyling(!showStyling)}
        >
          <span className="font-medium">Stil Ayarları</span>
          <span>{showStyling ? '▼' : '►'}</span>
        </button>
        
        {showStyling && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Arka Plan Rengi
              </label>
              <div className="flex">
                <input
                  type="text"
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md"
                  value={block.style.backgroundColor || '#f9fafb'}
                  onChange={(e) => updateBlockStyle(block.id, { backgroundColor: e.target.value })}
                />
                <input
                  type="color"
                  className="w-10 h-10 border border-gray-300 rounded-r-md"
                  value={block.style.backgroundColor || '#f9fafb'}
                  onChange={(e) => updateBlockStyle(block.id, { backgroundColor: e.target.value })}
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Padding
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="w-20 px-3 py-2 border border-gray-300 rounded-md"
                  value={parseInt(block.style.padding?.replace('px', '') || '20')}
                  onChange={(e) => updateBlockStyle(block.id, { padding: `${e.target.value}px` })}
                />
                <span className="ml-2">px</span>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kenar Yuvarlaklığı
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="0"
                  max="20"
                  className="w-full"
                  value={parseInt(block.style.borderRadius?.replace('px', '') || '8')}
                  onChange={(e) => updateBlockStyle(block.id, { borderRadius: `${e.target.value}px` })}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0px</span>
                <span>20px</span>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kenarlık
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.style.border || '1px solid #e5e7eb'}
                onChange={(e) => updateBlockStyle(block.id, { border: e.target.value })}
                placeholder="1px solid #e5e7eb"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gölge (Box Shadow)
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.style.boxShadow || '0 2px 4px rgba(0, 0, 0, 0.1)'}
                onChange={(e) => updateBlockStyle(block.id, { boxShadow: e.target.value })}
                placeholder="0 2px 4px rgba(0, 0, 0, 0.1)"
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Gelişmiş özellikler */}
      <div className="mt-6">
        <button
          type="button"
          className="flex items-center text-sm text-blue-600 w-full justify-between"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          <span className="font-medium">Gelişmiş Özellikler</span>
          <span>{showAdvanced ? '▼' : '►'}</span>
        </button>
        
        {showAdvanced && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Form ID
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.content.formId || ''}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, formId: e.target.value })}
                placeholder="örn: contact-form"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Form Gönderim Mesajı
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.content.successMessage || 'Form başarıyla gönderildi!'}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, successMessage: e.target.value })}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Form Hata Mesajı
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.content.errorMessage || 'Form gönderilirken bir hata oluştu.'}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, errorMessage: e.target.value })}
              />
            </div>
            
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={block.content.enableRecaptcha || false}
                  onChange={(e) => updateBlockContent(block.id, { ...block.content, enableRecaptcha: e.target.checked })}
                />
                <span className="text-sm">reCAPTCHA Aktif</span>
              </label>
            </div>
            
            {block.content.enableRecaptcha && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  reCAPTCHA Site Key
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={block.content.recaptchaSiteKey || ''}
                  onChange={(e) => updateBlockContent(block.id, { ...block.content, recaptchaSiteKey: e.target.value })}
                  placeholder="örn: 6LcXXXXXXXXXXXXXXXXXXXXX"
                />
              </div>
            )}
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Özel CSS
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={4}
                value={block.content.customCSS || ''}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, customCSS: e.target.value })}
                placeholder="örn: box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Form Gönderim URL'i (AJAX)
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={block.content.ajaxUrl || ''}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, ajaxUrl: e.target.value })}
                placeholder="örn: https://example.com/api/submit"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 