import type { BlockInstance } from '../../../types';

interface SubmitButtonProps {
  block: BlockInstance;
}

export const SubmitButtonBlock = ({ block }: SubmitButtonProps) => {
  const { content, style } = block;
  
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
  
  return (
    <div style={{ padding: '10px', width: '100%', height: '100%', ...style }}>
      <button
        type="submit"
        style={{
          width: '100%',
          padding: '10px 16px',
          backgroundColor: style.backgroundColor || '#0ea5e9',
          color: style.color || '#ffffff',
          border: 'none',
          borderRadius: style.borderRadius || '4px',
          fontSize: style.fontSize || '16px',
          fontWeight: 'bold',
          fontFamily: style.fontFamily || 'inherit',
          cursor: 'pointer',
          textAlign: 'center',
          transition: 'background-color 0.2s ease',
          ...parseCustomCSS()
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = content.hoverColor || '#0284c7';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = style.backgroundColor || '#0ea5e9';
        }}
      >
        {content.text || 'Gönder'}
      </button>
    </div>
  );
}; 