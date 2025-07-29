import { useState } from 'react';
import { useBuilderStore } from '../../../store/builderStore';
import { CanvasProperties } from './CanvasProperties';
import { BlockProperties } from './BlockProperties';

export const PropertyPanel = () => {
  const { selectedBlockId, blocks } = useBuilderStore();
  const [activeTab, setActiveTab] = useState<'properties' | 'settings'>('properties');
  
  const selectedBlock = blocks.find(block => block.id === selectedBlockId);
  
  return (
    <div className="property-panel w-80 border-l border-gray-200 flex flex-col">
      <div className="border-b border-gray-200 mb-4">
        <div className="flex">
          <button
            className={`py-3 px-4 text-sm font-medium ${
              activeTab === 'properties'
                ? 'text-primary-600 border-b-2 border-primary-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('properties')}
          >
            {selectedBlock ? 'Block Properties' : 'Canvas Properties'}
          </button>
          <button
            className={`py-3 px-4 text-sm font-medium ${
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
      
      <div className="flex-grow overflow-y-auto p-4">
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