'use strict'
const io = require('socket.io-client')
const gameSocket = io.connect('http://localhost:3000/games')

gameSocket.on('welcome', (msg) => {
  console.log(`recieved: ${msg}`)
})

gameSocket.emit('join_room', 'csgo')

gameSocket.on('newUser', (res)=>{
  console.log(res)
})

gameSocket.on('success', (res)=>{
  console.log(res)
})
gameSocket.on('err', (err)=>{
  console.log(err)
})


// server side
const gameRooms = ['rocket leage', 'csgo', 'bt1']

io
  .of('/games')
  .on('connection', (socket)=>{
    console.log(socket.id)
  // clients need to connect to /games namespace
  socket.emit('welcome', 'welcome to /games namespace, game client')
    socket.on('join_room',(room) => {
      if(gameRooms.includes(room)){
        socket.join(room) 
        io
          .of('/games')
          .in(room)
          .emit('newUser', 'new player joined',room)
        return socket.emit('success', 'good job, you joined the room') 
      } else {
        return socket.emit('err', 'room does not exist')
      }
    })
})
