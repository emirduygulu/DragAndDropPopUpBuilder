import type { BlockInstance } from '../../../types';

interface FormContainerProps {
  block: BlockInstance;
  children?: React.ReactNode;
}

export const FormContainerBlock = ({ block, children }: FormContainerProps) => {
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
        const formattedProperty = property.replace(/-([a-z])/g, (_match, letter) => letter.toUpperCase());
        customStyles[formattedProperty] = value;
      }
    });
    
    return customStyles;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form gönderme işlemi burada yapılacak
    console.log('Form gönderildi:', content);
  };
  
  // Flexbox ayarlarını uygula
  const flexDirection = content.flexDirection || 'column';
  const justifyContent = content.justifyContent || 'flex-start';
  const alignItems = content.alignItems || 'stretch';
  const flexWrap = content.flexWrap || 'nowrap';
  const gap = content.gap || '15px';
  
  return (
    <form
      id={content.formId || `form-${block.id}`}
      action={content.action || '#'}
      method={content.method || 'post'}
      onSubmit={handleSubmit}
      style={{
        padding: style.padding || '20px',
        backgroundColor: style.backgroundColor || '#f9fafb',
        borderRadius: style.borderRadius || '8px',
        border: style.border || '1px solid #e5e7eb',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: flexDirection as 'row' | 'column',
        justifyContent,
        alignItems,
        flexWrap: flexWrap as 'wrap' | 'nowrap',
        gap,
        boxShadow: style.boxShadow || '0 2px 4px rgba(0, 0, 0, 0.1)',
        ...parseCustomCSS()
      }}
    >
      {content.title && (
        <div style={{ 
          marginBottom: '15px',
          textAlign: 'center',
          fontSize: style.fontSize || '18px',
          fontWeight: 'bold',
          color: style.color || '#374151',
          width: '100%'
        }}>
          {content.title}
        </div>
      )}
      
      {/* Form içeriği */}
      <div 
        className="form-elements-container"
        style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: flexDirection as 'row' | 'column',
          justifyContent,
          alignItems,
          flexWrap: flexWrap as 'wrap' | 'nowrap',
          gap,
          width: '100%'
        }}
      >
        {children}
      </div>
    </form>
  );
}; 