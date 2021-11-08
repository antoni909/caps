'use strict'

const io = require('socket.io-client')
const socket = io.connect('http://localhost:3000/caps')

const room = '1-800-flowers'

socket.on('connect', () =>{
    socket.emit('room',room)
})
socket.on('message', (data) =>{
    console.log('new message:',data)
})

socket.on( 'in-transit', handleDelivered  )
 
function handleDelivered(eventObj){
    console.log('client id',socket.id)
    console.log(`VENDOR: Thank you for delivering '${eventObj.payload.orderId}'`)
    eventObj.event = 'delivered'
    eventObj.time = new Date()
    socket.emit('delivered', eventObj)
}
