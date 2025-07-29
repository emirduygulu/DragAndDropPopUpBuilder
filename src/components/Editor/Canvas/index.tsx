import { useDrop } from 'react-dnd';
import { useBuilderStore } from '../../../store/builderStore';
import { BlockRenderer } from './BlockRenderer';
import { useEffect, useState, useRef } from 'react';
import { blockCategories } from '../../../utils/blockDefinitions';


interface CanvasProps {
  className?: string;
}

const Canvas = ({ className = '' }: CanvasProps) => {
  const { blocks, canvasSettings, addBlock, selectBlock, selectedBlockId } = useBuilderStore();
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [showCrosshair, setShowCrosshair] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
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
        // Find the block definition to get default size and content
        let blockDefinition = null;
        for (const category of blockCategories) {
          const found = category.blocks.find(block => block.type === item.blockType);
          if (found) {
            blockDefinition = found;
            break;
          }
        }
        
        const blockWidth = blockDefinition?.defaultSize?.width || 200;
        const blockHeight = blockDefinition?.defaultSize?.height || 100;
        const centeredX = x - (blockWidth / 2);
        const centeredY = y - (blockHeight / 2);
        
        addBlock({
          type: item.blockType,
          content: blockDefinition?.defaultContent || {},
          style: blockDefinition?.defaultStyle || {},
          position: { x: centeredX, y: centeredY },
          size: { width: blockWidth, height: blockHeight },
          zIndex: 1,
        });
      } else if (item.type === 'existing') {
        // Handle moving existing blocks - center the block on mouse cursor
        const { moveBlock } = useBuilderStore.getState();
        const block = blocks.find(b => b.id === item.id);
        if (block) {
          const centeredX = x - (block.size.width / 2);
          const centeredY = y - (block.size.height / 2);
          moveBlock(item.id, { x: centeredX, y: centeredY });
        }
      }
      
      // Clear any selection when dropping a new block
      if (item.type === 'new') {
        selectBlock(null);
      }
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
      <div className="relative">
        {/* Control Buttons - Outside Canvas */}
        <div className="absolute -top-12 right-0 flex gap-2">
          <button
            onClick={() => setShowCrosshair(!showCrosshair)}
            className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded border"
          >
            {showCrosshair ? 'Hide' : 'Show'} Crosshair
          </button>
          <button
            onClick={() => setShowGrid(!showGrid)}
            className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded border"
          >
            {showGrid ? 'Hide' : 'Show'} Grid
          </button>
        </div>
        
        <div
          ref={canvasRef}
          className={`canvas relative ${className} ${isDraggingOver ? 'bg-gray-100' : ''}`}
          style={{
            width: canvasSettings.width,
            height: canvasSettings.height,
            backgroundColor: canvasSettings.background,
            transition: 'background-color 0.2s ease-in-out',
            backgroundImage: showGrid ? `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            ` : 'none',
            backgroundSize: '20px 20px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }}
          onClick={() => selectBlock(null)}
        >
          {/* Crosshair Lines */}
          {showCrosshair && (
            <>
              {/* Vertical Center Line */}
              <div 
                className="absolute top-0 w-px h-full pointer-events-none z-10"
                style={{ 
                  left: '50%',
                  backgroundColor: 'rgba(239, 68, 68, 0.8)',
                  transform: 'translateX(-50%)'
                }}
              />
              {/* Horizontal Center Line */}
              <div 
                className="absolute left-0 w-full h-px pointer-events-none z-10"
                style={{ 
                  top: '50%',
                  backgroundColor: 'rgba(239, 68, 68, 0.8)',
                  transform: 'translateY(-50%)'
                }}
              />
              {/* Center Point */}
              <div 
                className="absolute w-2 h-2 bg-red-500 rounded-full pointer-events-none z-11"
                style={{ 
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              />
            </>
          )}
          
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
    </div>
  );
};

export default Canvas;
