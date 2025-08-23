import React, { useState, useEffect, useRef } from 'react';
import type { BlockInstance, SpinWheelSlice, SpinWheelSettings, SpinWheelFormField } from '../../../../types';
import styles from './styles/spinWheel.module.css';

interface SpinWheelBlockProps {
  block: BlockInstance;
}

export const SpinWheelBlock = ({ block }: SpinWheelBlockProps) => {
  const { content, style } = block;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<SpinWheelSlice | null>(null);
  const [rotation, setRotation] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [consentChecked, setConsentChecked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  
  // Varsayılan ayarlar - daha küçük boyutlarla
  const settings: SpinWheelSettings = content.settings || {
    layout: {
      desktop: { width: 300, height: 300, wheelPosition: 'left', wheelSize: 150 },
      mobile: { width: 260, height: 350, wheelPosition: 'top', wheelSize: 130 }
    },
    colorTheme: {
      container: { backgroundColor: '#ffffff', textColor: '#1f2937' },
      submitButton: { backgroundColor: '#8b5cf6', textColor: '#ffffff' },
      wheelSlices: [
        { backgroundColor: '#8b5cf6', textColor: '#ffffff' },
        { backgroundColor: '#ffffff', textColor: '#1f2937' },
        { backgroundColor: '#8b5cf6', textColor: '#ffffff' },
        { backgroundColor: '#ffffff', textColor: '#1f2937' },
        { backgroundColor: '#8b5cf6', textColor: '#ffffff' },
        { backgroundColor: '#ffffff', textColor: '#1f2937' }
      ],
      countdownBar: { backgroundColor: '#8b5cf6', textColor: '#ffffff' }
    },
    texts: {
      headline: 'Spin for Rewards!',
      description: 'Enter your email and spin the wheel to unlock discounts.',
      disclaimer: 'By subscribing, you agree to receive marketing emails.',
      submitButton: 'Spin Now',
      closeLink: 'No thanks',
      winningHeadline: 'Congratulations! You won:',
      losingHeadline: 'Better luck next time!',
      winningMessage: 'You\'ve unlocked a reward!',
      losingMessage: 'Don\'t worry, you can try again!'
    },
    formFields: [
      { name: 'email', type: 'email', label: 'Email', placeholder: 'Enter your email', show: true, required: true }
    ],
    validateEmails: false,
    preventEmailDuplicates: false,
    consentCheckbox: {
      show: false,
      text: 'I agree to receive marketing emails.'
    },
    sliceCount: 6,
    borderWidth: 2,
    borderColor: '#8b5cf6',
    borderStyle: 'solid',
    spinDuration: 4000,
    spinEasing: 'ease-out',
    spinLimit: 'once',
    triggerType: 'button',
    triggerDelay: 5,
    showOnDesktop: true,
    showOnMobile: true,
    showOnExit: false,
    showToSameUser: 'once'
  };
  
  // Varsayılan dilimler
  const defaultSlices: SpinWheelSlice[] = [
    { id: '1', text: '15%', value: 'DISCOUNT15', probability: 25, type: 'win', color: '#ffffff', backgroundColor: '#8b5cf6', isActive: true },
    { id: '2', text: '5%', value: 'DISCOUNT5', probability: 15, type: 'win', color: '#1f2937', backgroundColor: '#ffffff', isActive: true },
    { id: '3', text: '10%', value: 'DISCOUNT10', probability: 20, type: 'win', color: '#ffffff', backgroundColor: '#8b5cf6', isActive: true },
    { id: '4', text: '15%', value: 'DISCOUNT15', probability: 25, type: 'win', color: '#1f2937', backgroundColor: '#ffffff', isActive: true },
    { id: '5', text: '5%', value: 'DISCOUNT5', probability: 15, type: 'win', color: '#ffffff', backgroundColor: '#8b5cf6', isActive: true },
    { id: '6', text: '10%', value: 'DISCOUNT10', probability: 20, type: 'win', color: '#1f2937', backgroundColor: '#ffffff', isActive: true }
  ];
  
  const slices: SpinWheelSlice[] = content.slices || defaultSlices;
  const activeSlices = slices.filter(slice => slice.isActive);
  
  // Responsive kontrol
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setDeviceMode(mobile ? 'mobile' : 'desktop');
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Kullanım limiti kontrolü
  useEffect(() => {
    const spinKey = `spinWheel_${block.id}`;
    const hasSpunBefore = localStorage.getItem(spinKey);
    if (hasSpunBefore && settings.spinLimit === 'once') {
      setHasSpun(true);
    }
  }, [block.id, settings.spinLimit]);
  
  // Canvas çizimi
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10; // Biraz daha küçük radius
    
    // Canvas'ı temizle
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dilimleri çiz
    const sliceAngle = (2 * Math.PI) / activeSlices.length;
    
    activeSlices.forEach((slice, index) => {
      const startAngle = index * sliceAngle + rotation;
      const endAngle = (index + 1) * sliceAngle + rotation;
      
      // Dilim çizimi
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = slice.backgroundColor;
      ctx.fill();
      
      // Border çizimi
      if (settings.borderWidth > 0) {
        ctx.strokeStyle = settings.borderColor;
        ctx.lineWidth = settings.borderWidth;
        ctx.stroke();
      }
      
      // Metin çizimi
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = slice.color;
      ctx.font = 'bold 14px Arial, sans-serif'; // Daha küçük font
      
      // Metni dilim içinde konumlandır
      const textRadius = radius * 0.6;
      ctx.fillText(slice.text, textRadius, 0);
      ctx.restore();
    });
    
    // Merkez logo
    if (settings.smallLogo) {
      const img = new Image();
      img.onload = () => {
        const imgSize = radius * 0.3;
        ctx.drawImage(img, centerX - imgSize/2, centerY - imgSize/2, imgSize, imgSize);
      };
      img.src = settings.smallLogo;
    }
    
  }, [activeSlices, rotation, settings]);
  
  // Form değişikliklerini handle et
  const handleFormChange = (fieldName: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };
  
  // Form validasyonu
  const isFormValid = () => {
    const requiredFields = settings.formFields.filter(field => field.show && field.required);
    const hasAllRequired = requiredFields.every(field => formData[field.name]?.trim());
    
    if (settings.consentCheckbox.show && !consentChecked) {
      return false;
    }
    
    return hasAllRequired;
  };
  
  // Spin fonksiyonu
  const handleSpin = () => {
    if (isSpinning || (hasSpun && settings.spinLimit === 'once') || !isFormValid()) return;
    
    setIsSpinning(true);
    
    // Sadece aktif ve kazanan dilimler arasından seç
    const winningSlices = activeSlices.filter(slice => slice.type === 'win' && slice.probability > 0);
    const totalProbability = winningSlices.reduce((sum, slice) => sum + slice.probability, 0);
    
    let selectedSlice: SpinWheelSlice;
    
    if (totalProbability > 0) {
      const random = Math.random() * totalProbability;
      let cumulativeProbability = 0;
      
      for (const slice of winningSlices) {
        cumulativeProbability += slice.probability;
        if (random <= cumulativeProbability) {
          selectedSlice = slice;
          break;
        }
      }
    } else {
      // Hiç kazanan dilim yoksa rastgele bir dilim seç
      selectedSlice = activeSlices[Math.floor(Math.random() * activeSlices.length)];
    }
    
    // Dönme animasyonu
    const targetRotation = rotation + 360 * 5 + Math.random() * 360;
    const startTime = Date.now();
    const duration = settings.spinDuration;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing fonksiyonu
      let easeProgress;
      switch (settings.spinEasing) {
        case 'ease-out':
          easeProgress = 1 - Math.pow(1 - progress, 3);
          break;
        case 'ease-in-out':
          easeProgress = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
          break;
        default:
          easeProgress = progress;
      }
      
      const currentRotation = rotation + (targetRotation - rotation) * easeProgress;
      setRotation(currentRotation);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Animasyon bitti
        setIsSpinning(false);
        setResult(selectedSlice);
        setShowResult(true);
        
        // Kullanım limitini kaydet
        if (settings.spinLimit === 'once') {
          localStorage.setItem(`spinWheel_${block.id}`, 'true');
          setHasSpun(true);
        }
      }
    };
    
    animate();
  };
  
  // Sonuç popup'ını kapat
  const closeResult = () => {
    setShowResult(false);
    setResult(null);
  };
  
  // Layout hesaplamaları
  const currentLayout = deviceMode === 'mobile' ? settings.layout.mobile : settings.layout.desktop;
  const wheelSize = currentLayout.wheelSize;
  
  return (
    <div 
      className={`${styles.spinWheelContainer} ${deviceMode === 'mobile' ? styles.mobile : styles.desktop}`}
      style={{
        width: currentLayout.width,
        height: currentLayout.height,
        backgroundColor: settings.colorTheme.container.backgroundColor,
        color: settings.colorTheme.container.textColor,
        ...style
      }}
    >
      {/* Close Button */}
      <button className={styles.closeButton}>
        <span>×</span>
      </button>
      
      <div className={`${styles.contentWrapper} ${deviceMode === 'mobile' ? styles.mobileLayout : styles.desktopLayout}`}>
        {/* Sol/Top Panel - Çark */}
        <div className={`${styles.wheelSection} ${styles[`wheel${currentLayout.wheelPosition}`]}`}>
          <canvas
            ref={canvasRef}
            width={wheelSize}
            height={wheelSize}
            className={styles.wheelCanvas}
          />
          
          {/* Pointer */}
          <div className={styles.pointer} />
        </div>
        
        {/* Sağ/Bottom Panel - İçerik */}
        <div className={styles.contentSection}>
          <h1 className={styles.headline}>{settings.texts.headline}</h1>
          <p className={styles.description}>{settings.texts.description}</p>
          
          {/* Form Alanları */}
          <div className={styles.formSection}>
            {settings.formFields
              .filter(field => field.show)
              .map(field => (
                <div key={field.name} className={styles.formField}>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleFormChange(field.name, e.target.value)}
                    required={field.required}
                    className={styles.formInput}
                  />
                </div>
              ))}
            
            {/* Consent Checkbox */}
            {settings.consentCheckbox.show && (
              <div className={styles.consentCheckbox}>
                <label>
                  <input
                    type="checkbox"
                    checked={consentChecked}
                    onChange={(e) => setConsentChecked(e.target.checked)}
                  />
                  <span>{settings.consentCheckbox.text}</span>
                </label>
              </div>
            )}
          </div>
          
          {/* Spin Butonu */}
          <button
            onClick={handleSpin}
            disabled={isSpinning || (hasSpun && settings.spinLimit === 'once') || !isFormValid()}
            className={styles.spinButton}
            style={{
              backgroundColor: settings.colorTheme.submitButton.backgroundColor,
              color: settings.colorTheme.submitButton.textColor
            }}
          >
            {isSpinning ? 'Spinning...' : settings.texts.submitButton}
          </button>
          
          {/* Disclaimer */}
          <div className={styles.disclaimer}>
            {settings.texts.disclaimer}
          </div>
        </div>
      </div>
      
      {/* Sonuç Popup'ı */}
      {showResult && result && (
        <div className={styles.resultPopup}>
          <div className={styles.resultContent}>
            <h3>
              {result.type === 'win' 
                ? settings.texts.winningHeadline
                : settings.texts.losingHeadline
              }
            </h3>
            <p>
              {result.type === 'win' ? settings.texts.winningMessage : settings.texts.losingMessage}
            </p>
            
            {result.type === 'win' && result.value && result.value !== 'Losing Slice' && (
              <div className={styles.prizeValue}>
                <strong>{result.value}</strong>
              </div>
            )}
            
            <div className={styles.resultActions}>
              <button onClick={closeResult} className={styles.closeResultButton}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 