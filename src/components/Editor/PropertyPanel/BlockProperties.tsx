import { useState, useEffect } from 'react';
import { useBuilderStore } from '../../../store/builderStore';
import type { BlockInstance } from '../../../types';
import { CountdownProperties } from './Properties/Countdown/CountdownProperties';
import { FormContainerProperties } from './Properties/Form/FormContainerProperties';
import { FormElementProperties } from './Properties/Form/FormElementProperties';
import { ProgressBarProperties } from './Properties/Progress/ProgressBarProperties';
import { SpinWheelProperties } from './Properties/Spin';
import { GiftBoxProperties } from './Properties/GiftBox';

interface BlockPropertiesProps {
  block: BlockInstance;
}

export const BlockProperties = ({ block }: BlockPropertiesProps) => {
  const { updateBlock, removeBlock } = useBuilderStore();
  const [content, setContent] = useState(block.content);
  const [style, setStyle] = useState(block.style);
  const [position, setPosition] = useState(block.position);
  const [size, setSize] = useState(block.size);
  
  // Update local state when block changes
  useEffect(() => {
    setContent(block.content);
    setStyle(block.style);
    setPosition(block.position);
    setSize(block.size);
  }, [block]);
  
  // Update block in store when local state changes
  const updateBlockProperty = (property: string, value: any) => {
    updateBlock(block.id, { [property]: value });
  };
  
  // Handle text content change
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = { ...content, text: e.target.value };
    setContent(newContent);
    updateBlockProperty('content', newContent);
  };
  
  // Handle heading content change
  const handleHeadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newContent = { ...content, text: e.target.value };
    setContent(newContent);
    updateBlockProperty('content', newContent);
  };
  
  // Handle button text change
  const handleButtonTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newContent = { ...content, text: e.target.value };
    setContent(newContent);
    updateBlockProperty('content', newContent);
  };
  
  // Handle image URL change
  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newContent = { ...content, url: e.target.value };
    setContent(newContent);
    updateBlockProperty('content', newContent);
  };
  
  // Handle HTML content change
  const handleHTMLChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = { ...content, html: e.target.value };
    setContent(newContent);
    updateBlockProperty('content', newContent);
  };
  
  // Handle position change
  const handlePositionChange = (axis: 'x' | 'y', value: string) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      const newPosition = { ...position, [axis]: numValue };
      setPosition(newPosition);
      updateBlockProperty('position', newPosition);
    }
  };
  
  // Handle size change
  const handleSizeChange = (dimension: 'width' | 'height', value: string) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      const newSize = { ...size, [dimension]: numValue };
      setSize(newSize);
      updateBlockProperty('size', newSize);
    }
  };
  
  // Handle style change
  const handleStyleChange = (property: string, value: string) => {
    const newStyle = { ...style, [property]: value };
    setStyle(newStyle);
    updateBlockProperty('style', newStyle);
  };
  
  // Handle block deletion
  const handleDeleteBlock = () => {
    removeBlock(block.id);
  };
  
  // Render specific properties based on block type
  const renderSpecificProperties = () => {
    switch (block.type) {
      case 'countdown-timer':
        return <CountdownProperties block={block} />;
      case 'input-form':
        return <FormContainerProperties block={block} />;
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
        return <FormElementProperties block={block} />;
      case 'progress-bar':
        return <ProgressBarProperties block={block} />;
      case 'spin-wheel':
        return <SpinWheelProperties block={block} />;
      case 'gift-box':
        return <GiftBoxProperties block={block} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="block-properties">
      <div className="mb-3">
        <h3 className="text-sm font-medium mb-2">Blok Türü</h3>
        <div className="text-xs bg-gray-100 rounded-md py-1 px-2 inline-block">
          {block.type}
        </div>
      </div>
      
      {/* Content Properties */}
      {block.type === 'text' && (
        <div className="mb-3">
          <h3 className="text-sm font-medium mb-2">İçerik</h3>
          <textarea
            value={content.text || ''}
            onChange={handleTextChange}
            className="w-full h-24 border border-gray-300 rounded-md p-2 text-xs"
            placeholder="Metin içeriği..."
          />
        </div>
      )}
      
      {block.type === 'heading' && (
        <div className="mb-3">
          <h3 className="text-sm font-medium mb-2">Başlık</h3>
          <input
            type="text"
            value={content.text || ''}
            onChange={handleHeadingChange}
            className="w-full border border-gray-300 rounded-md p-2 text-xs"
            placeholder="Başlık metni..."
          />
        </div>
      )}
      
      {block.type === 'button' && (
        <div className="mb-3">
          <h3 className="text-sm font-medium mb-2">Buton Metni</h3>
          <input
            type="text"
            value={content.text || ''}
            onChange={handleButtonTextChange}
            className="w-full border border-gray-300 rounded-md p-2 text-xs"
            placeholder="Buton metni..."
          />
        </div>
      )}
      
      {block.type === 'image' && (
        <div className="mb-3">
          <h3 className="text-sm font-medium mb-2">Resim URL</h3>
          <input
            type="text"
            value={content.url || ''}
            onChange={handleImageUrlChange}
            className="w-full border border-gray-300 rounded-md p-2 text-xs"
            placeholder="https://example.com/image.jpg"
          />
        </div>
      )}
      
      {block.type === 'html' && (
        <div className="mb-3">
          <h3 className="text-sm font-medium mb-2">HTML İçeriği</h3>
          <textarea
            value={content.html || ''}
            onChange={handleHTMLChange}
            className="w-full h-24 border border-gray-300 rounded-md p-2 text-xs font-mono"
            placeholder="<div>HTML içeriği...</div>"
          />
        </div>
      )}
      
      {/* Position and Size */}
      <div className="mb-3">
        <h3 className="text-sm font-medium mb-2">Konum ve Boyut Ayarları</h3>
        
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div>
            <label className="block text-xs text-gray-600 mb-1">X Konumu (px)</label>
            <input
              type="number"
              value={position.x}
              onChange={(e) => handlePositionChange('x', e.target.value)}
              className="w-full border border-gray-300 rounded-md p-1.5 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Y Konumu (px)</label>
            <input
              type="number"
              value={position.y}
              onChange={(e) => handlePositionChange('y', e.target.value)}
              className="w-full border border-gray-300 rounded-md p-1.5 text-xs"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Genişlik (px)</label>
            <input
              type="number"
              value={size.width}
              onChange={(e) => handleSizeChange('width', e.target.value)}
              className="w-full border border-gray-300 rounded-md p-1.5 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Yükseklik (px)</label>
            <input
              type="number"
              value={size.height}
              onChange={(e) => handleSizeChange('height', e.target.value)}
              className="w-full border border-gray-300 rounded-md p-1.5 text-xs"
            />
          </div>
        </div>

        {/* Responsive Positioning */}
        <div className="mt-3">
          <h4 className="text-xs font-medium mb-2">Duyarlı Konumlandırma</h4>
          
          <div className="mb-2">
            <label className="block text-xs text-gray-600 mb-1">Yatay Hizalama</label>
            <select
              value={style.alignSelf || 'auto'}
              onChange={(e) => handleStyleChange('alignSelf', e.target.value)}
              className="w-full border border-gray-300 rounded-md p-1.5 text-xs"
            >
              <option value="auto">Otomatik</option>
              <option value="flex-start">Sol</option>
              <option value="center">Orta</option>
              <option value="flex-end">Sağ</option>
              <option value="stretch">Genişlet</option>
            </select>
          </div>
          
          <div className="mb-2">
            <label className="block text-xs text-gray-600 mb-1">Genişlik Tipi</label>
            <select
              value={style.width?.includes('%') ? 'percentage' : 'fixed'}
              onChange={(e) => {
                const widthType = e.target.value;
                if (widthType === 'percentage') {
                  handleStyleChange('width', '100%');
                } else {
                  handleStyleChange('width', `${size.width}px`);
                }
              }}
              className="w-full border border-gray-300 rounded-md p-1.5 text-xs"
            >
              <option value="fixed">Sabit (px)</option>
              <option value="percentage">Yüzde (%)</option>
            </select>
          </div>
          
          {style.width?.includes('%') && (
            <div className="mb-2">
              <label className="block text-xs text-gray-600 mb-1">Genişlik (%)</label>
              <input
                type="number"
                min="1"
                max="100"
                value={parseInt(style.width || '100', 10)}
                onChange={(e) => handleStyleChange('width', `${e.target.value}%`)}
                className="w-full border border-gray-300 rounded-md p-1.5 text-xs"
              />
            </div>
          )}
          
          <div className="mb-2">
            <label className="block text-xs text-gray-600 mb-1">Yükseklik Tipi</label>
            <select
              value={style.height?.includes('%') ? 'percentage' : 'fixed'}
              onChange={(e) => {
                const heightType = e.target.value;
                if (heightType === 'percentage') {
                  handleStyleChange('height', '100%');
                } else {
                  handleStyleChange('height', `${size.height}px`);
                }
              }}
              className="w-full border border-gray-300 rounded-md p-1.5 text-xs"
            >
              <option value="fixed">Sabit (px)</option>
              <option value="percentage">Yüzde (%)</option>
            </select>
          </div>
          
          {style.height?.includes('%') && (
            <div className="mb-2">
              <label className="block text-xs text-gray-600 mb-1">Yükseklik (%)</label>
              <input
                type="number"
                min="1"
                max="100"
                value={parseInt(style.height || '100', 10)}
                onChange={(e) => handleStyleChange('height', `${e.target.value}%`)}
                className="w-full border border-gray-300 rounded-md p-1.5 text-xs"
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Style Properties */}
      <div className="mb-3">
        <h3 className="text-sm font-medium mb-2">Stil Ayarları</h3>
        
        {/* Background Color */}
        <div className="mb-2">
          <label className="block text-xs text-gray-600 mb-1">Arkaplan Rengi</label>
          <div className="flex items-center">
            <input
              type="color"
              value={style.backgroundColor || '#ffffff'}
              onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
              className="w-8 h-8 border border-gray-300 rounded-md mr-2"
            />
            <input
              type="text"
              value={style.backgroundColor || '#ffffff'}
              onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
              className="flex-grow border border-gray-300 rounded-md p-1.5 text-xs"
            />
          </div>
        </div>
        
        {/* Text Color (for text-based blocks) */}
        {['text', 'heading', 'button'].includes(block.type) && (
          <div className="mb-2">
            <label className="block text-xs text-gray-600 mb-1">Metin Rengi</label>
            <div className="flex items-center">
              <input
                type="color"
                value={style.color || '#000000'}
                onChange={(e) => handleStyleChange('color', e.target.value)}
                className="w-8 h-8 border border-gray-300 rounded-md mr-2"
              />
              <input
                type="text"
                value={style.color || '#000000'}
                onChange={(e) => handleStyleChange('color', e.target.value)}
                className="flex-grow border border-gray-300 rounded-md p-1.5 text-xs"
              />
            </div>
          </div>
        )}
        
        {/* Border Radius */}
        <div className="mb-2">
          <label className="block text-xs text-gray-600 mb-1">Köşe Yuvarlaklığı (px)</label>
          <input
            type="number"
            value={parseInt(style.borderRadius || '0', 10)}
            onChange={(e) => handleStyleChange('borderRadius', `${e.target.value}px`)}
            className="w-full border border-gray-300 rounded-md p-1.5 text-xs"
          />
        </div>
        
        {/* Font Size (for text-based blocks) */}
        {['text', 'heading', 'button'].includes(block.type) && (
          <div className="mb-2">
            <label className="block text-xs text-gray-600 mb-1">Yazı Boyutu (px)</label>
            <input
              type="number"
              value={parseInt(style.fontSize || '16', 10)}
              onChange={(e) => handleStyleChange('fontSize', `${e.target.value}px`)}
              className="w-full border border-gray-300 rounded-md p-1.5 text-xs"
            />
          </div>
        )}

        {/* Flexbox Properties */}
        <div className="mb-2 mt-4">
          <h4 className="text-xs font-medium mb-2">Flexbox Ayarları</h4>
          
          {/* Display */}
          <div className="mb-2">
            <label className="block text-xs text-gray-600 mb-1">Display</label>
            <select
              value={style.display || 'block'}
              onChange={(e) => handleStyleChange('display', e.target.value)}
              className="w-full border border-gray-300 rounded-md p-1.5 text-xs"
            >
              <option value="block">Block</option>
              <option value="flex">Flex</option>
              <option value="inline-flex">Inline Flex</option>
              <option value="inline-block">Inline Block</option>
              <option value="none">None</option>
            </select>
          </div>
          
          {/* Only show these options if display is flex or inline-flex */}
          {(style.display === 'flex' || style.display === 'inline-flex') && (
            <>
              {/* Flex Direction */}
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs text-gray-600">flex-direction:</label>
                  <span className="text-xs text-gray-500">{style.flexDirection || 'row'}</span>
                </div>
                <div className="flex justify-between bg-gray-800 rounded-md p-1">
                  <button
                    type="button"
                    className={`flex-1 p-1 rounded ${style.flexDirection === 'row' ? 'bg-blue-500' : 'bg-gray-700'}`}
                    onClick={() => handleStyleChange('flexDirection', 'row')}
                    title="Row"
                  >
                    <div className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`flex-1 p-1 rounded ${style.flexDirection === 'column' ? 'bg-blue-500' : 'bg-gray-700'}`}
                    onClick={() => handleStyleChange('flexDirection', 'column')}
                    title="Column"
                  >
                    <div className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white transform rotate-90">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`flex-1 p-1 rounded ${style.flexDirection === 'row-reverse' ? 'bg-blue-500' : 'bg-gray-700'}`}
                    onClick={() => handleStyleChange('flexDirection', 'row-reverse')}
                    title="Row Reverse"
                  >
                    <div className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white transform rotate-180">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`flex-1 p-1 rounded ${style.flexDirection === 'column-reverse' ? 'bg-blue-500' : 'bg-gray-700'}`}
                    onClick={() => handleStyleChange('flexDirection', 'column-reverse')}
                    title="Column Reverse"
                  >
                    <div className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white transform -rotate-90">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
              
              {/* Flex Wrap */}
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs text-gray-600">flex-wrap:</label>
                  <span className="text-xs text-gray-500">{style.flexWrap || 'nowrap'}</span>
                </div>
                <div className="flex justify-between bg-gray-800 rounded-md p-1">
                  <button
                    type="button"
                    className={`flex-1 p-1 rounded ${style.flexWrap === 'nowrap' ? 'bg-blue-500' : 'bg-gray-700'}`}
                    onClick={() => handleStyleChange('flexWrap', 'nowrap')}
                    title="No Wrap"
                  >
                    <div className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <rect x="3" y="6" width="18" height="12" rx="2" ry="2"></rect>
                      </svg>
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`flex-1 p-1 rounded ${style.flexWrap === 'wrap' ? 'bg-blue-500' : 'bg-gray-700'}`}
                    onClick={() => handleStyleChange('flexWrap', 'wrap')}
                    title="Wrap"
                  >
                    <div className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <rect x="3" y="3" width="8" height="8" rx="1" ry="1"></rect>
                        <rect x="13" y="3" width="8" height="8" rx="1" ry="1"></rect>
                        <rect x="3" y="13" width="8" height="8" rx="1" ry="1"></rect>
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
              
              {/* Align Items */}
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs text-gray-600">align-items:</label>
                  <span className="text-xs text-gray-500">{style.alignItems || 'stretch'}</span>
                </div>
                <div className="flex flex-wrap justify-between bg-gray-800 rounded-md p-1">
                  <button
                    type="button"
                    className={`w-10 p-1 rounded ${style.alignItems === 'center' ? 'bg-blue-500' : 'bg-gray-700'}`}
                    onClick={() => handleStyleChange('alignItems', 'center')}
                    title="Center"
                  >
                    <div className="flex items-center justify-center h-6">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <rect x="6" y="9" width="12" height="6" rx="1" ry="1"></rect>
                        <line x1="3" y1="3" x2="21" y2="3"></line>
                        <line x1="3" y1="21" x2="21" y2="21"></line>
                      </svg>
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`w-10 p-1 rounded ${style.alignItems === 'flex-start' ? 'bg-blue-500' : 'bg-gray-700'}`}
                    onClick={() => handleStyleChange('alignItems', 'flex-start')}
                    title="Start"
                  >
                    <div className="flex items-center justify-center h-6">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <rect x="6" y="3" width="12" height="6" rx="1" ry="1"></rect>
                        <line x1="3" y1="3" x2="21" y2="3"></line>
                        <line x1="3" y1="21" x2="21" y2="21"></line>
                      </svg>
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`w-10 p-1 rounded ${style.alignItems === 'flex-end' ? 'bg-blue-500' : 'bg-gray-700'}`}
                    onClick={() => handleStyleChange('alignItems', 'flex-end')}
                    title="End"
                  >
                    <div className="flex items-center justify-center h-6">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <rect x="6" y="15" width="12" height="6" rx="1" ry="1"></rect>
                        <line x1="3" y1="3" x2="21" y2="3"></line>
                        <line x1="3" y1="21" x2="21" y2="21"></line>
                      </svg>
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`w-10 p-1 rounded ${style.alignItems === 'stretch' ? 'bg-blue-500' : 'bg-gray-700'}`}
                    onClick={() => handleStyleChange('alignItems', 'stretch')}
                    title="Stretch"
                  >
                    <div className="flex items-center justify-center h-6">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <rect x="6" y="4" width="12" height="16" rx="1" ry="1"></rect>
                        <line x1="3" y1="3" x2="21" y2="3"></line>
                        <line x1="3" y1="21" x2="21" y2="21"></line>
                      </svg>
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`w-10 p-1 rounded ${style.alignItems === 'baseline' ? 'bg-blue-500' : 'bg-gray-700'}`}
                    onClick={() => handleStyleChange('alignItems', 'baseline')}
                    title="Baseline"
                  >
                    <div className="flex items-center justify-center h-6">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <rect x="5" y="8" width="4" height="8" rx="1" ry="1"></rect>
                        <rect x="10" y="4" width="4" height="16" rx="1" ry="1"></rect>
                        <rect x="15" y="6" width="4" height="12" rx="1" ry="1"></rect>
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
              
              {/* Justify Content */}
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs text-gray-600">justify-content:</label>
                  <span className="text-xs text-gray-500">{style.justifyContent || 'flex-start'}</span>
                </div>
                <div className="flex flex-wrap justify-between bg-gray-800 rounded-md p-1">
                  <button
                    type="button"
                    className={`w-10 p-1 mb-1 rounded ${style.justifyContent === 'flex-start' ? 'bg-blue-500' : 'bg-gray-700'}`}
                    onClick={() => handleStyleChange('justifyContent', 'flex-start')}
                    title="Start"
                  >
                    <div className="flex items-center justify-center h-6">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <rect x="3" y="9" width="6" height="6" rx="1" ry="1"></rect>
                        <line x1="3" y1="3" x2="3" y2="21"></line>
                        <line x1="21" y1="3" x2="21" y2="21"></line>
                      </svg>
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`w-10 p-1 mb-1 rounded ${style.justifyContent === 'center' ? 'bg-blue-500' : 'bg-gray-700'}`}
                    onClick={() => handleStyleChange('justifyContent', 'center')}
                    title="Center"
                  >
                    <div className="flex items-center justify-center h-6">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <rect x="9" y="9" width="6" height="6" rx="1" ry="1"></rect>
                        <line x1="3" y1="3" x2="3" y2="21"></line>
                        <line x1="21" y1="3" x2="21" y2="21"></line>
                      </svg>
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`w-10 p-1 mb-1 rounded ${style.justifyContent === 'flex-end' ? 'bg-blue-500' : 'bg-gray-700'}`}
                    onClick={() => handleStyleChange('justifyContent', 'flex-end')}
                    title="End"
                  >
                    <div className="flex items-center justify-center h-6">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <rect x="15" y="9" width="6" height="6" rx="1" ry="1"></rect>
                        <line x1="3" y1="3" x2="3" y2="21"></line>
                        <line x1="21" y1="3" x2="21" y2="21"></line>
                      </svg>
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`w-10 p-1 mb-1 rounded ${style.justifyContent === 'space-between' ? 'bg-blue-500' : 'bg-gray-700'}`}
                    onClick={() => handleStyleChange('justifyContent', 'space-between')}
                    title="Space Between"
                  >
                    <div className="flex items-center justify-center h-6">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <rect x="3" y="9" width="4" height="6" rx="1" ry="1"></rect>
                        <rect x="17" y="9" width="4" height="6" rx="1" ry="1"></rect>
                        <line x1="3" y1="3" x2="3" y2="21"></line>
                        <line x1="21" y1="3" x2="21" y2="21"></line>
                      </svg>
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`w-10 p-1 mb-1 rounded ${style.justifyContent === 'space-around' ? 'bg-blue-500' : 'bg-gray-700'}`}
                    onClick={() => handleStyleChange('justifyContent', 'space-around')}
                    title="Space Around"
                  >
                    <div className="flex items-center justify-center h-6">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <rect x="6" y="9" width="4" height="6" rx="1" ry="1"></rect>
                        <rect x="14" y="9" width="4" height="6" rx="1" ry="1"></rect>
                        <line x1="3" y1="3" x2="3" y2="21"></line>
                        <line x1="21" y1="3" x2="21" y2="21"></line>
                      </svg>
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`w-10 p-1 mb-1 rounded ${style.justifyContent === 'space-evenly' ? 'bg-blue-500' : 'bg-gray-700'}`}
                    onClick={() => handleStyleChange('justifyContent', 'space-evenly')}
                    title="Space Evenly"
                  >
                    <div className="flex items-center justify-center h-6">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <rect x="7" y="9" width="3" height="6" rx="1" ry="1"></rect>
                        <rect x="14" y="9" width="3" height="6" rx="1" ry="1"></rect>
                        <line x1="3" y1="3" x2="3" y2="21"></line>
                        <line x1="21" y1="3" x2="21" y2="21"></line>
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
              
              {/* Gap */}
              <div className="mb-2">
                <label className="block text-xs text-gray-600 mb-1">Gap (px)</label>
                <input
                  type="number"
                  value={parseInt(style.gap || '0', 10)}
                  onChange={(e) => handleStyleChange('gap', `${e.target.value}px`)}
                  className="w-full border border-gray-300 rounded-md p-1.5 text-xs"
                />
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Specific Properties based on block type */}
      {renderSpecificProperties()}
      
      {/* Delete Button */}
      <div className="mt-4">
        <button
          onClick={handleDeleteBlock}
          className="w-full bg-red-500 hover:bg-red-600 text-white rounded-md py-1.5 px-3 text-xs"
        >
          Bloğu Sil
        </button>
      </div>
    </div>
  );
}; 