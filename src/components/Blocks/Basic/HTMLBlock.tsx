import type { BlockInstance } from '../../../types';

interface HTMLBlockProps {
  block: BlockInstance;
}

export const HTMLBlock = ({ block }: HTMLBlockProps) => {
  const { content, style } = block;
  
  const htmlContent = content.html || `
    <div style="padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; color: #64748b;">
      <h3 style="margin: 0 0 8px 0; color: #334155;">HTML Block</h3>
      <p style="margin: 0; font-size: 14px;">Custom HTML content goes here. Click to edit this block.</p>
    </div>
  `;
  
  return (
    <div
      style={{
        ...style,
        width: '100%',
        height: '100%',
        overflow: 'auto',
      }}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};
