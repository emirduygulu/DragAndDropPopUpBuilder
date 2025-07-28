import { useState } from 'react';
import type { BlockInstance } from '../../../types';

interface RadioConsentProps {
  block: BlockInstance;
}

interface RadioOption {
  value: string;
  label: string;
}

export const RadioConsentBlock = ({ block }: RadioConsentProps) => {
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
        const formattedProperty = property.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
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
  
  // Radio seçenekleri
  const radioOptions: RadioOption[] = content.options || [
    { value: 'agree', label: 'Kabul Ediyorum' },
    { value: 'disagree', label: 'Kabul Etmiyorum' }
  ];
  
  const groupName = `radio-consent-${block.id}`;
  
  return (
    <div style={{ padding: '10px', width: '100%', height: '100%', ...style }}>
      <div style={{ marginBottom: '8px' }}>
        <div style={{ marginBottom: '8px' }}>
          <label 
            style={{ 
              display: 'block',
              fontSize: style.fontSize || '14px',
              fontWeight: 'bold',
              color: style.color || '#000000',
              marginBottom: '8px'
            }}
          >
            {content.label || 'Onay'}
            {content.required && <span style={{ color: '#e53e3e', marginLeft: '3px' }}>*</span>}
          </label>
          
          <div style={{ marginBottom: '4px' }}>
            {content.text || 'Aşağıdaki koşulları kabul ediyor musunuz?'}
          </div>
        </div>
        
        {radioOptions.map((option: RadioOption, index: number) => (
          <div key={index} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '6px' }}>
            <input
              type="radio"
              id={`${groupName}-${index}`}
              name={groupName}
              value={option.value}
              required={content.required && index === 0}
              style={{
                marginTop: '3px',
                marginRight: '8px',
                ...parseCustomCSS()
              }}
              onInvalid={handleInvalid}
              onInput={handleInput}
            />
            
            <label 
              htmlFor={`${groupName}-${index}`}
              style={{ 
                fontSize: style.fontSize || '14px',
                color: style.color || '#000000',
                fontFamily: style.fontFamily || 'inherit',
                lineHeight: '1.5',
                cursor: 'pointer'
              }}
            >
              {option.label}
            </label>
          </div>
        ))}
        
        {isInvalid && content.showError && (
          <div style={{ color: '#e53e3e', fontSize: '12px', marginTop: '4px' }}>
            {content.errorMessage || 'Lütfen bir seçenek seçiniz'}
          </div>
        )}
      </div>
    </div>
  );
}; 