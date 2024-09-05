import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import InternPage from './pages/InternPage';
import FeedbackPage from './pages/FeedbackPage';
import PerformancePage from './pages/PerformancePage';
import TaskPage from './pages/TaskPage';
import Navbar from './components/Navbar'; 

const App = () => {
  return (
    <Router>
        <Navbar /> {/* Include Navbar here */}
        <Routes>
          <Route path="/intern" element={<InternPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/performance" element={<PerformancePage />} />
          <Route path="/task" element={<TaskPage />} />
        </Routes>
    </Router>
  );
};

export default App;
