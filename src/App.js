import React, { useRef, useCallback, useState } from 'react';
import Webcam from "react-webcam"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
function App() {
  const [clicked, setclicked] = useState(false)
  const [show, setShow] = useState(false)

  const handleClose = () => {
    setShow(false)
  }

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  }

  const webcamRef = useRef(null);
   
  const capture = useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      const capture = document.createElement('img')
      capture.src = imageSrc
      console.log(capture)

      fetch("https://bamsangbackend.herokuapp.com/login", {
        method: "post",
        body: capture
      }).catch(console.error)
    },
    [webcamRef]
  )
   const logIn = () => {
    setShow(true)
    fetch('https://bamsangbackend.herokuapp.com/login', 
    {
      mode: 'no-cors'
    }
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

          <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Please take a photo</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <Webcam
        audio={false}
        height={550}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={750}
        videoConstraints={videoConstraints}
      />
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={ handleClose } variant="secondary">Close</Button>
              <Button onClick={capture} variant="primary">Take a snap</Button>
            </Modal.Footer>
          </Modal>
      {/* <button onClick={capture}>Capture photo</button> */}
    </div>
  );
}

export default App;