import React from 'react';

function App() {
  async function logIn(){
    await fetch('https://bamsangfrontend.herokuapp.com/login', {
      mode: 'no-cors'
    }).then(data => console.log("success"))
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