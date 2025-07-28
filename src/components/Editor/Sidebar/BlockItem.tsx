import { useDrag } from 'react-dnd';
import type { BlockDefinition } from '../../../types';
import {
  Square, Type, Image, Minus, Columns, Code,
  TextCursorInput, Mail, Phone, CheckSquare, Circle, ChevronDown,
  Timer, BarChart, Share2, Video, CircleDot, SquareAsterisk, Ticket, Gift
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface BlockItemProps {
  block: BlockDefinition;
}

export const BlockItem = ({ block }: BlockItemProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'BLOCK_TYPE',
    item: { blockType: block.type, type: 'new' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // Icon mapping
  const iconMap: Record<string, LucideIcon> = {
    'square': Square, 'type': Type, 'image': Image, 'minus': Minus,
    'columns': Columns, 'code': Code, 'text-cursor-input': TextCursorInput,
    'mail': Mail, 'phone': Phone, 'check-square': CheckSquare,
    'circle': Circle, 'chevron-down': ChevronDown, 'timer': Timer,
    'bar-chart': BarChart, 'share2': Share2, 'video': Video,
    'circle-dot': CircleDot, 'square-asterisk': SquareAsterisk,
    'ticket': Ticket, 'gift': Gift
  };

  const IconComponent = iconMap[block.icon] || Square;

  return (
    <div
      ref={drag as any} // Added 'as any' to resolve type incompatibility
      className={`block-item ${isDragging ? 'opacity-50' : ''}`}
      title={block.description}
    >
      <div className="flex flex-col items-center justify-center w-full p-2 gap-1">
        <IconComponent className="block-item-icon" size={20} />
        <span className="text-xs font-medium text-center">{block.name}</span>
      </div>
    </div>
  );
}; 