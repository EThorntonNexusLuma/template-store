import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Create a diagnostic app to test React loading
function DiagnosticApp() {
  console.log('DiagnosticApp component rendering...');
  
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 50%, #000000 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
      <h1>🔬 React Diagnostic Test</h1>
      <div style={{ marginBottom: '20px' }}>
        <h2>✅ React is working!</h2>
        <p>If you can see this, React 18 and the build pipeline are working correctly.</p>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Environment Information:</h3>
        <ul style={{ textAlign: 'left' }}>
          <li>NODE_ENV: {process.env.NODE_ENV || 'undefined'}</li>
          <li>BASE_URL: {import.meta.env.BASE_URL || 'undefined'}</li>
          <li>Mode: {import.meta.env.MODE || 'undefined'}</li>
          <li>Prod: {import.meta.env.PROD ? 'true' : 'false'}</li>
          <li>Dev: {import.meta.env.DEV ? 'true' : 'false'}</li>
        </ul>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Browser Information:</h3>
        <ul style={{ textAlign: 'left' }}>
          <li>User Agent: {navigator.userAgent}</li>
          <li>URL: {window.location.href}</li>
          <li>Pathname: {window.location.pathname}</li>
          <li>Origin: {window.location.origin}</li>
        </ul>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Build Timestamp:</h3>
        <p>{new Date().toISOString()}</p>
      </div>
    </div>
  );
}

// Add comprehensive error handling
console.log('Starting React diagnostic app...');

try {
  const rootElement = document.getElementById('root');
  console.log('Root element found:', rootElement);
  
  if (!rootElement) {
    throw new Error('Root element not found');
  }
  
  const root = createRoot(rootElement);
  console.log('React root created successfully');
  
  root.render(
    <StrictMode>
      <DiagnosticApp />
    </StrictMode>
  );
  
  console.log('React app rendered successfully');
  
} catch (error) {
  console.error('Failed to start React app:', error);
  
  // Fallback: inject error message directly into DOM
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; color: red; font-family: Arial, sans-serif;">
        <h1>❌ React Startup Error</h1>
        <p><strong>Error:</strong> ${error.message}</p>
        <p><strong>Stack:</strong> ${error.stack}</p>
        <p><strong>Time:</strong> ${new Date().toISOString()}</p>
      </div>
    `;
  }
}

// Global error handlers
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});