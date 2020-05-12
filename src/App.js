import React from 'react';

function App() {
  const hello = () => {
    fetch('http://localhost:5000/')
  }
  return (
    <div>
        <button style={{
          position: 'relative',
          left: '500px',
          top: '300px'}}
          onClick={hello}>Log in</button>
    </div>
  );
}

export default App;