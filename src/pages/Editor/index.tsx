import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBuilderStore } from '../../store/builderStore';
import { mockTemplates } from '../../utils/mockData';
import { Sidebar } from '../../components/Editor/Sidebar';
import Canvas from '../../components/Editor/Canvas';
import { PropertyPanel } from '../../components/Editor/PropertyPanel';

const EditorPage = () => {
  const { mode, templateId } = useParams<{ mode?: string; templateId?: string }>();
  const { setCanvasSettings } = useBuilderStore();
  const [scale, setScale] = useState(0.8);
  
  // Load template or set default canvas settings based on mode
  useEffect(() => {
    if (templateId) {
      // Load template
      const template = mockTemplates.find(t => t.id === templateId);
      
      if (template) {
        setCanvasSettings(template.canvasSettings);
        // TODO: Load template blocks
      }
    } else if (mode) {
      // Set default canvas settings based on mode
      setCanvasSettings({
        mode: mode === 'popup' ? 'popup' : 'banner',
        width: mode === 'popup' ? 450 : 1024,
        height: mode === 'popup' ? 600 : 80,
        background: '#ffffff',
      });
    }
  }, [mode, templateId, setCanvasSettings]);
  
  // Handle scale change
  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newScale = parseFloat(e.target.value);
    setScale(newScale);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Sidebar - Blocks */}
      <Sidebar />
      
      {/* Center - Canvas */}
      <div className="flex-grow flex flex-col overflow-hidden bg-gray-100">
        <div className="p-3 border-b bg-white flex justify-between items-center">
          <h1 className="text-lg font-semibold">
            {mode === 'popup' ? 'Popup' : 'Banner'} Editor
          </h1>
          
          <div className="flex items-center gap-4">
            {/* Scale Control */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">Zoom:</span>
              <input
                type="range"
                min="0.5"
                max="1"
                step="0.1"
                value={scale}
                onChange={handleScaleChange}
                className="w-24"
              />
              <span className="text-xs font-medium">{Math.round(scale * 100)}%</span>
            </div>
            
            <div className="flex gap-2">
              <button className="btn btn-outline text-xs py-1.5 px-3">
                Undo
              </button>
              <button className="btn btn-outline text-xs py-1.5 px-3">
                Redo
              </button>
              <button className="btn btn-primary text-xs py-1.5 px-3">
                Export
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex-grow overflow-auto">
          <Canvas scale={scale} />
        </div>
      </div>
      
      {/* Right Sidebar - Properties */}
      <PropertyPanel />
    </div>
  );
};

export default EditorPage; 