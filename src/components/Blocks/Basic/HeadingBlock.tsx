import React from 'react';
import type { BlockInstance } from '../../../types';

interface HeadingBlockProps {
  block: BlockInstance;
}

export const HeadingBlock = ({ block }: HeadingBlockProps) => {
  const { content, style } = block;
  const level = content.level || 1;
  const text = content.text || 'Heading';
  
  // Create heading element based on level (h1-h6)
  return React.createElement(
    `h${level}`,
    {
      style: {
        ...style,
        margin: 0,
        padding: 0,
      },
    },
    text
  );
}; 