'use strict'

const io = require('socket.io-client')
const driver = io.connect('http://localhost:8000/caps')

driver.emit('getall')

driver.on('driver-task', (task) => {
    console.log('driver task: ',task)
    driver.emit('recieved',task)
})
driver.on('pickup', handlePickup)
driver.on('in-transit', handleInTransit)

function handlePickup(obj){
    console.log('obj',obj)
    obj.eventObj.time = new Date()
    obj.eventObj.event = 'in-transit'
    console.log(`DRIVER: picked up ${obj.eventObj.payload.orderId}`)
    driver.emit('in-transit', obj)
}
function handleInTransit(obj){
    obj.eventObj.event = 'delivered'
    obj.eventObj.time = new Date()
    console.log(`DRIVER: delivered up ${obj.eventObj.payload.orderId}`)
    driver.emit('delivered', obj.eventObj)
}
