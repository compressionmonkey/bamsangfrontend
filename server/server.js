const express = require('express')
const app = express()
const path = require('path')
const spawn = require('child_process').spawn

const runPython = spawn('heroku run python', ['server/cv.py'])

const port = process.env.PORT || 5000
const publicPath = path.join(__dirname, '..', 'build')

app.use(express.static(publicPath))

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
 });

app.get('/login', (req, res) => {
    runPython.stdout.on('data', (data) => {
        console.log('Started webcam')
        console.log(data.toString())
    })

    runPython.on('close', code => {
        console.log("closing webcam ",code)
    })

    res.send('success')
}) 

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})