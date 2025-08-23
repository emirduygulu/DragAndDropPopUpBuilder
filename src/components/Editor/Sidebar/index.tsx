import { useState } from 'react';
import { BlockItem } from './BlockItem';

import { blockCategories } from '../../../utils/blockDefinitions';

export const Sidebar = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  return (
    <div className="sidebar border-r border-gray-200 w-56 flex flex-col">
      <div className="p-3 border-b">
        <h2 className="text-base font-semibold">Blocks</h2>
      </div>
      
      {/* Category Dropdowns */}
      <div className="flex-grow overflow-y-auto p-3">
        {blockCategories.map((category) => (
          <div key={category.id} className="mb-3">
            <button
              className="w-full text-left px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
              onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
            >
              {category.name}
            </button>
            {activeCategory === category.id && (
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                {category.blocks.map((block) => (
                  <BlockItem key={block.type} block={block} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}; 