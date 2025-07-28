import type { Template } from '../types';

export const mockTemplates: Template[] = [
  // Popup Templates - Email List
  {
    id: 'popup-email-1',
    name: 'Simple Email Signup',
    description: 'A clean and simple email signup popup',
    category: 'popup',
    tags: ['email-list'],
    thumbnail: 'https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Email+Signup',
    canvasSettings: {
      mode: 'popup',
      width: 400,
      height: 300,
      background: '#ffffff',
      overlay: {
        color: '#000000',
        opacity: 0.5,
      },
      animation: {
        in: {
          type: 'fade',
          duration: 300,
          delay: 0,
          easing: 'ease-in-out',
        },
        out: {
          type: 'fade',
          duration: 300,
          delay: 0,
          easing: 'ease-in-out',
        },
      },
      trigger: {
        type: 'delay',
        value: 3000,
      },
    },
    blocks: [],
  },
  // Banner Templates - Email List
  {
    id: 'banner-email-1',
    name: 'Top Email Signup',
    description: 'Simple email signup banner for the top of the page',
    category: 'banner',
    tags: ['email-list'],
    thumbnail: 'https://via.placeholder.com/1024x80/4F46E5/FFFFFF?text=Email+Signup+Banner',
    canvasSettings: {
      mode: 'banner',
      width: 1024,
      height: 80,
      background: '#4F46E5',
      overlay: {
        color: '#000000',
        opacity: 0,
      },
      animation: {
        in: {
          type: 'slide',
          duration: 300,
          delay: 0,
          easing: 'ease-in-out',
        },
        out: {
          type: 'slide',
          duration: 300,
          delay: 0,
          easing: 'ease-in-out',
        },
      },
      trigger: {
        type: 'delay',
        value: 0,
      },
    },
    blocks: [],
  },
]; 