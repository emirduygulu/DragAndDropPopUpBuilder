import type { BlockInstance } from '../../../types';

interface ImageBlockProps {
  block: BlockInstance;
}

export const ImageBlock = ({ block }: ImageBlockProps) => {
  const { content, style } = block;
  
  // Default placeholder image if no src is provided
  const imageSrc = content.src || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDIwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik02MCA0MEgxNDBWNjBINjBWNDBaIiBmaWxsPSIjOUI5QkEwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iNzAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZCN0M5MCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SW1hZ2UgUGxhY2Vob2xkZXI8L3RleHQ+Cjwvc3ZnPgo=';
  const imageAlt = content.alt || 'Image placeholder';
  
  return (
    <img
      src={imageSrc}
      alt={imageAlt}
      style={{
        ...style,
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
        width: '100%',
        height: '100%',
      }}
    />
  );
}; 