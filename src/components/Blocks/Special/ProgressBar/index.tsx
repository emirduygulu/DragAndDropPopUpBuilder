import { useState, useEffect, useRef } from 'react';
import type { BlockInstance } from '../../../../types';
import styles from './styles/progressBar.module.css';

interface ProgressBarProps {
  block: BlockInstance;
}

export const ProgressBarBlock = ({ block }: ProgressBarProps) => {
  const { content, style } = block;
  const [progress, setProgress] = useState(0);
  const progressBarRef = useRef<HTMLDivElement>(null);
  
  // Bar tipi: manual (elle girilen), timer (zamanlayıcı), scroll (sayfa kaydırma)
  const barType = content.barType || 'manual';
  
  // Animasyon tipi: linear, ease-in-out, bounce, pulse, stripes
  const animationType = content.animationType || 'linear';
  
  // Bar şekli: rounded (yuvarlatılmış), circular (dairesel), flat (düz)
  const barShape = content.barShape || 'rounded';
  
  // Progress değerini hesapla
  useEffect(() => {
    if (barType === 'manual') {
      // Manuel olarak ayarlanan progress değeri
      setProgress(content.progress || 0);
    } else if (barType === 'timer') {
      // Zamanlayıcı ile otomatik ilerleyen progress
      const duration = (content.duration || 10) * 1000; // varsayılan 10 saniye
      const startTime = Date.now();
      
      const timer = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const calculatedProgress = Math.min(100, (elapsedTime / duration) * 100);
        
        setProgress(calculatedProgress);
        
        if (calculatedProgress >= 100) {
          clearInterval(timer);
        }
      }, 50);
      
      return () => clearInterval(timer);
    } else if (barType === 'scroll') {
      // Sayfa kaydırma ile ilerleyen progress
      const handleScroll = () => {
        if (!progressBarRef.current) return;
        
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.scrollY;
        
        const scrollProgress = Math.min(100, (scrollTop / documentHeight) * 100);
        setProgress(scrollProgress);
      };
      
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // İlk yükleme için çağır
      
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [barType, content.progress, content.duration]);
  
  // Gradient renk geçişi için style
  const getGradientStyle = () => {
    if (content.useGradient) {
      return {
        background: `linear-gradient(to right, ${content.gradientStartColor || '#3b82f6'}, ${content.gradientEndColor || '#8b5cf6'})`
      };
    }
    return { backgroundColor: content.fillColor || '#3b82f6' };
  };
  
  // Progress bar sınıflarını oluştur
  const getProgressBarClasses = () => {
    const classes = [styles.progressBar];
    
    // Bar şekli
    if (barShape === 'rounded') classes.push(styles.rounded);
    if (barShape === 'circular') classes.push(styles.circular);
    if (barShape === 'flat') classes.push(styles.flat);
    
    // Animasyon tipi
    if (animationType === 'ease-in-out') classes.push(styles.easeInOut);
    if (animationType === 'bounce') classes.push(styles.bounce);
    if (animationType === 'pulse') classes.push(styles.pulse);
    if (animationType === 'stripes') classes.push(styles.stripes);
    
    return classes.join(' ');
  };
  
  // İkon gösterimi
  const renderIcon = () => {
    if (!content.showIcon) return null;
    
    const iconType = content.iconType || 'arrow';
    
    return (
      <div className={styles.icon}>
        {iconType === 'arrow' && '→'}
        {iconType === 'star' && '★'}
        {iconType === 'check' && '✓'}
      </div>
    );
  };
  
  // Göstergeler (başlangıç/bitiş)
  const renderIndicators = () => {
    if (!content.showIndicators) return null;
    
    return (
      <div className={styles.indicators}>
        <div className={styles.startIndicator}>{content.startIndicator || '0%'}</div>
        <div className={styles.endIndicator}>{content.endIndicator || '100%'}</div>
      </div>
    );
  };
  
  return (
    <div 
      className={styles.progressContainer}
      style={style}
      ref={progressBarRef}
    >
      {/* Başlık */}
      {content.title && (
        <div className={styles.title}>{content.title}</div>
      )}
      
      {/* Progress Bar */}
      <div className={styles.progressBarContainer}>
        <div 
          className={getProgressBarClasses()}
          style={{
            width: `${progress}%`,
            ...getGradientStyle()
          }}
        >
          {/* Bar içi etiket */}
          {content.showLabel && progress > 15 && (
            <span className={styles.label} style={{ color: content.labelColor || '#ffffff' }}>
              {content.labelText || `${Math.round(progress)}%`}
            </span>
          )}
          
          {renderIcon()}
        </div>
      </div>
      
      {/* Bar dışı etiket */}
      {content.showLabel && progress <= 15 && (
        <div className={styles.externalLabel} style={{ color: content.labelColor || '#333333' }}>
          {content.labelText || `${Math.round(progress)}%`}
        </div>
      )}
      
      {renderIndicators()}
    </div>
  );
}; 