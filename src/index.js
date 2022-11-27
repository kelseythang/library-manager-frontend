import React, {StrictMode} from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/App';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);