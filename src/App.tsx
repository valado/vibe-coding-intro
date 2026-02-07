import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './theme/ThemeContext';
import { Presentation } from './components/Presentation';
import './styles/fonts.css';
import './styles/global.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Presentation />} />
          <Route path="/slide/:slideId" element={<Presentation />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
