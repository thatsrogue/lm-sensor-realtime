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

// So lots of things will now happen.... I'll firstly need to run this on a loop and store the results somehow.
// The way to go might be to have that dict of timestamps and readings under each.

// Device: { Adapter: Adapter type, sensor: { sensor: reading } }




let adapter = ''
let recAtThisTime = []
for (const [device, lowerObj] of Object.entries(reading)) {
    for (const [adaptersensor, adaptypeOrSensor] of Object.entries(lowerObj)) {
        if (adaptersensor === 'Adapter') {

        } else {
            for (const [sensorNum, value] of Object.entries(adaptypeOrSensor)) {
                console.log(value)
            }
        }
    }
}