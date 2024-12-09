// index.jsx or main.jsx (entry file)

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import global styles here
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router
import App from './App'; // Import App component

// Wrapping the App in the Router
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App />
  </Router>
);
