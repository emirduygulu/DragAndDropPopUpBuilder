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
    type: 'divider',
    name: 'Divider',
    icon: 'minus',
    description: 'Add a horizontal divider',
    defaultContent: {},
    defaultStyle: {
      backgroundColor: '#e5e7eb',
      height: '1px',
      margin: '10px 0',
    },
    defaultSize: { width: 200, height: 1 },
  },
  {
    type: 'columns',
    name: 'Columns',
    icon: 'columns',
    description: 'Add a column layout',
    defaultContent: {
      columns: 2,
    },
    defaultStyle: {
      display: 'flex',
      gap: '10px',
    },
    defaultSize: { width: 400, height: 200 },
  },
  {
    type: 'html',
    name: 'HTML',
    icon: 'code',
    description: 'Add custom HTML',
    defaultContent: {
      html: '<div>Custom HTML here</div>',
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
    type: 'input-text',
    name: 'Text Input',
    icon: 'text-cursor-input',
    description: 'Add a text input field',
    defaultContent: {
      label: 'Text Input',
      placeholder: 'Enter text',
      required: false,
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
    type: 'checkbox',
    name: 'Checkbox',
    icon: 'check-square',
    description: 'Add a checkbox',
    defaultContent: {
      label: 'Checkbox',
      checked: false,
      required: false,
    },
    defaultStyle: {
      padding: '10px',
    },
    defaultSize: { width: 200, height: 40 },
  },
  {
    type: 'radio',
    name: 'Radio Button',
    icon: 'circle',
    description: 'Add radio buttons',
    defaultContent: {
      label: 'Radio Group',
      options: ['Option 1', 'Option 2', 'Option 3'],
      required: false,
    },
    defaultStyle: {
      padding: '10px',
    },
    defaultSize: { width: 200, height: 100 },
  },
  {
    type: 'dropdown',
    name: 'Dropdown',
    icon: 'chevron-down',
    description: 'Add a dropdown select',
    defaultContent: {
      label: 'Select',
      options: ['Option 1', 'Option 2', 'Option 3'],
      required: false,
    },
    defaultStyle: {
      padding: '10px',
    },
    defaultSize: { width: 200, height: 70 },
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
      showPercentage: true,
    },
    defaultStyle: {
      backgroundColor: '#e5e7eb',
      borderRadius: '4px',
      overflow: 'hidden',
    },
    defaultSize: { width: 300, height: 30 },
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
      segments: [
        { text: '10% OFF', color: '#FF6384' },
        { text: '20% OFF', color: '#36A2EB' },
        { text: 'FREE SHIPPING', color: '#FFCE56' },
        { text: 'Try Again', color: '#4BC0C0' },
        { text: '5% OFF', color: '#9966FF' },
        { text: 'Buy 1 Get 1', color: '#FF9F40' },
      ],
      buttonText: 'SPIN',
    },
    defaultStyle: {},
    defaultSize: { width: 300, height: 300 },
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