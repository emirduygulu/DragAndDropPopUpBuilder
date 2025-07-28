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
  overflow?: string;
  cursor?: string;
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
}

// Canvas Mode
export type CanvasMode = 'popup' | 'banner';

// Canvas Settings
export interface CanvasSettings {
  mode: CanvasMode;
  width: number;
  height: number;
  background: string;
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