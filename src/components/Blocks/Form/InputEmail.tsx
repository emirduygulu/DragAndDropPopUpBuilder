import { useState } from 'react';
import type { BlockInstance } from '../../../types';

interface InputEmailProps {
  block: BlockInstance;
}

export const InputEmailBlock = ({ block }: InputEmailProps) => {
  const { content, style } = block;
  const [isInvalid, setIsInvalid] = useState(false);
  
  // Custom CSS özelliklerini işleme
  const parseCustomCSS = () => {
    if (!content.customCSS) return {};
    
    const customStyles: Record<string, string> = {};
    const cssRules = content.customCSS
      .split(';')
      .filter((rule: string) => rule.trim() !== '')
      .map((rule: string) => rule.trim());
    
    cssRules.forEach((rule: string) => {
      const [property, value] = rule.split(':').map((part) => part.trim());
      if (property && value) {
        // CSS özelliklerini camelCase formatına dönüştür (React inline style için)
        const formattedProperty = property.replace(/-([a-z])/g, (_match, letter) => letter.toUpperCase());
        customStyles[formattedProperty] = value;
      }
    });
    
    return customStyles;
  };
  
  const handleInvalid = (e: React.InvalidEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsInvalid(true);
  };
  
  const handleInput = () => {
    setIsInvalid(false);
  };
  
  return (
    <div style={{ padding: '10px', width: '100%', height: '100%', ...style }}>
      <div style={{ marginBottom: '8px' }}>
        <label 
          htmlFor={`input-email-${block.id}`}
          style={{ 
            display: 'block', 
            marginBottom: '5px',
            fontSize: style.fontSize || '14px',
            fontWeight: 'bold',
            color: style.color || '#000000'
          }}
        >
          {content.label || 'E-posta'}
          {content.required && <span style={{ color: '#e53e3e', marginLeft: '3px' }}>*</span>}
        </label>
        
        <input
          type="email"
          id={`input-email-${block.id}`}
          placeholder={content.placeholder || 'E-posta adresinizi giriniz'}
          required={content.required}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: isInvalid ? '1px solid #e53e3e' : '1px solid #d1d5db',
            borderRadius: style.borderRadius || '4px',
            fontSize: style.fontSize || '14px',
            color: style.color || '#000000',
            backgroundColor: style.backgroundColor || '#ffffff',
            fontFamily: style.fontFamily || 'inherit',
            ...parseCustomCSS()
          }}
          onInvalid={handleInvalid}
          onInput={handleInput}
        />
        
        {isInvalid && content.showError && (
          <div style={{ color: '#e53e3e', fontSize: '12px', marginTop: '4px' }}>
            {content.errorMessage || 'Lütfen geçerli bir e-posta adresi giriniz'}
          </div>
        )}
      </div>
    </div>
  );
}; 