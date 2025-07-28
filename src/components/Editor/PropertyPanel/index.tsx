import { useState } from 'react';
import { useBuilderStore } from '../../../store/builderStore';
import { CanvasProperties } from './CanvasProperties';
import { BlockProperties } from './BlockProperties';

export const PropertyPanel = () => {
  const { selectedBlockId, blocks } = useBuilderStore();
  const [activeTab, setActiveTab] = useState<'properties' | 'settings'>('properties');
  
  const selectedBlock = blocks.find(block => block.id === selectedBlockId);
  
  return (
    <div className="property-panel">
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
      
      {activeTab === 'properties' && (
        <>
          {selectedBlock ? (
            <BlockProperties block={selectedBlock} />
          ) : (
            <CanvasProperties />
          )}
        </>
      )}
      
      {activeTab === 'settings' && (
        <div className="p-4">
          <h3 className="font-medium mb-4">Export Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Export Format
              </label>
              <select className="input w-full">
                <option value="jsx">React JSX</option>
                <option value="html">HTML</option>
                <option value="json">JSON</option>
              </select>
            </div>
            
            <button className="btn btn-primary w-full">
              Export
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 