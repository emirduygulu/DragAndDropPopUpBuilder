import type { BlockInstance } from '../../../types';

interface ImageBlockProps {
  block: BlockInstance;
}

export const ImageBlock = ({ block }: ImageBlockProps) => {
  const { content, style } = block;
  
  return (
    <img
      src={content.src}
      alt={content.alt || ''}
      style={{
        ...style,
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
      }}
    />
  );
}; 