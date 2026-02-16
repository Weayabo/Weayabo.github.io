import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';  // import your App component
import './styles/index.css';

// Mount the App into the #root div in index.html
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
