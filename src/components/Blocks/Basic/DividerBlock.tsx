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
        margin: style.margin || 0,
        border: 'none',
        height: style.height || '1px',
        backgroundColor: style.backgroundColor || '#e5e7eb',
      }}
    />
  );
}; 