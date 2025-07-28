import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Template } from '../../types';

interface TemplateCardProps {
  template: Template;
  mode: string;
}

export const TemplateCard = ({ template, mode }: TemplateCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="card overflow-hidden transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img 
          src={template.thumbnail} 
          alt={template.name} 
          className="w-full h-48 object-cover"
        />
        
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 transition-opacity duration-300">
            <Link 
              to={`/editor/${mode}/${template.id}`} 
              className="btn btn-primary"
            >
              Edit Template
            </Link>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
        <p className="text-gray-500 text-sm mb-2">{template.description}</p>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {template.tags.map((tag) => (
            <span 
              key={tag} 
              className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}; 