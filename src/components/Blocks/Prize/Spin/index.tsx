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
  
  // Varsayılan ayarlar
  const settings: SpinWheelSettings = content.settings || {
    layout: {
      desktop: { width: 800, height: 600, wheelPosition: 'left', wheelSize: 300 },
      mobile: { width: 400, height: 700, wheelPosition: 'top', wheelSize: 250 }
    },
    colorTheme: {
      container: { backgroundColor: '#0077CB', textColor: '#FFFFFF' },
      submitButton: { backgroundColor: '#FC8289', textColor: '#FFFFFF' },
      wheelSlices: [
        { backgroundColor: '#F2EBCD', textColor: '#000000' },
        { backgroundColor: '#57413A', textColor: '#FFFFFF' },
        { backgroundColor: '#9CCDC3', textColor: '#000000' },
        { backgroundColor: '#FC8289', textColor: '#000000' }
      ],
      countdownBar: { backgroundColor: '#0077CB', textColor: '#FFFFFF' }
    },
    texts: {
      headline: 'Our store\'s special bonus unlocked!',
      description: 'You have a chance to win a nice big fat discount. Are you feeling lucky? Give it a spin.',
      disclaimer: 'You can spin the wheel only once.\nIf you win, coupon can be claimed for 15 mins only!\nSame email must be used when ordering.',
      submitButton: 'TRY YOUR LUCK',
      closeLink: 'No, I don\'t feel lucky',
      winningHeadline: 'Hurrah! You\'ve hit [coupon]. Lucky day!',
      losingHeadline: 'Better luck next time!',
      winningMessage: 'Congratulations! You won:',
      losingMessage: 'Sorry, try again next time!'
    },
    formFields: [
      { name: 'fullName', type: 'text', label: 'Your full name', placeholder: 'Enter your full name', show: false, required: false },
      { name: 'email', type: 'email', label: 'Your email address', placeholder: 'Enter your email', show: true, required: true },
      { name: 'phone', type: 'phone', label: 'Your phone number', placeholder: 'Enter your phone', show: false, required: false },
      { name: 'city', type: 'text', label: 'Your city', placeholder: 'Enter your city', show: false, required: false },
      { name: 'zipCode', type: 'text', label: 'Your ZIP code', placeholder: 'Enter ZIP code', show: false, required: false }
    ],
    validateEmails: false,
    preventEmailDuplicates: false,
    consentCheckbox: {
      show: false,
      text: 'I do wish to accept discounts and marketing offers to be sent to my email address.'
    },
    sliceCount: 8,
    borderWidth: 2,
    borderColor: '#000000',
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
    { id: '1', text: 'Sorry!', value: 'Losing Slice', probability: 0, type: 'lose', color: '#FFFFFF', backgroundColor: '#F2EBCD', isActive: true },
    { id: '2', text: '50% OFF', value: 'DISCOUNT50', probability: 10, type: 'win', color: '#FFFFFF', backgroundColor: '#57413A', isActive: true },
    { id: '3', text: 'Nothing', value: 'Losing Slice', probability: 0, type: 'lose', color: '#000000', backgroundColor: '#9CCDC3', isActive: true },
    { id: '4', text: '40% OFF', value: 'DISCOUNT40', probability: 20, type: 'win', color: '#000000', backgroundColor: '#FC8289', isActive: true },
    { id: '5', text: 'Almost', value: 'Losing Slice', probability: 0, type: 'lose', color: '#FFFFFF', backgroundColor: '#F2EBCD', isActive: true },
    { id: '6', text: '30% OFF', value: 'DISCOUNT30', probability: 30, type: 'win', color: '#FFFFFF', backgroundColor: '#57413A', isActive: true },
    { id: '7', text: 'No luck today', value: 'Losing Slice', probability: 0, type: 'lose', color: '#000000', backgroundColor: '#9CCDC3', isActive: true },
    { id: '8', text: '20% OFF', value: 'DISCOUNT20', probability: 40, type: 'win', color: '#000000', backgroundColor: '#FC8289', isActive: true }
  ];
  
  const slices: SpinWheelSlice[] = content.slices || defaultSlices;
  const activeSlices = slices.filter(slice => slice.isActive);
  
  // Responsive kontrol
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
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
    const radius = Math.min(centerX, centerY) - 10;
    
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
      ctx.font = 'bold 14px Arial, sans-serif';
      
      // Metni dilim içinde konumlandır
      const textRadius = radius * 0.7;
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
  const currentLayout = isMobile ? settings.layout.mobile : settings.layout.desktop;
  const wheelSize = currentLayout.wheelSize;
  
  return (
    <div 
      className={`${styles.spinWheelContainer} ${isMobile ? styles.mobile : styles.desktop}`}
      style={{
        width: currentLayout.width,
        height: currentLayout.height,
        backgroundColor: settings.colorTheme.container.backgroundColor,
        color: settings.colorTheme.container.textColor,
        ...style
      }}
    >
      {/* Logo */}
      {settings.bigLogo && (
        <div className={styles.bigLogo}>
          <img src={settings.bigLogo} alt="Logo" />
        </div>
      )}
      
      <div className={`${styles.contentWrapper} ${isMobile ? styles.mobileLayout : styles.desktopLayout}`}>
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
          
          <div className={styles.disclaimer}>
            {settings.texts.disclaimer.split('\n').map((line, index) => (
              <div key={index} className={styles.disclaimerItem}>
                • {line}
              </div>
            ))}
          </div>
          
          {/* Form Alanları */}
          <div className={styles.formSection}>
            {settings.formFields
              .filter(field => field.show)
              .map(field => (
                <div key={field.name} className={styles.formField}>
                  <label>{field.label}</label>
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
          
          {/* Close Link */}
          <div className={styles.closeLink}>
            {settings.texts.closeLink} <span className={styles.closeIcon}>×</span>
          </div>
        </div>
      </div>
      
      {/* Sonuç Popup'ı */}
      {showResult && result && (
        <div className={styles.resultPopup}>
          <div className={styles.resultContent}>
            <h3>
              {result.type === 'win' 
                ? settings.texts.winningHeadline.replace('[coupon]', result.value)
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
              <button onClick={closeResult} className={styles.closeButton}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 