import { X } from 'lucide-react';
import type { BlockInstance } from '../../../types';

interface CloseButtonBlockProps {
  block: BlockInstance;
}

export const CloseButtonBlock = ({ block }: CloseButtonBlockProps) => {
  const { content, style } = block;
  const iconSize = content.iconSize || 24;
  
  const handleClick = () => {
    // Placeholder for close functionality
    console.log('Close button clicked');
  };
  
  return (
    <button
      onClick={handleClick}
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: style.backgroundColor || '#ffffff',
        color: style.color || '#000000',
        border: style.border || 'none',
        borderRadius: style.borderRadius || '50%',
        padding: 0,
        cursor: 'pointer',
        width: '100%',
        height: '100%',
      }}
    >
      <X size={iconSize} />
    </button>
  );
}; 