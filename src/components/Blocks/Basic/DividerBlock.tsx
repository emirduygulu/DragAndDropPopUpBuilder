import type { BlockInstance } from '../../../types';

interface DividerBlockProps {
  block: BlockInstance;
}

export const DividerBlock = ({ block }: DividerBlockProps) => {
  const { style } = block;
  
  return (
    <hr
      style={{
        ...style,
        width: '100%',
        margin: style.margin || '8px 0',
        border: 'none',
        height: style.height || '2px',
        backgroundColor: style.backgroundColor || '#d1d5db',
        borderRadius: style.borderRadius || '1px',
      }}
    />
  );
}; 