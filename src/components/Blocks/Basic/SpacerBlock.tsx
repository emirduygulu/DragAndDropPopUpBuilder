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
        backgroundColor: 'transparent',
      }}
    />
  );
}; 