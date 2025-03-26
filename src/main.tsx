import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router';
import App from './App.tsx';
import './index.css';

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
