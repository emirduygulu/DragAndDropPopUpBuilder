import React from 'react';
import type { BlockInstance } from '../../../types';

interface RadioConsentProps {
  block: BlockInstance;
}

export const RadioConsentBlock = ({ block }: RadioConsentProps) => {
  const { content, style } = block;
  
  const label = content.label || 'İletişim Tercihi';
  const options = content.options || [
    'E-posta ile iletişim kurmayı kabul ediyorum',
    'SMS ile iletişim kurmayı kabul ediyorum',
    'İletişim kurmak istemiyorum'
  ];
  const required = content.required || false;
  const id = `radio-consent-${block.id}`;
  
  return (
    <div style={style} className="form-field">
      <div 
        className="form-label"
        style={{ 
          display: 'block', 
          marginBottom: '8px',
          fontWeight: style.fontWeight || '500',
          fontSize: style.fontSize || '14px',
          color: style.color
        }}
      >
        {label}
        {required && <span style={{ color: '#e53e3e', marginLeft: '3px' }}>*</span>}
      </div>
      
      <div className="radio-group">
        {options.map((option: string, index: number) => (
          <div 
            key={index} 
            className="radio-option"
            style={{
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'flex-start'
            }}
          >
            <input
              id={`${id}-${index}`}
              type="radio"
              name={id}
              value={option}
              required={required && index === 0}
              style={{
                marginRight: '8px',
                marginTop: '3px'
              }}
            />
            <label 
              htmlFor={`${id}-${index}`}
              style={{
                fontSize: '14px',
                color: style.color || '#000000',
                lineHeight: '1.5'
              }}
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};