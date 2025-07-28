import * as React from 'react';
import type { BlockInstance } from '../../../types';

interface TextBlockProps {
  block: BlockInstance;
}

export const TextBlock = ({ block }: TextBlockProps) => {
  const { content, style } = block;
  
  const renderText = () => {
    const tagName = content.tag || 'p';
    
    return React.createElement(
      tagName,
      { style },
      content.text
    );
  };
  
  return renderText();
}; 