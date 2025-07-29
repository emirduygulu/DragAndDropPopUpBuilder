import { useState } from 'react';
import type { BlockInstance } from '../../../types';

interface CheckboxConsentProps {
  block: BlockInstance;
}

export const CheckboxConsentBlock = ({ block }: CheckboxConsentProps) => {
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
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <input
            type="checkbox"
            id={`checkbox-consent-${block.id}`}
            required={content.required}
            style={{
              marginTop: '3px',
              marginRight: '8px',
              ...parseCustomCSS()
            }}
            onInvalid={handleInvalid}
            onInput={handleInput}
          />
          
          <label 
            htmlFor={`checkbox-consent-${block.id}`}
            style={{ 
              fontSize: style.fontSize || '14px',
              color: style.color || '#000000',
              fontFamily: style.fontFamily || 'inherit',
              lineHeight: '1.5',
              cursor: 'pointer'
            }}
          >
            {content.text || 'Kullanım koşullarını ve gizlilik politikasını kabul ediyorum.'}
            {content.required && <span style={{ color: '#e53e3e', marginLeft: '3px' }}>*</span>}
          </label>
        </div>
        
        {isInvalid && content.showError && (
          <div style={{ color: '#e53e3e', fontSize: '12px', marginTop: '4px', marginLeft: '24px' }}>
            {content.errorMessage || 'Bu alanı işaretlemeniz gerekmektedir'}
          </div>
        )}
      </div>
    </div>
  );
};
