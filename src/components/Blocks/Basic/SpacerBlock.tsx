import type { BlockInstance } from '../../../types';

interface SpacerBlockProps {
  block: BlockInstance;
}

export const SpacerBlock = ({ block }: SpacerBlockProps) => {
  const { style } = block;
  
  return (
    <div
      style={{
        ...style,
        width: '100%',
        height: '100%',
        backgroundColor: style.backgroundColor || '#f3f4f6',
        border: style.border || '1px dashed #d1d5db',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        color: '#6b7280',
      }}
    >
      Spacer Block
    </div>
  );
}; 