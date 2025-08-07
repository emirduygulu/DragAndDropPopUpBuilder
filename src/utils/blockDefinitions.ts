import type { BlockCategory, BlockDefinition } from '../types';

// Basic Elements
const basicElements: BlockDefinition[] = [
  {
    type: 'text',
    name: 'Text',
    icon: 'type',
    description: 'Add text content',
    defaultContent: {
      text: 'Your text here',
      tag: 'p',
    },
    defaultStyle: {
      color: '#000000',
      fontSize: '16px',
      fontWeight: 'normal',
      textAlign: 'left',
      padding: '10px',
    },
    defaultSize: { width: 200, height: 50 },
  },
  {
    type: 'heading',
    name: 'Heading',
    icon: 'type',
    description: 'Add a heading',
    defaultContent: {
      text: 'Heading',
      level: 1,
    },
    defaultStyle: {
      color: '#1f2937',
      fontSize: '24px',
      fontWeight: '600',
      textAlign: 'left',
      padding: '8px',
    },
    defaultSize: { width: 200, height: 40 },
  },
  {
    type: 'image',
    name: 'Image',
    icon: 'image',
    description: 'Add an image',
    defaultContent: {
      src: 'https://via.placeholder.com/150',
      alt: 'Image',
    },
    defaultStyle: {
      padding: '0px',
    },
    defaultSize: { width: 150, height: 150 },
  },
  {
    type: 'button',
    name: 'Button',
    icon: 'square',
    description: 'Add a button',
    defaultContent: {
      text: 'Click me',
      url: '#',
    },
    defaultStyle: {
      backgroundColor: '#0ea5e9',
      color: '#ffffff',
      padding: '10px 20px',
      borderRadius: '4px',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    defaultSize: { width: 120, height: 40 },
  },
  {
    type: 'close-button',
    name: 'Close Button',
    icon: 'x',
    description: 'Add a close button',
    defaultContent: {
      iconSize: 24,
    },
    defaultStyle: {
      backgroundColor: '#ffffff',
      color: '#000000',
      border: '1px solid #e5e7eb',
      borderRadius: '50%',
      padding: '8px',
      cursor: 'pointer',
    },
    defaultSize: { width: 40, height: 40 },
  },
  {
    type: 'divider',
    name: 'Divider',
    icon: 'minus',
    description: 'Add a horizontal divider',
    defaultContent: {},
    defaultStyle: {
      backgroundColor: '#d1d5db',
      height: '2px',
      margin: '8px 0',
      borderRadius: '1px',
    },
    defaultSize: { width: 200, height: 2 },
  },
  {
    type: 'spacer',
    name: 'Spacer',
    icon: 'square',
    description: 'Add a spacer block',
    defaultContent: {},
    defaultStyle: {
      backgroundColor: '#f3f4f6',
      border: '1px dashed #d1d5db',
    },
    defaultSize: { width: 200, height: 50 },
  },
  {
    type: 'geometric',
    name: 'Geometric Shape',
    icon: 'square',
    description: 'Add a geometric shape',
    defaultContent: {
      shape: 'rectangle',
    },
    defaultStyle: {
      backgroundColor: '#3b82f6',
      borderRadius: '0',
      border: 'none',
    },
    defaultSize: { width: 100, height: 100 },
  },
  {
    type: 'html',
    name: 'HTML',
    icon: 'code',
    description: 'Add custom HTML',
    defaultContent: {
      html: '<div style="padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; color: #64748b;"><h3 style="margin: 0 0 8px 0; color: #334155;">HTML Block</h3><p style="margin: 0; font-size: 14px;">Custom HTML content goes here. Click to edit this block.</p></div>',
    },
    defaultStyle: {},
    defaultSize: { width: 200, height: 100 },
  },
];

// Form Elements
const formElements: BlockDefinition[] = [
  {
    type: 'input-form',
    name: 'Form Alanı',
    icon: 'form',
    description: 'Form elementleri için konteyner ekle',
    defaultContent: {
      action: '',
      method: 'post',
      title: 'Form Başlığı',
    },
    defaultStyle: {
      padding: '20px',
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
    },
    defaultSize: { width: 400, height: 350 },
  },
  {
    type: 'input-name',
    name: 'İsim Girişi',
    icon: 'user',
    description: 'İsim giriş alanı ekle',
    defaultContent: {
      label: 'İsim Soyisim',
      placeholder: 'İsim ve soyisim giriniz',
      required: true,
    },
    defaultStyle: {
      padding: '10px',
    },
    defaultSize: { width: 250, height: 80 },
  },
  {
    type: 'input-email',
    name: 'E-posta Girişi',
    icon: 'mail',
    description: 'E-posta giriş alanı ekle',
    defaultContent: {
      label: 'E-posta',
      placeholder: 'E-posta adresinizi giriniz',
      required: true,
    },
    defaultStyle: {
      padding: '10px',
    },
    defaultSize: { width: 250, height: 80 },
  },
  {
    type: 'input-phone',
    name: 'Telefon Girişi',
    icon: 'phone',
    description: 'Telefon numarası giriş alanı ekle',
    defaultContent: {
      label: 'Telefon',
      placeholder: 'Telefon numaranızı giriniz',
      required: false,
    },
    defaultStyle: {
      padding: '10px',
    },
    defaultSize: { width: 250, height: 80 },
  },
  {
    type: 'input-city',
    name: 'Şehir Girişi',
    icon: 'map-pin',
    description: 'Şehir giriş alanı ekle',
    defaultContent: {
      label: 'Şehir',
      placeholder: 'Şehrinizi giriniz',
      required: false,
    },
    defaultStyle: {
      padding: '10px',
    },
    defaultSize: { width: 250, height: 80 },
  },
  {
    type: 'input-gender',
    name: 'Cinsiyet Seçimi',
    icon: 'user-check',
    description: 'Cinsiyet seçim alanı ekle',
    defaultContent: {
      label: 'Cinsiyet',
      options: ['Erkek', 'Kadın', 'Diğer'],
      required: false,
    },
    defaultStyle: {
      padding: '10px',
    },
    defaultSize: { width: 250, height: 100 },
  },
  {
    type: 'input-address',
    name: 'Adres Girişi',
    icon: 'map-pin',
    description: 'Adres giriş alanı ekle',
    defaultContent: {
      label: 'Adres',
      placeholder: 'Adresinizi giriniz',
      required: false,
    },
    defaultStyle: {
      padding: '10px',
    },
    defaultSize: { width: 250, height: 70 },
  },
  {
    type: 'input-date',
    name: 'Doğum Tarihi',
    icon: 'birthday',
    description: 'Doğum tarihi seçim alanı ekle',
    defaultContent: {
      label: 'Doğum Tarihi',
      placeholder: 'Doğum tarihi seçiniz',
      required: false,
    },
    defaultStyle: {
      padding: '10px',
    },
    defaultSize: { width: 200, height: 70 },
  },
  {
    type: 'dropdown-city',
    name: 'Şehir Açılır Menü',
    icon: 'chevron-down',
    description: 'Şehir seçim açılır menüsü ekle',
    defaultContent: {
      label: 'Şehir Seçiniz',
      options: ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya'],
      required: false,
    },
    defaultStyle: {
      padding: '10px',
    },
    defaultSize: { width: 200, height: 70 },
  },
  {
    type: 'checkbox-consent',
    name: 'Onay Kutusu',
    icon: 'check-square',
    description: 'Onay kutusu ekle',
    defaultContent: {
      label: 'Şartlar ve koşulları kabul ediyorum',
      checked: false,
      required: true,
    },
    defaultStyle: {
      padding: '10px',
    },
    defaultSize: { width: 300, height: 40 },
  },
  {
    type: 'radio-consent',
    name: 'Onay Seçenekleri',
    icon: 'circle',
    description: 'Onay seçenekleri ekle',
    defaultContent: {
      label: 'Pazarlama e-postaları almak istiyor musunuz?',
      options: ['Evet', 'Hayır'],
      required: true,
    },
    defaultStyle: {
      padding: '10px',
    },
    defaultSize: { width: 300, height: 80 },
  },
  {
    type: 'submit-button',
    name: 'Gönder Butonu',
    icon: 'send',
    description: 'Form gönderme butonu ekle',
    defaultContent: {
      text: 'Gönder',
      type: 'submit',
    },
    defaultStyle: {
      backgroundColor: '#0ea5e9',
      color: '#ffffff',
      padding: '12px 24px',
      borderRadius: '4px',
      textAlign: 'center',
      fontWeight: 'bold',
      border: 'none',
      cursor: 'pointer',
    },
    defaultSize: { width: 120, height: 45 },
  },
];

// Special Elements
const specialElements: BlockDefinition[] = [
  {
    type: 'countdown-timer',
    name: 'Countdown Timer',
    icon: 'timer',
    description: 'Add a countdown timer',
    defaultContent: {
      endDate: new Date(Date.now() + 86400000).toISOString(), // 24 hours from now
      format: 'dd:hh:mm:ss',
    },
    defaultStyle: {
      textAlign: 'center',
      fontSize: '24px',
      fontWeight: 'bold',
    },
    defaultSize: { width: 300, height: 80 },
  },
  {
    type: 'progress-bar',
    name: 'Progress Bar',
    icon: 'bar-chart',
    description: 'Add a progress bar',
    defaultContent: {
      progress: 50,
      showLabel: true,
      labelText: '50%',
      title: '',
      barType: 'manual', // 'manual', 'timer', 'scroll'
      animationType: 'linear', // 'linear', 'easeInOut', 'bounce', 'pulse', 'stripes'
      barShape: 'rounded', // 'flat', 'rounded', 'circular'
      fillColor: '#0ea5e9',
      labelColor: '#000000',
      useGradient: false,
      gradientStartColor: '#0ea5e9',
      gradientEndColor: '#3b82f6',
      duration: 60,
      showIcon: false,
      iconType: 'clock',
      showIndicators: false,
      startIndicator: '0%',
      endIndicator: '100%'
    },
    defaultStyle: {
      backgroundColor: '#e5e7eb',
      borderRadius: '4px',
      overflow: 'hidden',
      padding: '10px',
    },
    defaultSize: { width: 300, height: 60 },
  },
  {
    type: 'social-icons',
    name: 'Social Icons',
    icon: 'share2',
    description: 'Add social media icons',
    defaultContent: {
      networks: [
        { name: 'facebook', url: '#' },
        { name: 'twitter', url: '#' },
        { name: 'instagram', url: '#' },
      ],
      size: 24,
    },
    defaultStyle: {
      display: 'flex',
      gap: '10px',
      justifyContent: 'center',
    },
    defaultSize: { width: 150, height: 40 },
  },
  {
    type: 'video',
    name: 'Video',
    icon: 'video',
    description: 'Add a video player',
    defaultContent: {
      src: '',
      autoplay: false,
      controls: true,
      muted: false,
    },
    defaultStyle: {
      borderRadius: '4px',
      overflow: 'hidden',
    },
    defaultSize: { width: 320, height: 180 },
  },
];

// Prize Elements
const prizeElements: BlockDefinition[] = [
  {
    type: 'spin-wheel',
    name: 'Spin Wheel',
    icon: 'circle-dot',
    description: 'Add a prize wheel',
    defaultContent: {
      settings: {
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
      },
      slices: [
        { id: '1', text: 'Sorry!', value: 'Losing Slice', probability: 0, type: 'lose', color: '#FFFFFF', backgroundColor: '#F2EBCD', isActive: true },
        { id: '2', text: '50% OFF', value: 'DISCOUNT50', probability: 10, type: 'win', color: '#FFFFFF', backgroundColor: '#57413A', isActive: true },
        { id: '3', text: 'Nothing', value: 'Losing Slice', probability: 0, type: 'lose', color: '#000000', backgroundColor: '#9CCDC3', isActive: true },
        { id: '4', text: '40% OFF', value: 'DISCOUNT40', probability: 20, type: 'win', color: '#000000', backgroundColor: '#FC8289', isActive: true },
        { id: '5', text: 'Almost', value: 'Losing Slice', probability: 0, type: 'lose', color: '#FFFFFF', backgroundColor: '#F2EBCD', isActive: true },
        { id: '6', text: '30% OFF', value: 'DISCOUNT30', probability: 30, type: 'win', color: '#FFFFFF', backgroundColor: '#57413A', isActive: true },
        { id: '7', text: 'No luck today', value: 'Losing Slice', probability: 0, type: 'lose', color: '#000000', backgroundColor: '#9CCDC3', isActive: true },
        { id: '8', text: '20% OFF', value: 'DISCOUNT20', probability: 40, type: 'win', color: '#000000', backgroundColor: '#FC8289', isActive: true }
      ]
    },
    defaultStyle: {
      textAlign: 'center',
    },
    defaultSize: { width: 500, height: 400 },
  },
  {
    type: 'scratch-card',
    name: 'Scratch Card',
    icon: 'square-asterisk',
    description: 'Add a scratch card',
    defaultContent: {
      coverImage: 'https://via.placeholder.com/300x200',
      revealText: 'You won 10% OFF!',
      revealBackground: '#FFD700',
    },
    defaultStyle: {
      borderRadius: '8px',
      overflow: 'hidden',
    },
    defaultSize: { width: 300, height: 200 },
  },
  {
    type: 'coupon-code',
    name: 'Coupon Code',
    icon: 'ticket',
    description: 'Add a coupon code',
    defaultContent: {
      code: 'SAVE10',
      label: 'Use code:',
      copyText: 'Copy',
    },
    defaultStyle: {
      padding: '10px',
      border: '2px dashed #e5e7eb',
      borderRadius: '4px',
      textAlign: 'center',
    },
    defaultSize: { width: 200, height: 80 },
  },
  {
    type: 'gift-box',
    name: 'Gift Box',
    icon: 'gift',
    description: 'Add a gift box animation',
    defaultContent: {
      closedImage: 'https://via.placeholder.com/200',
      openImage: 'https://via.placeholder.com/200',
      rewardText: 'You won a prize!',
    },
    defaultStyle: {
      textAlign: 'center',
    },
    defaultSize: { width: 200, height: 250 },
  },
];

// Block Categories
export const blockCategories: BlockCategory[] = [
  {
    id: 'basic',
    name: 'Basic Elements',
    blocks: basicElements,
  },
  {
    id: 'form',
    name: 'Form Elements',
    blocks: formElements,
  },
  {
    id: 'special',
    name: 'Special Elements',
    blocks: specialElements,
  },
  {
    id: 'prize',
    name: 'Prize Elements',
    blocks: prizeElements,
  },
];

// Get all blocks
export const getAllBlocks = (): BlockDefinition[] => {
  return blockCategories.flatMap(category => category.blocks);
};

// Get block by type
export const getBlockByType = (type: string): BlockDefinition | undefined => {
  return getAllBlocks().find(block => block.type === type);
}; 