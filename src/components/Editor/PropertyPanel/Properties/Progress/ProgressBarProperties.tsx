import React from 'react';
import { useBuilderStore } from '../../../../../store/builderStore';
import type { BlockInstance } from '../../../../../types';

interface ProgressBarPropertiesProps {
  block: BlockInstance;
}

export const ProgressBarProperties = ({ block }: ProgressBarPropertiesProps) => {
  const { updateBlockContent, updateBlockStyle } = useBuilderStore();
  
  // Temel değerleri al
  const progress = block.content.progress !== undefined ? block.content.progress : 50;
  const barType = block.content.barType || 'manual';
  const animationType = block.content.animationType || 'linear';
  const barShape = block.content.barShape || 'rounded';
  const showLabel = block.content.showLabel !== undefined ? block.content.showLabel : true;
  const labelText = block.content.labelText || `${progress}%`;
  const title = block.content.title || '';
  const duration = block.content.duration || 60;
  const useGradient = block.content.useGradient || false;
  const showIcon = block.content.showIcon || false;
  const iconType = block.content.iconType || 'clock';
  const showIndicators = block.content.showIndicators || false;
  
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
  
  return (
    <div className="p-4">
      <h3 className="text-lg font-medium mb-4">İlerleme Çubuğu Ayarları</h3>
      
      {/* Bar Tipi */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Bar Tipi</label>
        <select
          value={barType}
          onChange={(e) => handleContentChange('barType', e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="manual">Manuel (Elle Girilen Yüzde)</option>
          <option value="timer">Zamanlayıcı</option>
          <option value="scroll">Sayfa Kaydırma</option>
        </select>
      </div>
      
      {/* Manuel İlerleme - Sadece manuel modda göster */}
      {barType === 'manual' && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">İlerleme (%)</label>
          <div className="flex items-center">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => handleContentChange('progress', parseInt(e.target.value, 10))}
              className="flex-grow mr-2"
            />
            <span className="w-12 text-center">{progress}%</span>
          </div>
        </div>
      )}
      
      {/* Zamanlayıcı Süresi - Sadece zamanlayıcı modunda göster */}
      {barType === 'timer' && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Süre (saniye)</label>
          <input
            type="number"
            min="1"
            value={duration}
            onChange={(e) => handleContentChange('duration', parseInt(e.target.value, 10))}
            className="w-full p-2 border rounded"
          />
        </div>
      )}
      
      {/* Başlık */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Başlık</label>
        <input
          type="text"
          value={title}
          onChange={(e) => handleContentChange('title', e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="İlerleme çubuğu başlığı"
        />
      </div>
      
      {/* Bar Şekli */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Bar Şekli</label>
        <div className="grid grid-cols-3 gap-2">
          <button
            className={`p-2 border rounded ${barShape === 'flat' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}`}
            onClick={() => handleContentChange('barShape', 'flat')}
          >
            <div className="h-2 bg-gray-400 w-full"></div>
            <div className="text-xs mt-1">Düz</div>
          </button>
          <button
            className={`p-2 border rounded ${barShape === 'rounded' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}`}
            onClick={() => handleContentChange('barShape', 'rounded')}
          >
            <div className="h-2 bg-gray-400 w-full rounded"></div>
            <div className="text-xs mt-1">Yuvarlatılmış</div>
          </button>
          <button
            className={`p-2 border rounded ${barShape === 'circular' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}`}
            onClick={() => handleContentChange('barShape', 'circular')}
          >
            <div className="h-2 bg-gray-400 w-full rounded-full"></div>
            <div className="text-xs mt-1">Dairesel</div>
          </button>
        </div>
      </div>
      
      {/* Animasyon Tipi */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Animasyon Tipi</label>
        <select
          value={animationType}
          onChange={(e) => handleContentChange('animationType', e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="linear">Doğrusal</option>
          <option value="easeInOut">Yumuşak Geçiş</option>
          <option value="bounce">Sıçrama</option>
          <option value="pulse">Nabız</option>
          <option value="stripes">Çizgili</option>
        </select>
      </div>
      
      {/* Etiket Gösterimi */}
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="showLabel"
          checked={showLabel}
          onChange={(e) => handleContentChange('showLabel', e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="showLabel" className="text-sm">Etiketi Göster</label>
      </div>
      
      {/* Etiket Metni - Sadece etiket gösteriliyorsa */}
      {showLabel && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Etiket Metni</label>
          <input
            type="text"
            value={labelText}
            onChange={(e) => handleContentChange('labelText', e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="%50"
          />
          <p className="text-xs text-gray-500 mt-1">
            Yüzde için % işareti kullanabilirsiniz
          </p>
        </div>
      )}
      
      {/* Simge Seçimi */}
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="showIcon"
          checked={showIcon}
          onChange={(e) => handleContentChange('showIcon', e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="showIcon" className="text-sm">Simge Göster</label>
      </div>
      
      {/* Simge Tipi - Sadece simge gösteriliyorsa */}
      {showIcon && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Simge Tipi</label>
          <select
            value={iconType}
            onChange={(e) => handleContentChange('iconType', e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="clock">Saat ⏱️</option>
            <option value="star">Yıldız ⭐</option>
            <option value="gift">Hediye 🎁</option>
            <option value="fire">Ateş 🔥</option>
            <option value="check">Onay ✅</option>
          </select>
        </div>
      )}
      
      {/* Gösterge Metinleri */}
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="showIndicators"
          checked={showIndicators}
          onChange={(e) => handleContentChange('showIndicators', e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="showIndicators" className="text-sm">Göstergeleri Göster</label>
      </div>
      
      {/* Gösterge Metinleri - Sadece göstergeler gösteriliyorsa */}
      {showIndicators && (
        <div className="mb-4 grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium mb-1">Başlangıç</label>
            <input
              type="text"
              value={block.content.startIndicator || '0%'}
              onChange={(e) => handleContentChange('startIndicator', e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Bitiş</label>
            <input
              type="text"
              value={block.content.endIndicator || '100%'}
              onChange={(e) => handleContentChange('endIndicator', e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      )}
      
      <h4 className="text-md font-medium mb-2 mt-6">Renk Ayarları</h4>
      
      {/* Gradient Kullanımı */}
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="useGradient"
          checked={useGradient}
          onChange={(e) => handleContentChange('useGradient', e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="useGradient" className="text-sm">Gradient Kullan</label>
      </div>
      
      {/* Dolgu Rengi */}
      {!useGradient ? (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Dolgu Rengi</label>
          <div className="flex">
            <input
              type="text"
              value={block.content.fillColor || '#0ea5e9'}
              onChange={(e) => handleContentChange('fillColor', e.target.value)}
              className="flex-grow p-2 border rounded"
            />
            <div className="w-10 h-10 border border-gray-300 overflow-hidden ml-2">
              <input
                type="color"
                value={block.content.fillColor || '#0ea5e9'}
                onChange={(e) => handleContentChange('fillColor', e.target.value)}
                className="w-12 h-12 -m-1 cursor-pointer"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-4 grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium mb-1">Başlangıç Rengi</label>
            <div className="flex">
              <input
                type="text"
                value={block.content.gradientStartColor || '#0ea5e9'}
                onChange={(e) => handleContentChange('gradientStartColor', e.target.value)}
                className="flex-grow p-2 border rounded"
              />
              <div className="w-10 h-10 border border-gray-300 overflow-hidden ml-2">
                <input
                  type="color"
                  value={block.content.gradientStartColor || '#0ea5e9'}
                  onChange={(e) => handleContentChange('gradientStartColor', e.target.value)}
                  className="w-12 h-12 -m-1 cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Bitiş Rengi</label>
            <div className="flex">
              <input
                type="text"
                value={block.content.gradientEndColor || '#0ea5e9'}
                onChange={(e) => handleContentChange('gradientEndColor', e.target.value)}
                className="flex-grow p-2 border rounded"
              />
              <div className="w-10 h-10 border border-gray-300 overflow-hidden ml-2">
                <input
                  type="color"
                  value={block.content.gradientEndColor || '#0ea5e9'}
                  onChange={(e) => handleContentChange('gradientEndColor', e.target.value)}
                  className="w-12 h-12 -m-1 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Arkaplan Rengi */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Arkaplan Rengi</label>
        <div className="flex">
          <input
            type="text"
            value={block.style.backgroundColor || '#e5e7eb'}
            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
            className="flex-grow p-2 border rounded"
          />
          <div className="w-10 h-10 border border-gray-300 overflow-hidden ml-2">
            <input
              type="color"
              value={block.style.backgroundColor || '#e5e7eb'}
              onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
              className="w-12 h-12 -m-1 cursor-pointer"
            />
          </div>
        </div>
      </div>
      
      {/* Etiket Rengi - Sadece etiket gösteriliyorsa */}
      {showLabel && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Etiket Rengi</label>
          <div className="flex">
            <input
              type="text"
              value={block.content.labelColor || '#000000'}
              onChange={(e) => handleContentChange('labelColor', e.target.value)}
              className="flex-grow p-2 border rounded"
            />
            <div className="w-10 h-10 border border-gray-300 overflow-hidden ml-2">
              <input
                type="color"
                value={block.content.labelColor || '#000000'}
                onChange={(e) => handleContentChange('labelColor', e.target.value)}
                className="w-12 h-12 -m-1 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};