import React, { useState, useEffect } from "react"
import { Line } from 'react-chartjs-2'
import axios from 'axios'
function LoggedIn(){
    const [prediction, setPrediction] = useState()
    const [price, setPrice] = useState()
    useEffect(() => {
        fetch('https://bamsangbackend.herokuapp.com/port')
        .then(res => res.json())
        .then(res => {
            let data = []
            data.push(parseFloat(res.openPrice), parseFloat(res.highPrice), parseFloat(res.lowPrice))
            setPrice(data)
        })
    })
    const data = {
        labels: ['openPrice', 'highPrice', 'lowPrice'],
            datasets: [{
                label: '# of Votes',
                data: price,
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
      const predictprices = () => {
        axios.get('https://bamsangai.herokuapp.com/priceprediction')
        .then(response => setPrediction(response.data))
      }
    return(
        <div>
        <Line
              data = {data}
              width = {100}
              height = {200}
              options = {{
                maintainAspectRatio: false
              }} 
            />
            {predictprices()}
            prediction is {prediction}
            </div>
    )
}

export default LoggedIn;