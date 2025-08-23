import { useState, useEffect } from 'react';
import { useBuilderStore } from '../../../store/builderStore';
import { CanvasProperties } from './CanvasProperties';
import { BlockProperties } from './BlockProperties';

export const PropertyPanel = () => {
  const { selectedBlockId, blocks } = useBuilderStore();
  const [activeTab, setActiveTab] = useState<'properties' | 'settings'>('properties');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const selectedBlock = blocks.find(block => block.id === selectedBlockId);
  
  // Spin Wheel seçildiğinde popup'ı aç
  useEffect(() => {
    if (selectedBlock?.type === 'spin-wheel') {
      setIsPopupOpen(true);
    }
  }, [selectedBlock?.id, selectedBlock?.type]);
  
  // Popup'ı kapat
  const closePopup = () => {
    setIsPopupOpen(false);
  };
  
  // Spin Wheel için popup panel
  if (isPopupOpen && selectedBlock?.type === 'spin-wheel') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-4xl h-5/6 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Spin Wheel Properties
            </h2>
            <button
              onClick={closePopup}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full flex">
              {/* Tabs */}
              <div className="w-56 border-r border-gray-200 bg-gray-50">
                <div className="p-3">
                  <div className="space-y-2">
                    <button
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        activeTab === 'properties'
                          ? 'bg-white text-purple-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                      }`}
                      onClick={() => setActiveTab('properties')}
                    >
                      Block Properties
                    </button>
                    <button
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        activeTab === 'settings'
                          ? 'bg-white text-purple-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                      }`}
                      onClick={() => setActiveTab('settings')}
                    >
                      Settings
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Content Area */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4">
                  {activeTab === 'properties' && selectedBlock && (
                    <BlockProperties block={selectedBlock} />
                  )}
                  {activeTab === 'settings' && (
                    <CanvasProperties />
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-end space-x-3">
              <button
                onClick={closePopup}
                className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={closePopup}
                className="px-3 py-1.5 text-xs font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Normal panel (Spin Wheel değilse)
  return (
    <div className="property-panel w-64 border-l border-gray-200 flex flex-col">
      <div className="border-b border-gray-200 mb-3">
        <div className="flex">
          <button
            className={`py-2 px-3 text-xs font-medium ${
              activeTab === 'properties'
                ? 'text-primary-600 border-b-2 border-primary-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('properties')}
          >
            {selectedBlock ? 'Block Properties' : 'Canvas Properties'}
          </button>
          <button
            className={`py-2 px-3 text-xs font-medium ${
              activeTab === 'settings'
                ? 'text-primary-600 border-b-2 border-primary-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>
      </div>
      
      <div className="flex-grow overflow-y-auto p-3">
        {activeTab === 'properties' && (
          <>
            {selectedBlock ? (
              <BlockProperties block={selectedBlock} />
            ) : (
              <CanvasProperties />
            )}
          </>
        )}
      </div>
    </div>
  );
}; 