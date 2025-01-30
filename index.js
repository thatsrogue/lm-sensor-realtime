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

// So lots of things will now happen.... I'll firstly need to run this on a loop and store the results somehow.
// The way to go might be to have that dict of timestamps and readings under each.

// Device: { Adapter: Adapter type, sensor: { sensor: reading } }



function getSensorData(queryFor) {
    let reading = JSON.parse(execSync('sensors -j', options))
    let adapter = ''
    let sensorMeta = []
    let readings = []
    for (const [device, lowerObj] of Object.entries(reading)) {
        for (const [adaptersensor, adaptypeOrSensor] of Object.entries(lowerObj)) {
            if (adaptersensor === 'Adapter') {
                adapter = adaptypeOrSensor
            } else {
                for (const [sensorNum, value] of Object.entries(adaptypeOrSensor)) {
                    if (queryFor === 'meta') {
                        sensorMeta.push([device, adapter, adaptersensor, sensorNum])
                    } else {
                        readings.push(value)
                    }
                }
            }
        }
    }
    console.log("Updating!")
    if (queryFor === 'meta') { return sensorMeta }
    else { return readings }
}

sensorMeta = getSensorData('meta')

let sensorValues = {}

// I could asynchronously update the data in the background..

function updateValues() {
    getSensorData('vals')
    setTimeout(() => {
        updateValues()
    })
}

setTimeout(() => {
    updateValues()
}, 0)

