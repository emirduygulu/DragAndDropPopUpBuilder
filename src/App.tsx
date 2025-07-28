import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import HomePage from './pages/Home';
import TemplateGalleryPage from './pages/TemplateGallery';
import EditorPage from './pages/Editor';

function App() {
  return (
    <Router>
      <DndProvider backend={HTML5Backend}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/templates/:mode" element={<TemplateGalleryPage />} />
          <Route path="/editor/:mode" element={<EditorPage />} />
          <Route path="/editor/:mode/:templateId" element={<EditorPage />} />
        </Routes>
      </DndProvider>
    </Router>
  );
}

export default App; 