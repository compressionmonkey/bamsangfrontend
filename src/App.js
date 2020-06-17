import React, { useRef, useCallback, useState } from 'react'
import Webcam from "react-webcam"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import LoggedIn from './LoggedIn'

function App() {
  const [show, setShow] = useState(false)
  const [graph, setGraph] = useState(false)
 
  const handleClose = () => {
    setShow(false)
  }


  const videoConstraints = {
    width: 300,
    height: 300,
    facingMode: "user"
  }

  const webcamRef = useRef(null);
   
  const capture = useCallback(
    async () => {
      const imageSrc = webcamRef.current.getScreenshot()
      const blobImage = await fetch(imageSrc).then(res => res.blob());
      const formData = new FormData();

      formData.append('images', blobImage)

      axios.post('https://bamsangai.herokuapp.com/', formData,{
          headers: {
              "Access-Control-Allow-Origin": "*",
              'content-type': 'multipart/form-data'
          }
        }
        ).then(
          loggedIn => {
            console.log("test",loggedIn)
            setShow(false)
            setGraph(true)
          }
          )
    },
    [webcamRef]
  )
   const logIn = () => {
    setShow(true)
  }
  return (
    <div>
        {!graph ? <section class="animated-grid">
          <div class="card" style={{background:"rgb(36,243, 147)"}}>1</div>
          <div class="card" style={{background:"rgb(36,243, 147)"}}>2</div>
          <div class="card" style={{background:"rgb(36,243, 147)"}}>3</div>
          <div class="card" style={{background:"rgb(36,243, 147)"}}>4</div>
          <div class="card" style={{background:"rgb(36,243, 147)"}}>5</div>
          <div class="card" style={{background:"rgb(36,243, 147)"}}>6</div>
          <div class="card" style={{background:"rgb(36,243, 147)"}}>7</div>
          <div class="card" style={{background:"rgb(36,243, 147)"}}>8</div>
          <div class="card" style={{background:"rgb(36,243, 147)"}}>9</div>
          <div class="card" style={{background:"rgb(36,243, 147)"}}>10</div>
          <div class="card" style={{background:"rgb(36,243, 147)"}}>11</div>
          <div class="card" style={{background:"rgb(36,243, 147)"}}>12</div>
          <div class="card" style={{background:"rgb(36,243, 147)"}}
          onClick={logIn}>Log In!</div>

          <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Please take a photo</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <Webcam
        audio={false}
        // height={550}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        // width={750}
        videoConstraints={videoConstraints}
      />
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={ handleClose } variant="secondary">Close</Button>
              <Button onClick={capture} variant="primary">Take a snap</Button>
            </Modal.Footer>
          </Modal>
        </section>:<LoggedIn/>}
    </div>
  );
}

export default App;