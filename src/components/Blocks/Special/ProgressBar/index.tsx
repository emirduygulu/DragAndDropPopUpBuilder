import React, { useState, useEffect } from 'react';
import type { BlockInstance } from '../../../../types';
import styles from './styles/progressBar.module.css';

interface ProgressBarProps {
  block: BlockInstance;
}

export const ProgressBarBlock = ({ block }: ProgressBarProps) => {
  const { content, style } = block;
  
  // Temel özellikler
  const progress = content.progress !== undefined ? content.progress : 50;
  const showLabel = content.showLabel !== undefined ? content.showLabel : true;
  const labelText = content.labelText || `${progress}%`;
  const title = content.title || '';
  
  // Bar tipi ve animasyon
  const barType = content.barType || 'manual'; // 'manual', 'timer', 'scroll'
  const animationType = content.animationType || 'linear'; // 'linear', 'easeInOut', 'bounce', 'pulse', 'stripes'
  const barShape = content.barShape || 'rounded'; // 'flat', 'rounded', 'circular'
  
  // Renk özellikleri
  const fillColor = content.fillColor || '#0ea5e9';
  const backgroundColor = style.backgroundColor || '#e5e7eb';
  const labelColor = content.labelColor || '#000000';
  const useGradient = content.useGradient || false;
  const gradientStartColor = content.gradientStartColor || fillColor;
  const gradientEndColor = content.gradientEndColor || fillColor;
  
  // Zamanlayıcı özellikleri
  const duration = content.duration || 60; // saniye cinsinden
  const [timerProgress, setTimerProgress] = useState(0);
  
  // Scroll özellikleri
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Simge
  const showIcon = content.showIcon || false;
  const iconType = content.iconType || 'clock';
  
  // Gösterge metinleri
  const showIndicators = content.showIndicators || false;
  const startIndicator = content.startIndicator || '0%';
  const endIndicator = content.endIndicator || '100%';
  
  // Zamanlayıcı için useEffect
  useEffect(() => {
    if (barType !== 'timer') return;
    
    const interval = setInterval(() => {
      setTimerProgress(prev => {
        const newProgress = prev + (100 / duration / 10);
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [barType, duration]);
  
  // Scroll için useEffect
  useEffect(() => {
    if (barType !== 'scroll') return;
    
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      
      const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollProgress(Math.min(scrolled, 100));
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [barType]);
  
  // Bar değerini hesapla
  const calculateProgress = () => {
    switch (barType) {
      case 'timer':
        return timerProgress;
      case 'scroll':
        return scrollProgress;
      default:
        return progress;
    }
  };
  
  const currentProgress = calculateProgress();
  
  // Bar şekli için class belirle
  const getBarShapeClass = () => {
    switch (barShape) {
      case 'flat':
        return styles.barShapeFlat;
      case 'circular':
        return styles.barShapeCircular;
      default:
        return styles.barShapeRounded;
    }
  };
  
  // Animasyon için class belirle
  const getAnimationClass = () => {
    switch (animationType) {
      case 'easeInOut':
        return styles.animationEaseInOut;
      case 'bounce':
        return styles.animationBounce;
      case 'pulse':
        return styles.animationPulse;
      case 'stripes':
        return styles.animationStripes;
      default:
        return styles.animationLinear;
    }
  };
  
  // Simge render
  const renderIcon = () => {
    if (!showIcon) return null;
    
    let icon = '⏱️';
    switch (iconType) {
      case 'star':
        icon = '⭐';
        break;
      case 'gift':
        icon = '🎁';
        break;
      case 'fire':
        icon = '🔥';
        break;
      case 'check':
        icon = '✅';
        break;
      default:
        icon = '⏱️';
    }
    
    return <span className={styles.progressIcon}>{icon}</span>;
  };
  
  // Gradient için stil
  const getGradientStyle = () => {
    if (!useGradient) return {};
    
    return {
      '--start-color': gradientStartColor,
      '--end-color': gradientEndColor,
    } as React.CSSProperties;
  };
  
  return (
    <div className={styles.progressContainer} style={style}>
      {title && <div className={styles.progressTitle}>{title}</div>}
      
      <div className={`${styles.progressBarContainer} ${getBarShapeClass()}`}>
        <div 
          className={styles.progressBackground} 
          style={{ backgroundColor }}
        />
        
        <div 
          className={`${styles.progressFill} ${getAnimationClass()} ${useGradient ? styles.gradientFill : ''}`} 
          style={{ 
            width: `${currentProgress}%`, 
            backgroundColor: useGradient ? 'transparent' : fillColor,
            ...getGradientStyle()
          }}
        />
        
        {showLabel && (
          <div className={styles.progressLabel} style={{ color: labelColor }}>
            {renderIcon()}
            {labelText}
          </div>
        )}
        
        {showIndicators && (
          <div className={styles.progressIndicator}>
            <div className={styles.progressIndicatorStart}>{startIndicator}</div>
            <div className={styles.progressIndicatorEnd}>{endIndicator}</div>
          </div>
        )}
      </div>
    </div>
  );
};