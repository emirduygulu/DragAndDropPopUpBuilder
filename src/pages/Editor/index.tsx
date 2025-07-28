import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBuilderStore } from '../../store/builderStore';
import { mockTemplates } from '../../utils/mockData';
import { Sidebar } from '../../components/Editor/Sidebar';
import Canvas from '../../components/Editor/Canvas';
import { PropertyPanel } from '../../components/Editor/PropertyPanel';

const EditorPage = () => {
  const { mode, templateId } = useParams<{ mode?: string; templateId?: string }>();
  const { setCanvasSettings } = useBuilderStore();
  
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
  
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Sidebar - Blocks */}
      <Sidebar />
      
      {/* Center - Canvas */}
      <div className="flex-grow flex flex-col overflow-hidden bg-gray-100">
        <div className="p-4 border-b bg-white flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            {mode === 'popup' ? 'Popup' : 'Banner'} Editor
          </h1>
          
          <div className="flex gap-2">
            <button className="btn btn-outline">
              Undo
            </button>
            <button className="btn btn-outline">
              Redo
            </button>
            <button className="btn btn-primary">
              Export
            </button>
          </div>
        </div>
        
        <div className="flex-grow overflow-auto">
          <Canvas />
        </div>
      </div>
      
      {/* Right Sidebar - Properties */}
      <PropertyPanel />
    </div>
  );
};

export default EditorPage; 