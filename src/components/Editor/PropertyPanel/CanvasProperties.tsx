import { useState } from 'react';
import { useBuilderStore } from '../../../store/builderStore';
import type { CanvasMode } from '../../../types';

export const CanvasProperties = () => {
  const { canvasSettings, setCanvasSettings } = useBuilderStore();
  const [activeTab, setActiveTab] = useState<'general' | 'animation' | 'trigger'>('general');
  
  // Handle mode change
  const handleModeChange = (mode: CanvasMode) => {
    setCanvasSettings({ 
      mode,
      width: mode === 'popup' ? 450 : 1024,
      height: mode === 'popup' ? 600 : 80,
    });
  };
  
  // Handle background color change
  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCanvasSettings({ background: e.target.value });
  };
  
  // Handle size change
  const handleSizeChange = (dimension: 'width' | 'height', value: string) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue > 0) {
      setCanvasSettings({ [dimension]: numValue });
    }
  };
  
  // Handle overlay settings
  const handleOverlayChange = (property: 'color' | 'opacity', value: string) => {
    const currentOverlay = canvasSettings.overlay || { color: '#000000', opacity: 0.5 };
    
    if (property === 'opacity') {
      setCanvasSettings({ 
        overlay: { 
          ...currentOverlay, 
          opacity: parseFloat(value) 
        } 
      });
    } else {
      setCanvasSettings({ 
        overlay: { 
          ...currentOverlay, 
          color: value 
        } 
      });
    }
  };
  
  return (
    <div className="p-4">
      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          className={`py-2 px-4 ${activeTab === 'general' ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('general')}
        >
          General
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'animation' ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('animation')}
        >
          Animation
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'trigger' ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('trigger')}
        >
          Trigger
        </button>
      </div>
      
      {/* General Settings */}
      {activeTab === 'general' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mode
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  checked={canvasSettings.mode === 'popup'}
                  onChange={() => handleModeChange('popup')}
                />
                <span className="ml-2">Popup</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  checked={canvasSettings.mode === 'banner'}
                  onChange={() => handleModeChange('banner')}
                />
                <span className="ml-2">Banner</span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Background Color
            </label>
            <div className="flex">
              <input
                type="text"
                value={canvasSettings.background}
                onChange={handleBackgroundChange}
                className="flex-grow input"
              />
              <div className="w-10 h-10 border border-gray-300 overflow-hidden ml-2">
                <input
                  type="color"
                  value={canvasSettings.background}
                  onChange={handleBackgroundChange}
                  className="w-12 h-12 -m-1 cursor-pointer"
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Width (px)
              </label>
              <input
                type="number"
                value={canvasSettings.width}
                onChange={(e) => handleSizeChange('width', e.target.value)}
                className="input w-full"
                min="50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Height (px)
              </label>
              <input
                type="number"
                value={canvasSettings.height}
                onChange={(e) => handleSizeChange('height', e.target.value)}
                className="input w-full"
                min="50"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Overlay Color
            </label>
            <div className="flex">
              <input
                type="text"
                value={canvasSettings.overlay?.color || '#000000'}
                onChange={(e) => handleOverlayChange('color', e.target.value)}
                className="flex-grow input"
              />
              <div className="w-10 h-10 border border-gray-300 overflow-hidden ml-2">
                <input
                  type="color"
                  value={canvasSettings.overlay?.color || '#000000'}
                  onChange={(e) => handleOverlayChange('color', e.target.value)}
                  className="w-12 h-12 -m-1 cursor-pointer"
                />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Overlay Opacity
            </label>
            <div className="flex items-center">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={canvasSettings.overlay?.opacity || 0.5}
                onChange={(e) => handleOverlayChange('opacity', e.target.value)}
                className="flex-grow mr-2"
              />
              <span className="w-12 text-center">
                {canvasSettings.overlay?.opacity || 0.5}
              </span>
            </div>
          </div>
        </div>
      )}
      
      {/* Animation Settings */}
      {activeTab === 'animation' && (
        <div className="space-y-4">
          <p className="text-gray-500">Animation settings will be available soon.</p>
        </div>
      )}
      
      {/* Trigger Settings */}
      {activeTab === 'trigger' && (
        <div className="space-y-4">
          <p className="text-gray-500">Trigger settings will be available soon.</p>
        </div>
      )}
    </div>
  );
}; 