'use strict'

const io = require('socket.io-client')
const vendor = io.connect('http://localhost:8000/caps')

//enter orders via caps-api
const company = '1-800-flowers'

vendor.on('connect', () =>{
    vendor.emit('join-room',company)
})

vendor.on('added', ()=>{
    console.log('disconnected',vendor.id)
    vendor.disconnect()
})

vendor.on( 'delivered', handleDelivered  )
 
function handleDelivered(eventObj){
    console.log('vendor: ',eventObj)
    console.log(`VENDOR: Thank you for delivering '${eventObj.payload.orderId}'`)
}
