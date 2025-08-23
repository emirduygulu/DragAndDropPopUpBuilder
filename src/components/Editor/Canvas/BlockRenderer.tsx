import { useDrag } from 'react-dnd';
import { useBuilderStore } from '../../../store/builderStore';
import type { BlockInstance, BlockType } from '../../../types';
import { TextBlock } from '../../Blocks/Basic/TextBlock';
import { ImageBlock } from '../../Blocks/Basic/ImageBlock';
import { ButtonBlock } from '../../Blocks/Basic/ButtonBlock';
import { DividerBlock } from '../../Blocks/Basic/DividerBlock';
import { HeadingBlock } from '../../Blocks/Basic/HeadingBlock';
import { SpacerBlock } from '../../Blocks/Basic/SpacerBlock';
import { CloseButtonBlock } from '../../Blocks/Basic/CloseButtonBlock';
import { GeometricBlock } from '../../Blocks/Basic/GeometricBlock';
import { HTMLBlock } from '../../Blocks/Basic/HTMLBlock';
import { useEffect, useRef, useState, useCallback } from 'react';

// Special blocks
import { CountdownTimerBlock } from '../../Blocks/Special/CountdownTimer/CountdownTimerBlock';
import { VideoBlock } from '../../Blocks/Special/Video';
import { SocialIconsBlock } from '../../Blocks/Special/SocialIcons';
import { ProgressBarBlock } from '../../Blocks/Special/ProgressBar';
import { GiftBoxBlock } from '../../Blocks/Prize/GiftBox';
import { SpinWheelBlock } from '../../Blocks/Prize/Spin';

// Form blocks
import { 
  FormContainerBlock,
  InputNameBlock, 
  InputEmailBlock, 
  InputPhoneBlock,
  InputCityBlock,
  InputGenderBlock,
  InputAddressBlock,
  InputDateBlock,
  DropdownCityBlock,
  CheckboxConsentBlock,
  RadioConsentBlock,
  SubmitButtonBlock
} from '../../Blocks/Form';

interface BlockRendererProps {
  block: BlockInstance;
  isSelected: boolean;
  scale?: number;
}

type ResizeHandle = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top' | 'bottom' | 'left' | 'right' | null;

