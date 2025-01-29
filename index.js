const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const port = process.env.PORT || 20200
app.use(express.static('public'))
server.listen(port)
console.log('Server running on port: ', port)


const { execSync } = require('child_process');
let options = { encoding: 'utf8', stdio: ['stdout'] }
let reading = JSON.parse(execSync('sensors -j', options))
console.log(reading)