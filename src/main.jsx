import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <ThemeProvider>
        <WishlistProvider>
          <AuthProvider>
            <MotionConfig reducedMotion="user">
              <App />
            </MotionConfig>
          </AuthProvider>
        </WishlistProvider>
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>
);