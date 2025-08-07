import type { BlockInstance } from '../../../types';

interface FormContainerProps {
  block: BlockInstance;
}

export const FormContainerBlock = ({ block }: FormContainerProps) => {
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
  
  return (
    <form
      action={content.action || '#'}
      method={content.method || 'post'}
      onSubmit={handleSubmit}
      style={{
        padding: style.padding || '25px',
        backgroundColor: style.backgroundColor || '#f9fafb',
        borderRadius: style.borderRadius || '8px',
        border: style.border || '1px solid #e5e7eb',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        ...parseCustomCSS()
      }}
    >
      <div style={{ 
        marginBottom: '15px',
        textAlign: 'center',
        fontSize: style.fontSize || '18px',
        fontWeight: 'bold',
        color: style.color || '#374151',
        borderBottom: '2px solid #e5e7eb',
        paddingBottom: '10px'
      }}>
        {content.title || 'Form Başlığı'}
      </div>
      
      {/* Form içeriği buraya gelecek - diğer form elementleri bu container'ın içinde render edilecek */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Form elementleri buraya dinamik olarak eklenecek */}
      </div>
    </form>
  );
}; 