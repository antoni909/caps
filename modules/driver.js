'use strict'

const events = require("../utils/event-pool");

const handlePickupNow = (eventObj) => {
  setTimeout( () => {   
    eventObj.event = 'pickup'
    eventObj.time = new Date()
    
    console.log('EVENT ', eventObj)
    console.log(`DRIVER: picked up ${eventObj.payload.orderId}`)
    events.emit('in-transit', eventObj)
  },4000)
}

const handleInTransit = (eventObj) => {
  setTimeout( () => {
    eventObj.event = 'in-transit'
    eventObj.time = new Date()
    
    console.log('EVENT ', eventObj)
    console.log(`DRIVER: delivered up ${eventObj.payload.orderId}`)
    events.emit('delivered', eventObj)
  },8000)
}

events.on('pickup-now', handlePickupNow)
events.on('in-transit', handleInTransit)

module.exports = { handlePickupNow }
