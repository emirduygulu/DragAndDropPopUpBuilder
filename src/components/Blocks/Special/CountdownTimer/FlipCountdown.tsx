import { useEffect, useState } from 'react';
import styles from './styles/flipStyles.module.css';

interface FlipCountdownProps {
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  isExpired: boolean;
  expiredMessage: string;
  numberBackgroundColor: string;
  labelColor: string;
  labelFontSize: string;
  numberBorderRadius: string;
}

export const FlipCountdown = ({
  timeLeft,
  isExpired,
  expiredMessage,
  numberBackgroundColor,
  labelColor,
  labelFontSize,
  numberBorderRadius
}: FlipCountdownProps) => {
  const [animation, setAnimation] = useState({
    days: false,
    hours: false,
    minutes: false,
    seconds: false
  });
  
  const [prevTimeLeft, setPrevTimeLeft] = useState(timeLeft);
  
  useEffect(() => {
    // Değişen değerleri tespit et ve animasyonu tetikle
    if (timeLeft.seconds !== prevTimeLeft.seconds) {
      setAnimation(prev => ({ ...prev, seconds: true }));
      setTimeout(() => setAnimation(prev => ({ ...prev, seconds: false })), 500);
    }
    
    if (timeLeft.minutes !== prevTimeLeft.minutes) {
      setAnimation(prev => ({ ...prev, minutes: true }));
      setTimeout(() => setAnimation(prev => ({ ...prev, minutes: false })), 500);
    }
    
    if (timeLeft.hours !== prevTimeLeft.hours) {
      setAnimation(prev => ({ ...prev, hours: true }));
      setTimeout(() => setAnimation(prev => ({ ...prev, hours: false })), 500);
    }
    
    if (timeLeft.days !== prevTimeLeft.days) {
      setAnimation(prev => ({ ...prev, days: true }));
      setTimeout(() => setAnimation(prev => ({ ...prev, days: false })), 500);
    }
    
    setPrevTimeLeft(timeLeft);
  }, [timeLeft, prevTimeLeft]);
  
  const flipCardStyle = {
    backgroundColor: numberBackgroundColor,
    borderRadius: numberBorderRadius
  };
  
  const labelStyle = {
    color: labelColor,
    fontSize: labelFontSize
  };
  
  if (isExpired) {
    return (
      <div className={styles.expiredMessage}>
        {expiredMessage}
      </div>
    );
  }
  
  return (
    <div className={styles.flipCountdownContainer}>
      <div className={styles.flipUnitContainer}>
        <div className={`${styles.flipCard} ${animation.days ? styles.flip : ''}`} style={flipCardStyle}>
          <div className={styles.top}>{String(timeLeft.days).padStart(2, '0')}</div>
          <div className={styles.bottom}>{String(timeLeft.days).padStart(2, '0')}</div>
        </div>
        <div className={styles.flipCardLabel} style={labelStyle}>Gün</div>
      </div>
      
      <div className={styles.flipUnitContainer}>
        <div className={`${styles.flipCard} ${animation.hours ? styles.flip : ''}`} style={flipCardStyle}>
          <div className={styles.top}>{String(timeLeft.hours).padStart(2, '0')}</div>
          <div className={styles.bottom}>{String(timeLeft.hours).padStart(2, '0')}</div>
        </div>
        <div className={styles.flipCardLabel} style={labelStyle}>Saat</div>
      </div>
      
      <div className={styles.flipUnitContainer}>
        <div className={`${styles.flipCard} ${animation.minutes ? styles.flip : ''}`} style={flipCardStyle}>
          <div className={styles.top}>{String(timeLeft.minutes).padStart(2, '0')}</div>
          <div className={styles.bottom}>{String(timeLeft.minutes).padStart(2, '0')}</div>
        </div>
        <div className={styles.flipCardLabel} style={labelStyle}>Dakika</div>
      </div>
      
      <div className={styles.flipUnitContainer}>
        <div className={`${styles.flipCard} ${animation.seconds ? styles.flip : ''}`} style={flipCardStyle}>
          <div className={styles.top}>{String(timeLeft.seconds).padStart(2, '0')}</div>
          <div className={styles.bottom}>{String(timeLeft.seconds).padStart(2, '0')}</div>
        </div>
        <div className={styles.flipCardLabel} style={labelStyle}>Saniye</div>
      </div>
    </div>
  );
}; 