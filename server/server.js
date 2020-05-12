const express = require('express')
const app = express()
const path = require('path')
const spawn = require('child_process').spawn

const process = spawn('python', ['./cv.py'])

const port = process.env.PORT || 5000
const publicPath = path.join(__dirname, '..', 'build')

app.use(express.static(publicPath))

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
 });

app.get('/login', (req, res) => {
    process.stdout.on('data', (data) => {
        console.log(data.toString())
    })
}) 

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})