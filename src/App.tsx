import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './theme/ThemeContext';
import { Presentation } from './components/Presentation';
import { MindmapPage } from './components/mindmap/MindmapPage';
import { InitialStepsPage } from './components/InitialStepsPage';
import { ScaleupAiPage } from './components/ScaleupAiPage';
import './styles/fonts.css';
import './styles/global.css';
import './styles/glossary.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Presentation />} />
          <Route path="/slide/:slideId" element={<Presentation />} />
          <Route path="/mindmap" element={<MindmapPage />} />
          <Route path="/initial-steps" element={<InitialStepsPage />} />
          <Route path="/scaleup-ai" element={<ScaleupAiPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
