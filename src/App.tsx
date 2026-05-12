import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './theme/ThemeContext';
import { Presentation } from './components/Presentation';
import { MindmapPage } from './components/mindmap/MindmapPage';
import { InitialStepsPage } from './components/InitialStepsPage';
import { ScaleupAiPage } from './components/ScaleupAiPage';
import { NonTechiesPage } from './components/NonTechiesPage';
import { AdminPage } from './components/AdminPage';
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
          <Route path="/contributing-to-production">
            <Route index element={<Navigate to="0" replace />} />
            <Route path=":slideIndex" element={<NonTechiesPage sessionIndex={0} />} />
          </Route>
          <Route path="/analytics-and-tracking">
            <Route index element={<Navigate to="0" replace />} />
            <Route path=":slideIndex" element={<NonTechiesPage sessionIndex={1} />} />
          </Route>
          <Route path="/agentic-business">
            <Route index element={<Navigate to="0" replace />} />
            <Route path=":slideIndex" element={<NonTechiesPage sessionIndex={2} />} />
          </Route>
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
