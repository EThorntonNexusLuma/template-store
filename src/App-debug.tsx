import React from 'react';

function App() {
  console.log('App component is rendering');
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f0f0f0', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#333', fontSize: '2rem', marginBottom: '20px' }}>
        Debug: Nexus Luma Template Store
      </h1>
      <p style={{ color: '#666', fontSize: '1rem' }}>
        If you can see this, the React app is working!
      </p>
      <p style={{ color: '#666', fontSize: '1rem' }}>
        Build time: {new Date().toISOString()}
      </p>
    </div>
  );
}

export default App;