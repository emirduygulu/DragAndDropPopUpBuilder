// Block Types
export type BlockType =
  // Basic elements
  | 'text'
  | 'image'
  | 'button'
  | 'divider'
  | 'columns'
  | 'html'
  | 'spacer'
  | 'geometric'
  | 'heading'
  | 'close-button'
  
  // Form elements
  | 'input-form'
  | 'input-text'
  | 'input-email'
  | 'input-phone'
  | 'input-date'
  | 'checkbox'
  | 'radio'
  | 'dropdown'
  | 'textarea'
  | 'input-name'
  | 'input-city'
  | 'input-gender'
  | 'input-address'
  | 'dropdown-city'
  | 'checkbox-consent'
  | 'radio-consent'
  | 'submit-button'
  
  // Special elements
  | 'countdown-timer'
  | 'progress-bar'
  | 'social-icons'
  | 'video'
  
  // Prize elements
  | 'spin-wheel'
  | 'scratch-card'
  | 'coupon-code'
  | 'gift-box';

// Block Style
export interface BlockStyle {
  backgroundColor?: string;
  color?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  padding?: string;
  margin?: string;
  border?: string;
  borderRadius?: string;
  boxShadow?: string;
  opacity?: number;
  width?: string;
  height?: string;
  // Ek CSS özellikleri
  display?: string;
  gap?: string;
  justifyContent?: string;
  alignItems?: string;
  flexDirection?: string;
  flexWrap?: string;
  flexGrow?: string;
  flexShrink?: string;
  flexBasis?: string;
  alignSelf?: string;
  overflow?: string;
  cursor?: string;
  borderColor?: string;
  borderWidth?: string;
  borderStyle?: string;
}

// Block Animation
export interface BlockAnimation {
  type: 'fade' | 'slide' | 'zoom' | 'bounce' | 'none';
  duration: number; // in milliseconds
  delay: number; // in milliseconds
  easing: string;
}

// Block Action
export interface BlockAction {
  type: 'link' | 'submit' | 'close' | 'custom';
  target?: string;
  callback?: string;
}

// Spin Wheel Types
export interface SpinWheelSlice {
  id: string;
  text: string;
  value: string;
  probability: number; // 0-100
  type: 'win' | 'lose';
  color: string;
  backgroundColor: string;
  isActive: boolean;
  action?: {
    type: 'popup' | 'coupon' | 'redirect' | 'event';
    value: string;
    url?: string;
  };
}

export interface SpinWheelFormField {
  name: string;
  type: 'text' | 'email' | 'phone' | 'number' | 'select';
  label: string;
  placeholder?: string;
  show: boolean;
  required: boolean;
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
  };
}

export interface SpinWheelLayout {
  desktop: {
    width: number;
    height: number;
    wheelPosition: 'left' | 'right' | 'center';
    wheelSize: number;
  };
  mobile: {
    width: number;
    height: number;
    wheelPosition: 'top' | 'bottom' | 'center';
    wheelSize: number;
  };
}

export interface SpinWheelColorTheme {
  container: {
    backgroundColor: string;
    textColor: string;
  };
  submitButton: {
    backgroundColor: string;
    textColor: string;
  };
  wheelSlices: Array<{
    backgroundColor: string;
    textColor: string;
  }>;
  countdownBar: {
    backgroundColor: string;
    textColor: string;
  };
}

export interface SpinWheelTexts {
  headline: string;
  description: string;
  disclaimer: string;
  submitButton: string;
  closeLink: string;
  winningHeadline: string;
  losingHeadline: string;
  winningMessage: string;
  losingMessage: string;
}

export interface SpinWheelSettings {
  // Layout
  layout: SpinWheelLayout;
  
  // Colors
  colorTheme: SpinWheelColorTheme;
  
  // Texts
  texts: SpinWheelTexts;
  
  // Form
  formFields: SpinWheelFormField[];
  validateEmails: boolean;
  preventEmailDuplicates: boolean;
  consentCheckbox: {
    show: boolean;
    text: string;
  };
  
  // Logos
  bigLogo?: string;
  smallLogo?: string;
  
  // Wheel settings
  sliceCount: number; // 2-20
  borderWidth: number;
  borderColor: string;
  borderStyle: 'solid' | 'dashed' | 'dotted';
  spinDuration: number; // milliseconds
  spinEasing: 'ease-out' | 'ease-in-out' | 'linear';
  
  // Behavior
  spinLimit: 'once' | 'daily' | 'unlimited';
  triggerType: 'auto' | 'button' | 'scroll';
  triggerDelay: number; // seconds
  
  // Display settings
  showOnDesktop: boolean;
  showOnMobile: boolean;
  showOnExit: boolean;
  
  // User frequency
  showToSameUser: 'once' | 'daily' | 'weekly' | 'monthly' | 'unlimited';
}

// Block Instance
export interface BlockInstance {
  id: string;
  type: BlockType;
  content: any;
  style: BlockStyle;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  animation?: BlockAnimation;
  actions?: BlockAction[];
  groupId?: string; // Bloğun ait olduğu grup ID'si
  isGrouped?: boolean; // Bloğun bir gruba ait olup olmadığı
}

// Canvas Mode
export type CanvasMode = 'popup' | 'banner';

// Canvas Settings
export interface CanvasSettings {
  mode: CanvasMode;
  width: number;
  height: number;
  background: string;
  name?: string;
  font?: string;
  cornerRadius?: number;
  shadow?: string;
  border?: string;
  overlay?: {
    color: string;
    opacity: number;
  };
  animation?: {
    in: BlockAnimation;
    out: BlockAnimation;
  };
  trigger?: {
    type: 'delay' | 'scroll' | 'exit' | 'click';
    value: number | string;
  };
  // Ek özellikler
  subject?: string;
  subtitle?: string;
  theme?: {
    padding?: string;
    fontFamily?: string;
    color?: string;
    backgroundColor?: string;
  };
}

// History State
export interface HistoryState {
  blocks: BlockInstance[];
  canvasSettings: CanvasSettings;
  timestamp: number;
}

// Template
export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'popup' | 'banner';
  tags: string[];
  thumbnail: string;
  canvasSettings: CanvasSettings;
  blocks: BlockInstance[];
}

// Category
export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

// Block Category
export interface BlockCategory {
  id: string;
  name: string;
  blocks: BlockDefinition[];
}

// Block Definition
export interface BlockDefinition {
  type: BlockType;
  name: string;
  icon: string;
  description: string;
  defaultContent: any;
  defaultStyle: BlockStyle;
  defaultSize: { width: number; height: number };
} 