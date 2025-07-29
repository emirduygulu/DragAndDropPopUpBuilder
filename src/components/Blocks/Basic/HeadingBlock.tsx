import React from 'react';
import type { BlockInstance } from '../../../types';

interface HeadingBlockProps {
  block: BlockInstance;
}

export const HeadingBlock = ({ block }: HeadingBlockProps) => {
  const { content, style } = block;
  const level = content.level || 1;
  const text = content.text || `Heading ${level}`;
  
  // Create heading element based on level (h1-h6)
  return React.createElement(
    `h${level}`,
    {
      style: {
        ...style,
        margin: 0,
        padding: '8px',
        fontSize: style.fontSize || `${Math.max(24 - (level - 1) * 2, 16)}px`,
        fontWeight: style.fontWeight || '600',
        color: style.color || '#1f2937',
        backgroundColor: style.backgroundColor || 'transparent',
      },
    },
    text
  );
}; 