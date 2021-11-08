'use strict'

const io = require('socket.io-client')
const driver = io.connect('http://localhost:3000/caps')
const room = '1-800-flowers'

driver.on('connect', () =>{
    driver.emit('room',room)
})
  
driver.on('ready', handlePickup)
driver.on('pickup', handleInTransit)

function handlePickup(eventObj){
    console.log('client id',driver.id)
    eventObj.time = new Date()
    eventObj.event = 'pickup'
    console.log(`DRIVER: picked up ${eventObj.payload.orderId}`)
    driver.emit('pickup', eventObj)
}
function handleInTransit(eventObj){
    console.log('client id',driver.id)
    eventObj.event = 'in-transit'
    eventObj.time = new Date()
    console.log(`DRIVER: delivered up ${eventObj.payload.orderId}`)
    driver.emit('in-transit', eventObj)
}
