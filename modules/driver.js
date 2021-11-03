'use strict'

const events = require("../utils/event-pool")

events.on('ready', handlePickup)
events.on('pickup', handleInTransit)

function handlePickup(eventObj){
  setTimeout(()=>{
    eventObj.time = new Date()
    eventObj.event = 'pickup'
    console.log(`DRIVER: picked up ${eventObj.payload.orderId}`)
    events.emit('pickup', eventObj)
  },0)
}

function handleInTransit(eventObj){
  setTimeout(()=>{
    eventObj.event = 'in-transit'
    eventObj.time = new Date()
    console.log(`DRIVER: delivered up ${eventObj.payload.orderId}`)
    events.emit('in-transit', eventObj)
  },0)
}
