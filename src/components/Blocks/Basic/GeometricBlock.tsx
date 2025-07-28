import type { BlockInstance } from '../../../types';
import { useEffect, useState } from 'react';
import { useBuilderStore } from '../../../store/builderStore';

interface GeometricBlockProps {
  block: BlockInstance;
}

export const GeometricBlock = ({ block }: GeometricBlockProps) => {
  const { content, style } = block;
  const { updateBlock } = useBuilderStore();
  const [currentShape, setCurrentShape] = useState(content.shape || 'rectangle');
  
  // Update local state when content.shape changes
  useEffect(() => {
    setCurrentShape(content.shape || 'rectangle');
  }, [content.shape]);
  
  // Set default shape if none is specified
  useEffect(() => {
    if (!content.shape) {
      updateBlock(block.id, {
        content: { ...content, shape: 'rectangle' }
      });
    }
  }, [block.id, content, updateBlock]);
  
  const renderShape = () => {
    switch (currentShape) {
      case 'circle':
        return (
          <div
            style={{
              ...style,
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              backgroundColor: style.backgroundColor || '#3b82f6',
              opacity: style.opacity,
              border: style.border || 'none',
            }}
          />
        );
      
      case 'triangle':
        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '0',
                height: '0',
                borderLeft: `${block.size.width / 2}px solid transparent`,
                borderRight: `${block.size.width / 2}px solid transparent`,
                borderBottom: `${block.size.height}px solid ${style.backgroundColor || '#3b82f6'}`,
                position: 'absolute',
                top: 0,
                left: 0,
                opacity: style.opacity,
              }}
            />
          </div>
        );
      
      case 'oval':
        return (
          <div
            style={{
              ...style,
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              backgroundColor: style.backgroundColor || '#3b82f6',
              opacity: style.opacity,
              border: style.border || 'none',
            }}
          />
        );
        
      case 'pentagon':
        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <svg
              viewBox="0 0 100 100"
              width="100%"
              height="100%"
              preserveAspectRatio="none"
            >
              <polygon
                points="50,0 100,38 82,100 18,100 0,38"
                fill={style.backgroundColor || '#3b82f6'}
                style={{ opacity: style.opacity }}
              />
            </svg>
          </div>
        );
        
      case 'hexagon':
        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <svg
              viewBox="0 0 100 100"
              width="100%"
              height="100%"
              preserveAspectRatio="none"
            >
              <polygon
                points="25,0 75,0 100,50 75,100 25,100 0,50"
                fill={style.backgroundColor || '#3b82f6'}
                style={{ opacity: style.opacity }}
              />
            </svg>
          </div>
        );
        
      case 'star':
        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <svg
              viewBox="0 0 100 100"
              width="100%"
              height="100%"
              preserveAspectRatio="none"
            >
              <polygon
                points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35"
                fill={style.backgroundColor || '#3b82f6'}
                style={{ opacity: style.opacity }}
              />
            </svg>
          </div>
        );
        
      case 'diamond':
        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <svg
              viewBox="0 0 100 100"
              width="100%"
              height="100%"
              preserveAspectRatio="none"
            >
              <polygon
                points="50,0 100,50 50,100 0,50"
                fill={style.backgroundColor || '#3b82f6'}
                style={{ opacity: style.opacity }}
              />
            </svg>
          </div>
        );
      
      case 'rectangle':
      default:
        return (
          <div
            style={{
              ...style,
              width: '100%',
              height: '100%',
              backgroundColor: style.backgroundColor || '#3b82f6',
              borderRadius: style.borderRadius || '0',
              opacity: style.opacity,
              border: style.border || 'none',
            }}
          />
        );
    }
  };
  
  return renderShape();
};