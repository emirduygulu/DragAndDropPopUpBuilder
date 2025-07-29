import type { BlockInstance } from '../../../types';

interface ButtonBlockProps {
  block: BlockInstance;
}

export const ButtonBlock = ({ block }: ButtonBlockProps) => {
  const { content, style } = block;
  
  const buttonText = content.text || 'Click Me';
  
  return (
    <button
      style={{
        ...style,
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: style.backgroundColor || '#3b82f6',
        color: style.color || '#ffffff',
        border: style.border || 'none',
        borderRadius: style.borderRadius || '4px',
        fontSize: style.fontSize || '14px',
        fontWeight: style.fontWeight || '500',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {buttonText}
    </button>
  );
}; 