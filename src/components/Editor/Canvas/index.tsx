import { useDrop } from 'react-dnd';
import { useBuilderStore } from '../../../store/builderStore';
import { BlockRenderer } from './BlockRenderer';
import { useEffect, useState, useRef } from 'react';
import type { BlockInstance } from '../../../types';

interface CanvasProps {
  className?: string;
}

const Canvas = ({ className = '' }: CanvasProps) => {
  const { blocks, canvasSettings, addBlock, selectBlock, selectedBlockId } = useBuilderStore();
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Handle drop of new blocks onto the canvas
  const [{ isOver }, drop] = useDrop({
    accept: ['BLOCK_TYPE', 'BLOCK_INSTANCE'],
    drop: (item: any, monitor) => {
      const canvasElement = canvasRef.current;
      if (!canvasElement) return;
      
      const canvasRect = canvasElement.getBoundingClientRect();
      const dropPosition = monitor.getClientOffset();
      
      if (!dropPosition) return;
      
      // Calculate position relative to the canvas
      const x = dropPosition.x - canvasRect.left;
      const y = dropPosition.y - canvasRect.top;
      
      if (item.type === 'new') {
        // Add a new block from the sidebar
        addBlock({
          type: item.blockType,
          content: {},
          style: {},
          position: { x, y },
          size: { width: 200, height: 100 },
          zIndex: 1,
        });
      } else if (item.type === 'existing') {
        // Handle moving existing blocks in BlockRenderer
      }
      
      // Clear any selection when dropping a new block
      selectBlock(null);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  
  // Connect the drop ref to our canvas ref
  useEffect(() => {
    if (canvasRef.current) {
      drop(canvasRef);
    }
  }, [drop]);
  
  // Update dragging state for visual feedback
  useEffect(() => {
    setIsDraggingOver(isOver);
  }, [isOver]);
  
  return (
    <div className="flex items-center justify-center h-full bg-gray-50">
      <div
        ref={canvasRef}
        className={`canvas relative ${className} ${isDraggingOver ? 'bg-gray-100' : ''}`}
        style={{
          width: canvasSettings.width,
          height: canvasSettings.height,
          backgroundColor: canvasSettings.background,
          transition: 'background-color 0.2s ease-in-out',
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }}
        onClick={() => selectBlock(null)}
      >
        {blocks.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <div className="text-center bg-blue-50 border-2 border-dashed border-blue-200 rounded-lg p-8 m-4">
              <p className="text-lg font-medium text-blue-600">Drag and drop blocks here</p>
              <p className="text-sm text-blue-500 mt-2">or click a block in the sidebar</p>
            </div>
          </div>
        )}
        
        {blocks.map((block) => (
          <BlockRenderer
            key={block.id}
            block={block}
            isSelected={block.id === selectedBlockId}
          />
        ))}
      </div>
    </div>
  );
};

export default Canvas;
