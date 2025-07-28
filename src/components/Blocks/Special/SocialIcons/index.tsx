import type { BlockInstance } from '../../../../types';
import styles from './styles.module.css';

interface SocialIconsProps {
  block: BlockInstance;
}

// Sosyal medya platformları ve simgeleri
const socialIcons: Record<string, string> = {
  facebook: '󰈌',  // Facebook simgesi
  twitter: '󰕄',   // Twitter simgesi
  instagram: '󰋾', // Instagram simgesi
  linkedin: '󰌻',  // LinkedIn simgesi
  youtube: '󰗃',   // YouTube simgesi
  pinterest: '󰐇',  // Pinterest simgesi
  tiktok: '󱍔',    // TikTok simgesi
  whatsapp: '󰖣',  // WhatsApp simgesi
  telegram: '󰕄',  // Telegram simgesi
  reddit: '󰑍',    // Reddit simgesi
  github: '󰊤',    // GitHub simgesi
};

export const SocialIconsBlock = ({ block }: SocialIconsProps) => {
  const { content, style } = block;
  
  // Sosyal medya ağları
  const networks = content.networks || [
    { name: 'facebook', url: '#' },
    { name: 'twitter', url: '#' },
    { name: 'instagram', url: '#' },
  ];
  
  // Simge boyutu
  const iconSize = content.iconSize || 24;
  
  // Simge şekli (circle, square, rounded)
  const iconShape = content.iconShape || 'circle';
  
  // Simge rengi
  const iconColor = content.iconColor || '#ffffff';
  
  // Arkaplan rengi
  const iconBackgroundColor = content.iconBackgroundColor || '#1f2937';
  
  // Simge arası boşluk
  const iconSpacing = content.iconSpacing || 10;
  
  // Simge şekline göre sınıf belirle
  const getIconShapeClass = () => {
    switch (iconShape) {
      case 'square':
        return styles.square;
      case 'rounded':
        return styles.rounded;
      default:
        return styles.circle;
    }
  };
  
  // Simge stilini oluştur
  const getIconStyle = () => {
    return {
      width: `${iconSize}px`,
      height: `${iconSize}px`,
      backgroundColor: iconBackgroundColor,
      color: iconColor,
      fontSize: `${iconSize * 0.6}px`,
      margin: `0 ${iconSpacing / 2}px`,
    };
  };
  
  return (
    <div 
      className={styles.socialIconsContainer}
      style={style}
    >
      {networks.map((network, index) => (
        <a
          key={index}
          href={network.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.socialIcon} ${getIconShapeClass()}`}
          style={getIconStyle()}
          title={network.name}
        >
          {socialIcons[network.name.toLowerCase()] || '●'}
        </a>
      ))}
    </div>
  );
}; 