import React from 'react';

function App() {
  const logIn = () => {
    fetch('https://bamsangfrontend.herokuapp.com/login')
  }
  return (
    <div>
        <button style={{
          position: 'relative',
          left: '500px',
          top: '300px'}}
          onClick={logIn}>Log in</button>
    </div>
  );
}

export default App;