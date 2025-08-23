import { useDrop } from 'react-dnd';
import { useBuilderStore } from '../../../store/builderStore';
import { BlockRenderer } from './BlockRenderer';
import { useEffect, useState, useRef } from 'react';
import { blockCategories } from '../../../utils/blockDefinitions';


interface CanvasProps {
  className?: string;
  scale?: number;
}

const Canvas = ({ className = '', scale = 0.8 }: CanvasProps) => {
  const { blocks, canvasSettings, addBlock, selectBlock, selectedBlockId, setCanvasSettings } = useBuilderStore();
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [showCrosshair, setShowCrosshair] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Calculate position style based on position value
  // const getPositionStyle = () => {
  //   const position = canvasSettings.position || 'center';
  //   let positionStyle = {};
  //   
  //   switch (position) {
  //     case 'top-left':
  //       positionStyle = { top: 0, left: 0 };
  //       break;
  //     case 'top':
  //       positionStyle = { top: 0, left: '50%', transform: 'translateX(-50%)' };
  //       break;
  //     case 'top-right':
  //       positionStyle = { top: 0, right: 0 };
  //       break;
  //     case 'left':
  //       positionStyle = { top: '50%', left: 0, transform: 'translateY(-50%)' };
  //       break;
  //     case 'center':
  //       positionStyle = { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
  //       break;
  //     case 'right':
  //       positionStyle = { top: '50%', right: 0, transform: 'translateY(-50%)' };
  //       break;
  //     case 'bottom-left':
  //       positionStyle = { bottom: 0, left: 0 };
  //       break;
  //     case 'bottom':
  //       positionStyle = { bottom: 0, left: '50%', transform: 'translateX(-50%)' };
  //       break;
  //     case 'bottom-right':
  //       positionStyle = { bottom: 0, right: 0 };
  //       break;
  //     default:
  //       positionStyle = {};
  //   }
  //   
  //   return positionStyle;
  // };

  // Handle drop of new blocks onto the canvas
  const [{ isOver }, drop] = useDrop({
    accept: ['BLOCK_TYPE', 'BLOCK_INSTANCE'],
    drop: (item: any, monitor) => {
      const canvasElement = canvasRef.current;
      if (!canvasElement) return;
      
      const canvasRect = canvasElement.getBoundingClientRect();
      const dropPosition = monitor.getClientOffset();
      
      if (!dropPosition) return;
      
      // Calculate position relative to the canvas, accounting for scale
      const x = (dropPosition.x - canvasRect.left) / scale;
      const y = (dropPosition.y - canvasRect.top) / scale;
      
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
        
        // Form elementleri için özel davranış
        const isFormElementList = [
          'input-name', 'input-email', 'input-phone', 'input-city', 
          'input-gender', 'input-address', 'input-date', 'dropdown-city',
          'checkbox-consent', 'radio-consent', 'submit-button'
        ];
        
        const isFormElement = isFormElementList.includes(item.blockType);
        
        if (isFormElement) {
          // Form container'ı bul
          const formContainer = blocks.find(block => block.type === 'input-form');

          // Varsayılan genişlik ve hizalama ayarları
          const defaultWidth = 300; // Varsayılan genişlik
          const defaultX = formContainer ? formContainer.position.x + 20 : x - (defaultWidth / 2); // Varsayılan x konumu

          const blockWidth = blockDefinition?.defaultSize?.width || defaultWidth;
          const blockHeight = blockDefinition?.defaultSize?.height || 100;
          const verticalSpacing = 10;

          if (!formContainer) {
            // Form container yoksa, normal element gibi ekle (bırakıldığı yere göre)
            const centeredX = defaultX;
            const centeredY = y - (blockHeight / 2);

            addBlock({
              type: item.blockType,
              content: blockDefinition?.defaultContent || {},
              style: blockDefinition?.defaultStyle || {},
              position: { x: centeredX, y: centeredY },
              size: { width: blockWidth, height: blockHeight },
              zIndex: 1,
            });
          } else {
            // Form container varsa, form alanlarını alt alta hizalı ekle
            const formElements = blocks.filter(block => 
              block.type !== 'input-form' && isFormElementList.includes(block.type)
            );

            // Y'ye göre sıralama
            const sortedFormElements = formElements.sort((a, b) => a.position.y - b.position.y);
            const lastElement = sortedFormElements[sortedFormElements.length - 1];

            // Yeni form elemanının y konumu: en alt bloğun altı
            const newY = lastElement
              ? lastElement.position.y + lastElement.size.height + verticalSpacing
              : formContainer.position.y + 60;

            const newX = defaultX;

            // Yeni bir form grubu oluştur veya mevcut gruba ekle
            let groupId = formContainer.groupId;
            if (!groupId) {
              // Form container için yeni bir grup oluştur
              const { createGroup } = useBuilderStore.getState();
              groupId = createGroup([formContainer.id]);
            }

            addBlock({
              type: item.blockType,
              content: blockDefinition?.defaultContent || {},
              style: {
                ...blockDefinition?.defaultStyle || {},
                width: `${defaultWidth}px`,
              },
              position: { x: newX, y: newY },
              size: { width: blockWidth, height: blockHeight },
              zIndex: 2,
              groupId,
              isGrouped: true
            });

            const totalFormElements = formElements.length + 1;
            const newFormHeight = Math.max(350, 80 + (totalFormElements * (blockHeight + verticalSpacing)) + 20);
            const { updateBlock } = useBuilderStore.getState();
            updateBlock(formContainer.id, {
              size: {
                width: formContainer.size.width,
                height: newFormHeight
              }
            });
          }
        } else {
          // Normal elementler için mevcut davranış
          const blockWidth = blockDefinition?.defaultSize?.width || 200;
          const blockHeight = blockDefinition?.defaultSize?.height || 100;
          const centeredX = x - (blockWidth / 2);
          const centeredY = y - (blockHeight / 2);
          
          // Spin Wheel için canvas boyutunu otomatik ayarla
          if (item.blockType === 'spin-wheel') {
            setCanvasSettings({
              width: 500,
              height: 400
            });
          }
          
          addBlock({
            type: item.blockType,
            content: blockDefinition?.defaultContent || {},
            style: blockDefinition?.defaultStyle || {},
            position: { x: centeredX, y: centeredY },
            size: { width: blockWidth, height: blockHeight },
            zIndex: 1,
          });
        }
      } else if (item.type === 'existing') {
        const { moveBlock } = useBuilderStore.getState();
        const block = blocks.find(b => b.id === item.id);
        if (block) {
          const centeredX = x - (block.size.width / 2);
          const centeredY = y - (block.size.height / 2);
          
          // Bloğun eski ve yeni pozisyonları arasındaki farkı hesapla
          const deltaX = centeredX - block.position.x;
          const deltaY = centeredY - block.position.y;
          
          // Eğer bu bir grup elemanıysa, tüm grubu taşı
          if (block.groupId) {
            const { moveGroup } = useBuilderStore.getState();
            moveGroup(block.groupId, deltaX, deltaY);
          } else {
            // Tek bir bloğu taşı
            moveBlock(item.id, { x: centeredX, y: centeredY });
          }
          
          // Taşıma bilgisini döndür (grup taşıma için)
          return { deltaX, deltaY };
        }
      }
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
          className="canvas-wrapper mx-auto"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            width: canvasSettings.width * scale,
            height: canvasSettings.height * scale,
            position: 'relative',
          }}
        >
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
              boxShadow: canvasSettings.shadow || '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              borderRadius: canvasSettings.cornerRadius ? `${canvasSettings.cornerRadius}px` : '0',
              border: canvasSettings.border || 'none',
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
                scale={scale}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
