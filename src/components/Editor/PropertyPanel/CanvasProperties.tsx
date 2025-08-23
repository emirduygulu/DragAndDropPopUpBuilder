import { useState, useEffect } from 'react';
import { useBuilderStore } from '../../../store/builderStore';
import type { CanvasMode } from '../../../types';

export const CanvasProperties = () => {
  const { canvasSettings, setCanvasSettings } = useBuilderStore();
  const [width, setWidth] = useState(canvasSettings.width);
  const [height, setHeight] = useState(canvasSettings.height);
  const [background, setBackground] = useState(canvasSettings.background);
  
  // Update Canvas Name state management
  const [canvasName, setCanvasName] = useState(canvasSettings.name || '');

  // Update local state when canvas settings change
  useEffect(() => {
    setWidth(canvasSettings.width);
    setHeight(canvasSettings.height);
    setBackground(canvasSettings.background);
    setCanvasName(canvasSettings.name || '');
  }, [canvasSettings]);
  
  // Handle width change
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(e.target.value, 10);
    if (!isNaN(newWidth) && newWidth > 0) {
      setWidth(newWidth);
      setCanvasSettings({
        ...canvasSettings,
        width: newWidth
      });
    }
  };
  
  // Handle height change
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseInt(e.target.value, 10);
    if (!isNaN(newHeight) && newHeight > 0) {
      setHeight(newHeight);
      setCanvasSettings({
        ...canvasSettings,
        height: newHeight
      });
    }
  };
  
  // Handle background color change
  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBackground = e.target.value;
    setBackground(newBackground);
    setCanvasSettings({
      ...canvasSettings,
      background: newBackground
    });
  };

  // Handle Canvas Name change
  const handleCanvasNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setCanvasName(newName);
    setCanvasSettings({
      ...canvasSettings,
      name: newName
    });
  };

  // Update Submit Button functionality
  const handleSubmitButtonClick = () => {
    console.log('Submit button clicked with settings:', canvasSettings);
    // Add actual submit logic here
  };

  // Update Font Selection state management
  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFont = e.target.value;
    setCanvasSettings({
      ...canvasSettings,
      font: newFont
    });
  };

  // Position Settings functionality
  // const handlePositionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const newPosition = e.target.value;
  //   setCanvasSettings({
  //     ...canvasSettings,
  //     position: newPosition
  //   });
  // };

  // Update Corner Radius, Shadow, and Border state management
  const handleCornerRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRadius = parseInt(e.target.value, 10);
    if (!isNaN(newRadius)) {
      setCanvasSettings({
        ...canvasSettings,
        cornerRadius: newRadius
      });
    }
  };

  const handleShadowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newShadow = e.target.value;
    setCanvasSettings({
      ...canvasSettings,
      shadow: newShadow
    });
  };

  const handleBorderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBorder = e.target.value;
    setCanvasSettings({
      ...canvasSettings,
      border: newBorder
    });
  };
  
  return (
    <div className="canvas-properties">
      <div className="mb-3">
        <h3 className="text-sm font-medium mb-2">Kanvas Ayarları</h3>
        
        <div className="mb-3">
          <label className="block text-xs text-gray-600 mb-1">Kanvas Adı</label>
          <input
            type="text"
            value={canvasName}
            onChange={handleCanvasNameChange}
            className="w-full border border-gray-300 rounded-md p-1.5 text-xs"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Genişlik (px)</label>
            <input
              type="number"
              value={width}
              onChange={handleWidthChange}
              className="w-full border border-gray-300 rounded-md p-1.5 text-xs"
              min="100"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Yükseklik (px)</label>
            <input
              type="number"
              value={height}
              onChange={handleHeightChange}
              className="w-full border border-gray-300 rounded-md p-1.5 text-xs"
              min="50"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-xs text-gray-600 mb-1">Arkaplan Rengi</label>
          <div className="flex items-center">
            <input
              type="color"
              value={background}
              onChange={handleBackgroundChange}
              className="w-8 h-8 border border-gray-300 rounded-md mr-2"
            />
            <input
              type="text"
              value={background}
              onChange={handleBackgroundChange}
              className="flex-grow border border-gray-300 rounded-md p-1.5 text-xs"
            />
          </div>
        </div>
      </div>
      
      {/* Position Dropdown */}
      {/* <div className="mb-3">
        <label className="block text-xs text-gray-600 mb-1">Pozisyon</label>
        <select
          value={canvasSettings.position || 'center'}
          onChange={handlePositionChange}
          className="w-full border border-gray-300 rounded-md p-1.5 text-xs"
        >
          <option value="top-left">Sol Üst</option>
          <option value="top">Üst Orta</option>
          <option value="top-right">Sağ Üst</option>
          <option value="left">Sol Orta</option>
          <option value="center">Orta</option>
          <option value="right">Sağ Orta</option>
          <option value="bottom-left">Sol Alt</option>
          <option value="bottom">Alt Orta</option>
          <option value="bottom-right">Sağ Alt</option>
        </select>
      </div> */}
      
      <div className="mb-3">
        <h3 className="text-sm font-medium mb-2">Önizleme</h3>
        <div 
          className="border border-gray-300 rounded-md"
          style={{
            width: '100%',
            height: '100px',
            backgroundColor: background,
            position: 'relative',
            overflow: 'hidden',
            borderRadius: `${canvasSettings.cornerRadius || 0}px`,
            boxShadow: canvasSettings.shadow || 'none',
            border: canvasSettings.border || 'none'
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-xs text-gray-500">
              {width} x {height} px
            </div>
          </div>
        </div>
      </div>
      
      {/* Add Font Selection Dropdown */}
      <div className="mb-3">
        <label className="block text-xs text-gray-600 mb-1">Yazı Tipi</label>
        <select
          value={canvasSettings.font || 'Poppins'}
          onChange={handleFontChange}
          className="w-full border border-gray-300 rounded-md p-1.5 text-xs"
        >
          <option value="Poppins">Poppins</option>
          <option value="Arial">Arial</option>
          <option value="Roboto">Roboto</option>
        </select>
      </div>
      
      {/* Add Submit Button */}
      <div className="mb-3">
        <button
          className="bg-primary-500 text-white px-3 py-1.5 rounded-md"
          onClick={handleSubmitButtonClick}
        >
          + Gönder Butonu Ekle
        </button>
      </div>
      
      {/* Add Corner Radius, Shadow, and Border settings */}
      <div className="mb-3">
        <label className="block text-xs text-gray-600 mb-1">Köşe Yuvarlaklığı</label>
        <input
          type="number"
          value={canvasSettings.cornerRadius || 0}
          onChange={handleCornerRadiusChange}
          className="w-full border border-gray-300 rounded-md p-1.5 text-xs"
        />
      </div>
      <div className="mb-3">
        <label className="block text-xs text-gray-600 mb-1">Gölge</label>
        <input
          type="text"
          value={canvasSettings.shadow || ''}
          onChange={handleShadowChange}
          className="w-full border border-gray-300 rounded-md p-1.5 text-xs"
        />
      </div>
      <div className="mb-3">
        <label className="block text-xs text-gray-600 mb-1">Kenarlık</label>
        <input
          type="text"
          value={canvasSettings.border || ''}
          onChange={handleBorderChange}
          className="w-full border border-gray-300 rounded-md p-1.5 text-xs"
        />
      </div>
      
      <div className="mb-3">
        <h3 className="text-sm font-medium mb-2">Şablon Tipi</h3>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1.5 text-xs rounded-md ${
              canvasSettings.mode === 'popup'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setCanvasSettings({
              ...canvasSettings,
              mode: 'popup',
              width: 450,
              height: 600
            })}
          >
            Popup
          </button>
          <button
            className={`px-3 py-1.5 text-xs rounded-md ${
              canvasSettings.mode === 'banner'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setCanvasSettings({
              ...canvasSettings,
              mode: 'banner',
              width: 1024,
              height: 80
            })}
          >
            Banner
          </button>
        </div>
      </div>
    </div>
  );
}; 