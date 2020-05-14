import React from 'react';

function App() {
   function logIn(){
    fetch('https://bamsangbackend.herokuapp.com/login', 
    // {
    //   mode: 'no-cors'
    // }
    )
    .then(data => console.log(data))
    .catch(error => console.log("Could not connect to server"))

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