
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * Initializes the environment for Vercel or local preview.
 * Fetches the API key from the Vercel serverless endpoint if available.
 */
async function initEnvironment() {
  // Polyfill process if it doesn't exist
  if (!(window as any).process) {
    (window as any).process = { env: {} };
  }

  // If we're already initialized (e.g. by AI Studio platform), skip
  if ((window as any).process.env.API_KEY) return;

  try {
    const response = await fetch('/api/config');
    if (response.ok) {
      const data = await response.json();
      if (data.apiKey) {
        (window as any).process.env.API_KEY = data.apiKey;
        console.log("Vercel Environment initialized.");
      }
    }
  } catch (err) {
    console.debug("Serverless config fetch skipped or failed.");
  }
}

async function bootstrap() {
  await initEnvironment();

  const rootElement = document.getElementById('root');
  if (!rootElement) return;

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

bootstrap();
