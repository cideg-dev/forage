
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  const errorMsg = "Critical Error: Root element with id 'root' was not found in the document. Ensure your index.html contains <div id=\"root\"></div>.";
  console.error(errorMsg);
  
  // Basic fallback UI in case of failure
  const fallback = document.createElement('div');
  fallback.style.cssText = "display: flex; height: 100vh; align-items: center; justify-content: center; font-family: sans-serif; text-align: center; padding: 20px;";
  fallback.innerHTML = `<div><h1 style="color: #ef4444;">Une erreur est survenue</h1><p>${errorMsg}</p></div>`;
  document.body.appendChild(fallback);
  
  throw new Error(errorMsg);
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error("Failed to render the application:", error);
}
