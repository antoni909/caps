'use strict'

let logEvents = require('./logger')
const io = require('socket.io')(3000)

io.on('connection', socket => console.log('base connected with socket id: ',socket.id))

const caps = io.of('/caps')

caps.on('connection', (socket) => {
  
  console.log(`Client Connected: ${socket.id}`)
  let connect = {
    message: 'welcome to caps hub',
    clientId: socket.id
  }
  socket.emit('connect-vendor', connect)
  socket.emit('connect-driver', connect)
  socket.on('room', (room)=>{
    console.log(`client ${socket.id} joined room:${room} `)
    socket.join(room)
  })
  // listen for server to deliver payload
  socket.on('ready', (eventObj) => {
    caps.emit('ready', eventObj)
  })
  socket.on('pickup',(eventObj) => {
    logEvents(eventObj)
    caps.emit('pickup', eventObj)
  }) 
  socket.on('in-transit',(eventObj) => {
    logEvents(eventObj)
    socket.broadcast.emit('in-transit', eventObj)
  }) 
  socket.on('delivered',(eventObj) => {
    logEvents(eventObj)
    socket.broadcast.emit('delivered', eventObj)
  })
})
