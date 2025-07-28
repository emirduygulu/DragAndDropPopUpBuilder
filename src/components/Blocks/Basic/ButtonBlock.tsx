import type { BlockInstance } from '../../../types';

interface ButtonBlockProps {
  block: BlockInstance;
}

export const ButtonBlock = ({ block }: ButtonBlockProps) => {
  const { content, style } = block;
  
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
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {content.text}
    </button>
  );
}; 