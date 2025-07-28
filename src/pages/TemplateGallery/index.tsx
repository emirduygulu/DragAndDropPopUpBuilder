import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../../components/UI/Layout';
import type { Template } from '../../types';

// Mock templates
const mockTemplates: Template[] = [
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

// Simplified TemplateCard
const TemplateCard = ({ template, mode }: { template: Template; mode: string }) => (
  <div className="card overflow-hidden transition-all duration-300 hover:shadow-lg">
    <div className="relative">
      <img 
        src={template.thumbnail} 
        alt={template.name} 
        className="w-full h-48 object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-60 flex items-center justify-center p-4 transition-opacity duration-300">
        <Link 
          to={`/editor/${mode}/${template.id}`} 
          className="btn btn-primary opacity-0 hover:opacity-100"
        >
          Edit Template
        </Link>
      </div>
    </div>
    
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
      <p className="text-gray-500 text-sm mb-2">{template.description}</p>
      
      <div className="flex flex-wrap gap-1 mt-2">
        {template.tags.map((tag: string) => (
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

const TemplateGalleryPage = () => {
  const { mode } = useParams<{ mode?: string }>();
  const [category, setCategory] = useState<string>('all');
  
  const filteredTemplates = mockTemplates.filter(
    (template: Template) => 
      template.category === mode && 
      (category === 'all' || template.tags.includes(category))
  );
  
  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'email-list', name: 'Email List' },
    { id: 'sales', name: 'Sales' },
    { id: 'announcements', name: 'Announcements' },
    { id: 'leads', name: 'Leads' },
  ];
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            {mode === 'popup' ? 'Popup' : 'Banner'} Templates
          </h1>
          <Link to={`/editor/${mode}`} className="btn btn-primary">
            Start from Scratch
          </Link>
        </div>
        
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`px-4 py-2 rounded-full text-sm ${
                  category === cat.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template: Template) => (
            <TemplateCard
              key={template.id}
              template={template}
              mode={mode || 'popup'}
            />
          ))}
          
          {filteredTemplates.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                No templates found for this category.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TemplateGalleryPage; 