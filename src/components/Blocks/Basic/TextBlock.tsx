import * as React from 'react';
import type { BlockInstance } from '../../../types';

interface TextBlockProps {
  block: BlockInstance;
}

export const TextBlock = ({ block }: TextBlockProps) => {
  const { content, style } = block;
  
  const renderText = () => {
    const tagName = content.tag || 'p';
    const text = content.text || 'Sample text content. Click to edit this text block.';
    
    return React.createElement(
      tagName,
      { style },
      text
    );
  };
  
  return renderText();
}; 