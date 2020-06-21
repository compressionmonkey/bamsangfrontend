import React, { useState, useEffect } from "react"
import { Line } from 'react-chartjs-2'
import axios from 'axios'
function LoggedIn(){
    const [prediction, setPrediction] = useState()
    const [btcprice, setbtcPrice] = useState()
    const [bnbprice, setbnbPrice] = useState()
    const [ethprice, setethPrice] = useState()
    const [xrpprice, setxrpPrice] = useState()
    const [bchprice, setbchPrice] = useState()
    const [ltcprice, setltcPrice] = useState()
    useEffect(() => {
        fetch('https://bamsangbackend.herokuapp.com/getbtc')
        .then(res => res.json())
        .then(res => {
            let data = []
            data.push(parseFloat(res.openPrice), parseFloat(res.highPrice), parseFloat(res.lowPrice))
            setbtcPrice(data)
        })
        fetch('https://bamsangbackend.herokuapp.com/getbnb')
        .then(res => res.json())
        .then(res => {
            let data = []
            data.push(parseFloat(res.openPrice), parseFloat(res.highPrice), parseFloat(res.lowPrice))
            setbnbPrice(data)
        })
        fetch('https://bamsangbackend.herokuapp.com/geteth')
        .then(res => res.json())
        .then(res => {
            let data = []
            data.push(parseFloat(res.openPrice), parseFloat(res.highPrice), parseFloat(res.lowPrice))
            setethPrice(data)
        })
        fetch('https://bamsangbackend.herokuapp.com/getxrp')
        .then(res => res.json())
        .then(res => {
            let data = []
            data.push(parseFloat(res.openPrice), parseFloat(res.highPrice), parseFloat(res.lowPrice))
            setxrpPrice(data)
        })
        fetch('https://bamsangbackend.herokuapp.com/getbch')
        .then(res => res.json())
        .then(res => {
            let data = []
            data.push(parseFloat(res.openPrice), parseFloat(res.highPrice), parseFloat(res.lowPrice))
            setbchPrice(data)
        })
        fetch('https://bamsangbackend.herokuapp.com/getltc')
        .then(res => res.json())
        .then(res => {
            let data = []
            data.push(parseFloat(res.openPrice), parseFloat(res.highPrice), parseFloat(res.lowPrice))
            setltcPrice(data)
        })
    })
    const firstthreedata = {
        labels: ['openPrice', 'highPrice', 'lowPrice'],
            datasets: [{
                label: 'BTC to USD',
                data: btcprice,
                backgroundColor: [
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
                label: 'BNB to USD',
                data: bnbprice,
                backgroundColor: [
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }, {
                label: 'ETH to USD',
                data: ethprice,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
      }
    const lastthreedata = {
        labels: ['openPrice', 'highPrice', 'lowPrice'],
            datasets: [{
                label: 'XRP to USD',
                data: xrpprice,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }, {
                label: 'BCH to USD',
                data: bchprice,
                backgroundColor: [
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }, {
                label: 'LTC to USD',
                data: ltcprice,
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
              data = {firstthreedata}
              width = {50}
              height = {100}
              options = {{
                maintainAspectRatio: false
              }} 
            />
        <Line
              data = {lastthreedata}
              width = {50}
              height = {100}
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