'use strict'

const eventObj = require("./create-order")
const io = require('socket.io-client')
const socket = io.connect('http://localhost:3000/caps')

socket.on('connect_new_user', (payload) => console.log(payload))

const pickupHandler = (req,res) => {
  console.log(req.body)
  let obj
  if(!req.body){
    obj = eventObj
  } 
  socket.emit('ready', obj)
  res.status(200).send(obj)
}

module.exports = pickupHandler;
