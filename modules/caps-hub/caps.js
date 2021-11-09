'use strict'

// Caps Hub and Queue Server

const logEvents = require('./logger')
let uuid = require('uuid').v4
const io = require('socket.io')(8000)

io.on('connection', socket => console.log('base connected with socket id: ',socket.id))
const caps = io.of('/caps')

let queue = {
  // 'acme-widgets': {},
  // '1-206-flowers': {}
}

caps.on('connection', (socket) => {
  console.log(`Client Connected: ${socket.id}`)
  socket.on('join-room', (room)=>{
    console.log(`client ${socket.id} joined room:${room} `)
    socket.join(room)
  })
  
  socket.on('getall', ()=>{
    console.log('***',queue)
    Object.keys(queue).forEach( id => {
      console.log('indvidual pkg',{id, payload: queue[id].pkg})
      socket.emit('driver-task', {id, payload: queue[id].pkg})
    })
  })

  socket.on('recieved', task => {
    console.log(`driver acknowledged task ${task} with task id: ${task.id}`)

    delete queue[task.id]
    console.log('queue isEmpty?',queue)
  })

  socket.on('pickup',(eventObj) => {
    logEvents(eventObj)
    let store = eventObj.payload.store
    let id = uuid();
    queue[id] = { store, pkg:eventObj }
    caps.emit('added')
    caps.emit('pickup', { id, eventObj }) 
  })
   
  socket.on('in-transit',(eventObj) => {
    logEvents(eventObj)
    caps.emit('in-transit', eventObj)
  }) 
  socket.on('delivered',(eventObj) => {
    logEvents(eventObj)
    caps.emit('delivered', eventObj)
  })
})
