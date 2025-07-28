import { useState } from 'react';
import { BlockItem } from './BlockItem';
import type { BlockCategory } from '../../../types';
import { blockCategories } from '../../../utils/blockDefinitions';

export const Sidebar = () => {
  const [activeCategory, setActiveCategory] = useState<string>(blockCategories[0].id);
  
  return (
    <div className="sidebar border-r border-gray-200 w-64 flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Blocks</h2>
      </div>
      
      {/* Category Tabs */}
      <div className="flex border-b overflow-x-auto">
        {blockCategories.map((category) => (
          <button
            key={category.id}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
              activeCategory === category.id
                ? 'text-primary-600 border-b-2 border-primary-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* Block Items */}
      <div className="flex-grow overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-2">
          {blockCategories
            .find((cat) => cat.id === activeCategory)
            ?.blocks.map((block) => (
              <BlockItem key={block.type} block={block} />
            ))}
        </div>
      </div>
    </div>
  );
}; 