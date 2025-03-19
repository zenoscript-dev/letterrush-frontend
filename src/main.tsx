import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <BrowserRouter>
    <App />
    <Toaster
      position='top-right'
      toastOptions={{
        style: {
          fontSize: '14px',
          padding: '8px',
          minWidth: '200px',
          fontFamily: 'sans-serif',
          backgroundColor: '#0F0F1D',
          border: '1px solid #8D00FF',
          color: '#fff',
        },
      }}
    />
  </BrowserRouter>,
  // </StrictMode>,
);
