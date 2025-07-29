import { useState, useEffect } from 'react';
import type { BlockInstance } from '../../../../types';
import { FlipCountdown } from './FlipCountdown';
import styles from './styles/styles.module.css';

interface CountdownTimerProps {
  block: BlockInstance;
}

export const CountdownTimerBlock = ({ block }: CountdownTimerProps) => {
  const { content, style } = block;
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      let targetDate: Date;
      
      // Mod seçimine göre hedef tarihi belirle
      if (content.mode === 'expiration') {
        // Belirli bir tarihe kadar geri sayım
        targetDate = new Date(content.expirationDate || new Date());
      } else {
        // Belirli bir süre kadar geri sayım
        const durationInMs = (content.duration || 86400) * 1000; // varsayılan 1 gün
        
        // Session modu etkinse, localStorage'dan kalan süreyi kontrol et
        if (content.sessionMode) {
          const savedEndTime = localStorage.getItem(`countdown_${block.id}`);
          
          if (savedEndTime) {
            targetDate = new Date(parseInt(savedEndTime));
          } else {
            targetDate = new Date(Date.now() + durationInMs);
            localStorage.setItem(`countdown_${block.id}`, targetDate.getTime().toString());
          }
        } else {
          targetDate = new Date(Date.now() + durationInMs);
        }
      }

      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        // Süre doldu
        setIsExpired(true);
        
        // Süre dolduktan sonra yeniden başlatma seçeneği etkinse
        if (content.resetAfterEnd) {
          const resetDurationInMs = (content.resetDuration || 86400) * 1000; // varsayılan 1 gün
          
          // Session modu etkinse, localStorage'ı güncelle
          if (content.sessionMode) {
            const newEndTime = Date.now() + resetDurationInMs;
            localStorage.setItem(`countdown_${block.id}`, newEndTime.toString());
          }
          
          // İsExpired durumunu sıfırla
          setIsExpired(false);
          
          return {
            days: Math.floor(resetDurationInMs / (1000 * 60 * 60 * 24)),
            hours: Math.floor((resetDurationInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((resetDurationInMs % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((resetDurationInMs % (1000 * 60)) / 1000),
          };
        }
        
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    // İlk hesaplama
    setTimeLeft(calculateTimeLeft());

    // Her saniye güncelle
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [block.id, content.mode, content.expirationDate, content.duration, content.sessionMode, content.resetAfterEnd, content.resetDuration]);

  // Süre dolduysa ve hideWhenExpired etkinse, hiçbir şey gösterme
  if (isExpired && content.hideWhenExpired) {
    return null;
  }

  // Flip tarzı sayaç
  if (content.style === 'flip') {
    return (
      <div style={style}>
        {content.title && <h3 className="text-center mb-2">{content.title}</h3>}
        <FlipCountdown 
          timeLeft={timeLeft} 
          isExpired={isExpired} 
          expiredMessage={content.message || "Süre doldu!"}
          numberBackgroundColor={content.numberBackgroundColor || "#000000"}
          labelColor={content.labelColor || "#666666"}
          labelFontSize={content.labelFontSize || "12px"}
          numberBorderRadius={content.numberBorderRadius || "4px"}
        />
      </div>
    );
  }

  // Standart sayaç
  return (
    <div 
      style={style} 
      className={styles.countdownContainer}
    >
      {content.title && <h3 className={styles.title}>{content.title}</h3>}
      
      {isExpired ? (
        <div className={styles.expiredMessage}>{content.message || "Süre doldu!"}</div>
      ) : (
        <div className={styles.unitsContainer}>
          <div className={styles.unit}>
            <div 
              className={styles.value} 
              style={{
                backgroundColor: content.numberBackgroundColor || "#000000",
                borderRadius: content.numberBorderRadius || "4px"
              }}
            >
              {String(timeLeft.days).padStart(2, '0')}
            </div>
            <div 
              className={styles.label}
              style={{
                color: content.labelColor || "#666666",
                fontSize: content.labelFontSize || "12px"
              }}
            >
              Gün
            </div>
          </div>
          
          <div className={styles.unit}>
            <div 
              className={styles.value}
              style={{
                backgroundColor: content.numberBackgroundColor || "#000000",
                borderRadius: content.numberBorderRadius || "4px"
              }}
            >
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <div 
              className={styles.label}
              style={{
                color: content.labelColor || "#666666",
                fontSize: content.labelFontSize || "12px"
              }}
            >
              Saat
            </div>
          </div>
          
          <div className={styles.unit}>
            <div 
              className={styles.value}
              style={{
                backgroundColor: content.numberBackgroundColor || "#000000",
                borderRadius: content.numberBorderRadius || "4px"
              }}
            >
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <div 
              className={styles.label}
              style={{
                color: content.labelColor || "#666666",
                fontSize: content.labelFontSize || "12px"
              }}
            >
              Dakika
            </div>
          </div>
          
          <div className={styles.unit}>
            <div 
              className={styles.value}
              style={{
                backgroundColor: content.numberBackgroundColor || "#000000",
                borderRadius: content.numberBorderRadius || "4px"
              }}
            >
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div 
              className={styles.label}
              style={{
                color: content.labelColor || "#666666",
                fontSize: content.labelFontSize || "12px"
              }}
            >
              Saniye
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 