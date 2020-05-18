import React, { useRef, useCallback, useState } from 'react'
import Webcam from "react-webcam"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'


function App() {
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
    async () => {
      const imageSrc = webcamRef.current.getScreenshot()
      const blob = await fetch(imageSrc).then((res) => res.blob())
      const formData = new FormData();

      formData.append('images', blob)

      fetch('https://bamsangbackend.herokuapp.com/login', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
              'Access-Control-Allow-Origin': '*',
              'content-type': 'multipart/form-data'
        },
        body: JSON.stringify(formData)
      })
      // axios.post('https://bamsangbackend.herokuapp.com/login', formData,{
      //     headers: {
      //         "Access-Control-Allow-Origin": "*",
      //         'content-type': 'multipart/form-data'
      //     }
      //   })
    },
    [webcamRef]
  )
   const logIn = () => {
    setShow(true)
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
    </div>
  );
}

export default App;