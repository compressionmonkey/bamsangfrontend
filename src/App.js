import React, { useRef, useCallback, useState } from 'react'
import Webcam from "react-webcam"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { Line } from 'react-chartjs-2'
// import imagepath from 'https://unsplash.com/photos/8n9E1ZO7F80'
function App() {
  const [show, setShow] = useState(false)
  const [graph, setGraph] = useState(false)

  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }, {
            label: '# of Names',
            data: [7, 10, 5, 3, 8, 4],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
  }

  const handleClose = () => {
    setShow(false)
  }

  const predictprices = () => {
    axios.get('https://bamsangai.herokuapp.com/priceprediction')
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
    <div style={{background:"black"}}>
        <section class="animated-grid">
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
          <div class="card" style={{background:"rgb(36,243, 147)"}}>13</div>

        </section>
        {!graph && <button style={{
          position: 'relative',
          left: '500px',
          top: '300px'}}
          onClick={logIn}>Log in</button>}

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
          {
            graph && <Line
              data = {data}
              width = {100}
              height = {200}
              options = {{
                maintainAspectRatio: false
              }} 
            />
          }
          {
            graph && predictprices()
          }
    </div>
  );
}

export default App;