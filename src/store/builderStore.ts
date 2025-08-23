import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { 
  BlockInstance, 
  CanvasSettings, 
  HistoryState,
  BlockStyle
} from '../types';

interface BuilderStore {
  // Canvas state
  canvasSettings: CanvasSettings;
  
  // Blocks state
  blocks: BlockInstance[];
  selectedBlockId: string | null;
  
  // History state
  history: HistoryState[];
  currentHistoryIndex: number;
  
  // Actions
  setCanvasSettings: (settings: Partial<CanvasSettings>) => void;
  addBlock: (block: Omit<BlockInstance, 'id'>) => string;
  updateBlock: (id: string, data: Partial<BlockInstance>) => void;
  updateBlockContent: (id: string, content: any) => void;
  removeBlock: (id: string) => void;
  selectBlock: (id: string | null) => void;
  moveBlock: (id: string, position: { x: number; y: number }) => void;
  resizeBlock: (id: string, size: { width: number; height: number }) => void;
  updateBlockStyle: (id: string, style: Partial<BlockStyle>) => void;
  
  // Grup yönetimi
  createGroup: (blockIds: string[]) => string;
  addToGroup: (groupId: string, blockId: string) => void;
  removeFromGroup: (blockId: string) => void;
  moveGroup: (groupId: string, offsetX: number, offsetY: number) => void;
  
  // History actions
  saveHistory: () => void;
  undo: () => void;
  redo: () => void;
  
  // Export actions
  exportToJSON: () => { canvasSettings: CanvasSettings; blocks: BlockInstance[] };
}

// Default canvas settings
const defaultCanvasSettings: CanvasSettings = {
  mode: 'popup',
  width: 450,
  height: 600,
  background: '#ffffff',
  name: '',
  font: 'Poppins',
  cornerRadius: 0,
  shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  border: 'none',
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
    value: 3000, // 3 seconds
  },
};

export const useBuilderStore = create<BuilderStore>((set, get) => ({
  // Initial state
  canvasSettings: { ...defaultCanvasSettings },
  blocks: [],
  selectedBlockId: null,
  history: [],
  currentHistoryIndex: -1,
  
  // Canvas actions
  setCanvasSettings: (settings) => {
    set((state) => ({
      canvasSettings: { ...state.canvasSettings, ...settings },
    }));
    get().saveHistory();
  },
  
  // Block actions
  addBlock: (blockData) => {
    const id = uuidv4();
    set((state) => ({
      blocks: [
        ...state.blocks,
        {
          ...blockData,
          id,
        },
      ],
      selectedBlockId: id,
    }));
    get().saveHistory();
    return id;
  },
  
  updateBlock: (id, data) => {
    set((state) => ({
      blocks: state.blocks.map((block) =>
        block.id === id ? { ...block, ...data } : block
      ),
    }));
    get().saveHistory();
  },
  
  updateBlockContent: (id, content) => {
    set((state) => ({
      blocks: state.blocks.map((block) =>
        block.id === id ? { ...block, content } : block
      ),
    }));
    get().saveHistory();
  },
  
  removeBlock: (id) => {
    set((state) => ({
      blocks: state.blocks.filter((block) => block.id !== id),
      selectedBlockId: state.selectedBlockId === id ? null : state.selectedBlockId,
    }));
    get().saveHistory();
  },
  
  selectBlock: (id) => {
    set({ selectedBlockId: id });
  },
  
  moveBlock: (id, position) => {
    set((state) => ({
      blocks: state.blocks.map((block) =>
        block.id === id ? { ...block, position } : block
      ),
    }));
  },
  
  resizeBlock: (id, size) => {
    set((state) => ({
      blocks: state.blocks.map((block) =>
        block.id === id ? { ...block, size } : block
      ),
    }));
    get().saveHistory();
  },
  
  updateBlockStyle: (id, style) => {
    set((state) => ({
      blocks: state.blocks.map((block) =>
        block.id === id ? { ...block, style: { ...block.style, ...style } } : block
      ),
    }));
    get().saveHistory();
  },
  
  // Grup yönetimi
  createGroup: (blockIds) => {
    const groupId = uuidv4();
    set((state) => ({
      blocks: state.blocks.map((block) =>
        blockIds.includes(block.id) ? { ...block, groupId } : block
      ),
    }));
    return groupId;
  },
  
  addToGroup: (groupId, blockId) => {
    set((state) => ({
      blocks: state.blocks.map((block) =>
        block.id === blockId ? { ...block, groupId } : block
      ),
    }));
  },
  
  removeFromGroup: (blockId) => {
    set((state) => ({
      blocks: state.blocks.map((block) =>
        block.id === blockId ? { ...block, groupId: undefined } : block
      ),
    }));
  },
  
  moveGroup: (groupId, offsetX, offsetY) => {
    set((state) => ({
      blocks: state.blocks.map((block) =>
        block.groupId === groupId ? { ...block, position: { x: block.position.x + offsetX, y: block.position.y + offsetY } } : block
      ),
    }));
  },
  
  // History actions
  saveHistory: () => {
    const { blocks, canvasSettings, history, currentHistoryIndex } = get();
    
    const newHistoryState: HistoryState = {
      blocks: JSON.parse(JSON.stringify(blocks)),
      canvasSettings: JSON.parse(JSON.stringify(canvasSettings)),
      timestamp: Date.now(),
    };
    
    // Remove any future history if we're not at the end
    const newHistory = history.slice(0, currentHistoryIndex + 1);
    
    set({
      history: [...newHistory, newHistoryState],
      currentHistoryIndex: newHistory.length,
    });
  },
  
  undo: () => {
    const { currentHistoryIndex, history } = get();
    
    if (currentHistoryIndex > 0) {
      const prevState = history[currentHistoryIndex - 1];
      
      set({
        blocks: JSON.parse(JSON.stringify(prevState.blocks)),
        canvasSettings: JSON.parse(JSON.stringify(prevState.canvasSettings)),
        currentHistoryIndex: currentHistoryIndex - 1,
      });
    }
  },
  
  redo: () => {
    const { currentHistoryIndex, history } = get();
    
    if (currentHistoryIndex < history.length - 1) {
      const nextState = history[currentHistoryIndex + 1];
      
      set({
        blocks: JSON.parse(JSON.stringify(nextState.blocks)),
        canvasSettings: JSON.parse(JSON.stringify(nextState.canvasSettings)),
        currentHistoryIndex: currentHistoryIndex + 1,
      });
    }
  },
  
  // Export actions
  exportToJSON: () => {
    const { blocks, canvasSettings } = get();
    return {
      canvasSettings,
      blocks,
    };
  },
})); 