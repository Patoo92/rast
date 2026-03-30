import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import * as serviceWorker from './serviceWorker';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// Registrar el Service Worker
serviceWorker.register({
  onSuccess: () => {
    console.log('Service Worker registrado correctamente');
  },
  onUpdate: () => {
    console.log('Service Worker actualizado');
  }
});
