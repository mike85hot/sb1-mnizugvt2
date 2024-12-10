import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { AuthProvider } from './contexts/AuthContext';
import { initSecurity } from './utils/security';
import { initErrorTracking } from './utils/errorHandling';
import { reportWebVitals } from './utils/performance';
import './index.css';

// Initialize security and monitoring
initSecurity();
initErrorTracking();
reportWebVitals();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
