import React, { useState, useEffect } from 'react';
import type { BlockInstance } from '../../../../types';
import styles from './styles/giftBox.module.css';
import { giftBoxAsset, envelopeAsset } from './assets';

interface GiftBoxProps {
  block: BlockInstance;
}

export const GiftBoxBlock = ({ block }: GiftBoxProps) => {
  const { content, style } = block;
  
  // Durum değişkenleri
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showError, setShowError] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [hasPlayed, setHasPlayed] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // İçerik değişkenleri
  const boxCount = content.boxCount || 3;
  const boxType = content.boxType || 'gift'; // 'gift' veya 'envelope'
  const animationType = content.animationType || 'fade'; // 'fade', 'zoom', 'burst', 'spin'
  const title = content.title || 'Bir kutu seç ve şansını dene!';
  const description = content.description || 'Sürpriz bir indirim kuponu kazanabilirsin.';
  const resultTitle = content.resultTitle || 'Tebrikler!';
  const resultMessage = content.resultMessage || 'İndirim kuponunuz:';
  const errorTitle = content.errorTitle || 'Oops... Hata!';
  const errorMessage = content.errorMessage || 'Bir şeyler yanlış gitti. Lütfen tekrar deneyin.';
  const buttonText = content.buttonText || 'Kuponu Kullan';
  const buttonUrl = content.buttonUrl || '#';
  const tryAgainText = content.tryAgainText || 'Tekrar Dene';
  const singleCouponWithTryAgain = content.singleCouponWithTryAgain || false;
  
  // Kupon kodları
  const couponCodes = content.couponCodes || ['INDIRIM10'];
  const couponType = content.couponType || 'random'; // 'random', 'fixed', 'segmented'
  const fixedCouponIndex = content.fixedCouponIndex || 0;
  
  // Kullanım limiti kontrolü
  useEffect(() => {
    // localStorage'dan daha önce oynayıp oynamadığını kontrol et
    const playedBefore = localStorage.getItem('giftBoxPlayed');
    if (playedBefore) {
      setHasPlayed(true);
    }
  }, []);
  
  // Kutu seçildiğinde
  const handleBoxSelect = (index: number) => {
    if (hasPlayed && !content.allowReplay) return;
    if (selectedBox !== null) return;
    
    setSelectedBox(index);
    
    // Animasyon süresi sonunda sonucu göster
    setTimeout(() => {
      try {
        let selectedCoupon = '';
        let showTryAgain = false;
        
        if (singleCouponWithTryAgain && index !== 0) {
          // Tek kupon kodu kullanılıyorsa ve ilk kutu seçilmediyse "Tekrar Dene" göster
          showTryAgain = true;
        } else {
          switch (couponType) {
            case 'fixed':
              selectedCoupon = couponCodes[fixedCouponIndex] || couponCodes[0];
              break;
            case 'segmented':
              // Her kutuya özel kupon
              selectedCoupon = couponCodes[index] || couponCodes[0];
              break;
            case 'random':
            default:
              // Rastgele kupon
              const randomIndex = Math.floor(Math.random() * couponCodes.length);
              selectedCoupon = couponCodes[randomIndex];
              break;
          }
        }
        
        if (showTryAgain) {
          setShowError(true);
        } else {
          setCouponCode(selectedCoupon);
          setShowResult(true);
        }
        
        // Kullanım limitini kaydet
        if (!content.allowReplay) {
          localStorage.setItem('giftBoxPlayed', 'true');
          setHasPlayed(true);
        }
      } catch (error) {
        setShowError(true);
      }
    }, 1000);
  };
  
  // Kuponu kopyala
  const handleCopyCode = () => {
    navigator.clipboard.writeText(couponCode)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Kopyalama başarısız:', err);
      });
  };
  
  // Tekrar dene
  const handleTryAgain = () => {
    setSelectedBox(null);
    setShowResult(false);
    setShowError(false);
    setCouponCode('');
  };
  
  // Animasyon sınıfını belirle
  const getAnimationClass = () => {
    switch (animationType) {
      case 'zoom':
        return styles.animationZoom;
      case 'burst':
        return styles.animationBurst;
      case 'spin':
        return styles.animationSpin;
      default:
        return styles.animationFade;
    }
  };
  
  // Kutu görseli
  const getBoxImage = (index: number) => {
    return boxType === 'gift' ? giftBoxAsset : envelopeAsset;
  };
  
  return (
    <div className={styles.giftBoxContainer} style={style}>
      <h2 className={styles.giftBoxTitle}>{title}</h2>
      {description && <p className={styles.giftBoxDescription}>{description}</p>}
      
      <div className={styles.giftBoxesContainer}>
        {Array.from({ length: boxCount }).map((_, index) => (
          <div 
            key={index}
            className={`${styles.giftBoxItem} ${selectedBox === index ? styles.giftBoxSelected : ''} ${hasPlayed && !content.allowReplay ? styles.giftBoxDisabled : ''}`}
            onClick={() => handleBoxSelect(index)}
            style={{
              width: `${80 / Math.min(boxCount, 5)}%`,
              maxWidth: '120px'
            }}
          >
            <img 
              src={getBoxImage(index)}
              alt={`Hediye ${index + 1}`}
              className={styles.giftBoxImage}
            />
          </div>
        ))}
      </div>
      
      {/* Sonuç Ekranı */}
      {showResult && (
        <div className={`${styles.resultContainer} ${getAnimationClass()}`}>
          <h3 className={styles.resultTitle}>{resultTitle}</h3>
          <p className={styles.resultMessage}>{resultMessage}</p>
          
          <div className={styles.couponCode}>
            {couponCode}
            <button 
              className={styles.copyButton} 
              onClick={handleCopyCode}
              title="Kopyala"
            >
              {copied ? '✓' : '📋'}
            </button>
          </div>
          
          <a 
            href={buttonUrl} 
            className={styles.actionButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            {buttonText}
          </a>
        </div>
      )}
      
      {/* Hata Ekranı */}
      {showError && (
        <div className={`${styles.resultContainer} ${getAnimationClass()}`}>
          <div className={styles.errorContainer}>
            <h3 className={styles.errorTitle}>{errorTitle}</h3>
            <p className={styles.errorMessage}>{errorMessage}</p>
            
            <button 
              className={styles.actionButton}
              onClick={handleTryAgain}
            >
              {tryAgainText}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};