export const BlockRenderer = ({ block, isSelected, scale = 1 }: BlockRendererProps) => {
  const { selectBlock, moveBlock, resizeBlock, moveGroup, blocks } = useBuilderStore();
  const blockRef = useRef<HTMLDivElement>(null);
  const [resizing, setResizing] = useState<ResizeHandle>(null);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startSize, setStartSize] = useState({ width: 0, height: 0 });
  const [startBlockPos, setStartBlockPos] = useState({ x: 0, y: 0 });
  
  // Form elementleri için grup kontrolü
  const isFormElement = [
    'input-name', 'input-email', 'input-phone', 'input-city', 
    'input-gender', 'input-address', 'input-date', 'dropdown-city',
    'checkbox-consent', 'radio-consent', 'submit-button'
  ].includes(block.type);
  
  // Form container'ı bul
  const formContainer = blocks.find(b => b.type === 'input-form');
  
  // Drag functionality for existing blocks
  const [{ isDragging }, drag] = useDrag({
    type: 'BLOCK_INSTANCE',
    item: { 
      id: block.id, 
      type: 'existing',
      isFormElement,
      groupId: block.groupId
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    canDrag: () => !resizing,
    end: (item, monitor) => {
      // Grup içindeki blokları da taşı
      if (item.groupId && monitor.didDrop()) {
        const dropResult = monitor.getDropResult() as any;
        if (dropResult && dropResult.deltaX !== undefined && dropResult.deltaY !== undefined) {
          // Grup içindeki diğer blokları da taşı
          moveGroup(item.groupId, dropResult.deltaX, dropResult.deltaY);
        }
      }
    }
  });
  
  // Make sure the block is selectable and draggable after being placed
  useEffect(() => {
    if (isSelected && blockRef.current) {
      blockRef.current.focus();
    }
  }, [isSelected]);
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectBlock(block.id);
  };
  
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // Left mouse button
      e.stopPropagation();
      selectBlock(block.id);
    }
  };
  
  // Define resize functions inside useEffect to avoid circular dependencies
  useEffect(() => {
    // Handle resize move
    const handleResizeMove = (e: MouseEvent) => {
      if (!resizing) return;
      
      console.log('Resize move:', resizing);
      
      const deltaX = e.clientX - startPos.x;
      const deltaY = e.clientY - startPos.y;
      
      console.log('Delta:', deltaX, deltaY);
      
      let newWidth = startSize.width;
      let newHeight = startSize.height;
      let newX = startBlockPos.x;
      let newY = startBlockPos.y;
      
      // Apply scale factor to make resizing work correctly with scaled canvas
      const scaledDeltaX = deltaX / scale;
      const scaledDeltaY = deltaY / scale;
      
      console.log('Scaled delta:', scaledDeltaX, scaledDeltaY);
      
      switch (resizing) {
        case 'bottom-right':
          newWidth = Math.max(20, startSize.width + scaledDeltaX);
          newHeight = Math.max(20, startSize.height + scaledDeltaY);
          break;
        case 'bottom-left':
          newWidth = Math.max(20, startSize.width - scaledDeltaX);
          newHeight = Math.max(20, startSize.height + scaledDeltaY);
          newX = startBlockPos.x + (startSize.width - newWidth);
          break;
        case 'top-right':
          newWidth = Math.max(20, startSize.width + scaledDeltaX);
          newHeight = Math.max(20, startSize.height - scaledDeltaY);
          newY = startBlockPos.y + (startSize.height - newHeight);
          break;
        case 'top-left':
          newWidth = Math.max(20, startSize.width - scaledDeltaX);
          newHeight = Math.max(20, startSize.height - scaledDeltaY);
          newX = startBlockPos.x + (startSize.width - newWidth);
          newY = startBlockPos.y + (startSize.height - newHeight);
          break;
        // Add new cases for edge handles
        case 'top':
          newHeight = Math.max(20, startSize.height - scaledDeltaY);
          newY = startBlockPos.y + (startSize.height - newHeight);
          break;
        case 'bottom':
          newHeight = Math.max(20, startSize.height + scaledDeltaY);
          break;
        case 'left':
          newWidth = Math.max(20, startSize.width - scaledDeltaX);
          newX = startBlockPos.x + (startSize.width - newWidth);
          break;
        case 'right':
          newWidth = Math.max(20, startSize.width + scaledDeltaX);
          break;
      }
      
      console.log('New size:', newWidth, newHeight);
      console.log('New position:', newX, newY);
      
      // Ensure we don't get negative positions
      newX = Math.max(0, newX);
      newY = Math.max(0, newY);
      
      // Get canvas boundaries
      const canvasElement = document.querySelector('.canvas');
      if (canvasElement) {
        const canvasRect = canvasElement.getBoundingClientRect();
        
        // Ensure the block doesn't go beyond the canvas boundaries
        const maxX = canvasRect.width / scale - newWidth;
        const maxY = canvasRect.height / scale - newHeight;
        
        newX = Math.min(newX, maxX > 0 ? maxX : 0);
        newY = Math.min(newY, maxY > 0 ? maxY : 0);
      }
      
      // Update position if it changed
      if (newX !== block.position.x || newY !== block.position.y) {
        moveBlock(block.id, { x: newX, y: newY });
      }
      
      // Update size
      resizeBlock(block.id, { width: newWidth, height: newHeight });
      
      console.log('Updated block:', block.id, { width: newWidth, height: newHeight, x: newX, y: newY });
    };
    
    // Handle resize end
    const handleResizeEnd = () => {
      console.log('Resize end');
      setResizing(null);
      
      // Remove global mouse event listeners
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeEnd);
    };
    
    // Expose handleResizeStart to the component scope
    (BlockRenderer as any).handleResizeStart = (e: React.MouseEvent, handle: ResizeHandle) => {
      e.stopPropagation();
      e.preventDefault();
      
      console.log('Resize start:', handle);
      console.log('Block initial size:', block.size);
      console.log('Block initial position:', block.position);
      
      setResizing(handle);
      setStartPos({ x: e.clientX, y: e.clientY });
      setStartSize({ width: block.size.width, height: block.size.height });
      setStartBlockPos({ x: block.position.x, y: block.position.y });
      
      // Add global mouse event listeners
      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleResizeEnd);
    };
    
    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [block, resizing, startPos, startSize, startBlockPos, moveBlock, resizeBlock, scale]);
  
  // Local handleResizeStart function that calls the one from useEffect
  const handleResizeStart = (e: React.MouseEvent, handle: ResizeHandle) => {
    if ((BlockRenderer as any).handleResizeStart) {
      (BlockRenderer as any).handleResizeStart(e, handle);
    }
  };
  
  // Render the appropriate block component based on block type
  const renderBlockContent = () => {
    const blockType = block.type as BlockType;
    
    switch (blockType) {
      // Basic blocks
      case 'text':
        return <TextBlock block={block} />;
      case 'heading':
        return <HeadingBlock block={block} />;
      case 'image':
        return <ImageBlock block={block} />;
      case 'button':
        return <ButtonBlock block={block} />;
      case 'close-button':
        return <CloseButtonBlock block={block} />;
      case 'divider':
        return <DividerBlock block={block} />;
      case 'spacer':
        return <SpacerBlock block={block} />;
      case 'geometric':
        return <GeometricBlock block={block} />;
      case 'html':
        return <HTMLBlock block={block} />;
        
      // Special blocks
      case 'countdown-timer':
        return <CountdownTimerBlock block={block} />;
      case 'video':
        return <VideoBlock block={block} />;
      case 'social-icons':
        return <SocialIconsBlock block={block} />;
      case 'progress-bar':
        return <ProgressBarBlock block={block} />;
      case 'gift-box':
        return <GiftBoxBlock block={block} />;
      case 'spin-wheel':
        return <SpinWheelBlock block={block} />;
        
      // Form blocks
      case 'input-form':
        return <FormContainerBlock block={block} />;
      case 'input-name':
        return <InputNameBlock block={block} />;
      case 'input-email':
        return <InputEmailBlock block={block} />;
      case 'input-phone':
        return <InputPhoneBlock block={block} />;
      case 'input-city':
        return <InputCityBlock block={block} />;
      case 'input-gender':
        return <InputGenderBlock block={block} />;
      case 'input-address':
        return <InputAddressBlock block={block} />;
      case 'input-date':
        return <InputDateBlock block={block} />;
      case 'dropdown-city':
        return <DropdownCityBlock block={block} />;
      case 'checkbox-consent':
        return <CheckboxConsentBlock block={block} />;
      case 'radio-consent':
        return <RadioConsentBlock block={block} />;
      case 'submit-button':
        return <SubmitButtonBlock block={block} />;
        
      default:
        return (
          <div style={{ padding: '10px' }}>
            Block: {block.type}
          </div>
        );
    }
  };

  return (
    <div
      ref={(node) => {
        drag(node);
        if (blockRef) {
          blockRef.current = node as HTMLDivElement;
        }
      }}
      className={`absolute ${
        isSelected ? 'shadow-block-selected' : 'shadow-block'
      } ${isDragging ? 'block-dragging' : ''}`}
      style={{
        left: block.position.x,
        top: block.position.y,
        width: block.size.width,
        height: block.size.height,
        zIndex: block.zIndex,
        cursor: isSelected ? 'move' : 'pointer',
        border: isSelected ? '2px solid #0ea5e9' : '1px solid transparent',
        backgroundColor: block.style.backgroundColor || 'transparent',
        borderRadius: block.style.borderRadius || '0',
        overflow: 'hidden',
        outline: 'none',
        // Form elementleri için özel stil
        ...(isFormElement && {
          border: '1px solid #e5e7eb',
          borderRadius: '4px',
          backgroundColor: '#ffffff',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        })
      }}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      tabIndex={0}
    >
      {renderBlockContent()}
      
      {/* Selection handles with resize functionality */}
      {isSelected && (
        <>
          {/* Corner resize handles */}
          <div 
            className="absolute -top-1.5 -left-1.5 w-4 h-4 bg-white border-2 border-primary-500 rounded-full cursor-nwse-resize z-50 hover:bg-primary-100" 
            onMouseDown={(e) => handleResizeStart(e, 'top-left')}
          />
          <div 
            className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-white border-2 border-primary-500 rounded-full cursor-nesw-resize z-50 hover:bg-primary-100" 
            onMouseDown={(e) => handleResizeStart(e, 'top-right')}
          />
          <div 
            className="absolute -bottom-1.5 -left-1.5 w-4 h-4 bg-white border-2 border-primary-500 rounded-full cursor-nesw-resize z-50 hover:bg-primary-100" 
            onMouseDown={(e) => handleResizeStart(e, 'bottom-left')}
          />
          <div 
            className="absolute -bottom-1.5 -right-1.5 w-4 h-4 bg-white border-2 border-primary-500 rounded-full cursor-nwse-resize z-50 hover:bg-primary-100" 
            onMouseDown={(e) => handleResizeStart(e, 'bottom-right')}
          />
          
          {/* Edge resize handles */}
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary-500 rounded-full cursor-ns-resize z-50 hover:bg-primary-100" 
            onMouseDown={(e) => handleResizeStart(e, 'top')}
          />
          <div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-white border-2 border-primary-500 rounded-full cursor-ns-resize z-50 hover:bg-primary-100" 
            onMouseDown={(e) => handleResizeStart(e, 'bottom')}
          />
          <div 
            className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary-500 rounded-full cursor-ew-resize z-50 hover:bg-primary-100" 
            onMouseDown={(e) => handleResizeStart(e, 'left')}
          />
          <div 
            className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary-500 rounded-full cursor-ew-resize z-50 hover:bg-primary-100" 
            onMouseDown={(e) => handleResizeStart(e, 'right')}
          />
        </>
      )}
    </div>
  );
}; 