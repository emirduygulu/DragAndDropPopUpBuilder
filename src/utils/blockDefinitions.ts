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
    name: 'Form Container',
    icon: 'form',
    description: 'Add a form container',
    defaultContent: {
      action: '',
      method: 'post',
    },
    defaultStyle: {
      padding: '20px',
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
    },
    defaultSize: { width: 400, height: 300 },
  },
  {
    type: 'input-name',
    name: 'Name Input',
    icon: 'user',
    description: 'Add a name input field',
    defaultContent: {
      label: 'Name',
      placeholder: 'Enter your name',
      required: true,
    },
    defaultStyle: {
      padding: '10px',
    },
    defaultSize: { width: 200, height: 70 },
  },
  {
    type: 'input-email',
    name: 'Email Input',
    icon: 'mail',
    description: 'Add an email input field',
    defaultContent: {
      label: 'Email',
      placeholder: 'Enter your email',
      required: true,
    },
    defaultStyle: {
      padding: '10px',
    },
    defaultSize: { width: 200, height: 70 },
  },
  {
    type: 'input-phone',
    name: 'Phone Input',
    icon: 'phone',
    description: 'Add a phone input field',
    defaultContent: {
      label: 'Phone',
      placeholder: 'Enter your phone number',
      required: false,
    },
    defaultStyle: {
      padding: '10px',
    },
    defaultSize: { width: 200, height: 70 },
  },
  {
    type: 'input-city',
    name: 'City Input',
    icon: 'map-pin',
    description: 'Add a city input field',
    defaultContent: {
      label: 'City',
      placeholder: 'Enter your city',
      required: false,
    },
    defaultStyle: {
      padding: '10px',
    },
    defaultSize: { width: 200, height: 70 },
  },
  {
    type: 'input-gender',
    name: 'Gender Input',
    icon: 'user-check',
    description: 'Add a gender selection field',
    defaultContent: {
      label: 'Gender',
      options: ['Male', 'Female', 'Other'],
      required: false,
    },
    defaultStyle: {
      padding: '10px',
    },
    defaultSize: { width: 200, height: 100 },
  },
  {
    type: 'input-address',
    name: 'Address Input',
    icon: 'map-pin',
    description: 'Add an address input field',
    defaultContent: {
      label: 'Address',
      placeholder: 'Enter your address',
      required: false,
    },
    defaultStyle: {
      padding: '10px',
    },
    defaultSize: { width: 200, height: 70 },
  },
  {
    type: 'input-date',
    name: 'Date Input',
    icon: 'calendar',
    description: 'Add a date input field',
    defaultContent: {
      label: 'Date',
      placeholder: 'Select date',
      required: false,
    },
    defaultStyle: {
      padding: '10px',
    },
    defaultSize: { width: 200, height: 70 },
  },
  {
    type: 'dropdown-city',
    name: 'City Dropdown',
    icon: 'chevron-down',
    description: 'Add a city dropdown select',
    defaultContent: {
      label: 'Select City',
      options: ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Antalya'],
      required: false,
    },
    defaultStyle: {
      padding: '10px',
    },
    defaultSize: { width: 200, height: 70 },
  },
  {
    type: 'checkbox-consent',
    name: 'Consent Checkbox',
    icon: 'check-square',
    description: 'Add a consent checkbox',
    defaultContent: {
      label: 'I agree to the terms and conditions',
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
    name: 'Consent Radio',
    icon: 'circle',
    description: 'Add consent radio buttons',
    defaultContent: {
      label: 'Do you agree to receive marketing emails?',
      options: ['Yes', 'No'],
      required: true,
    },
    defaultStyle: {
      padding: '10px',
    },
    defaultSize: { width: 300, height: 80 },
  },
  {
    type: 'submit-button',
    name: 'Submit Button',
    icon: 'send',
    description: 'Add a submit button',
    defaultContent: {
      text: 'Submit',
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
    defaultSize: { width: 800, height: 600 },
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