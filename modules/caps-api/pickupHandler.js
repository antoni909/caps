'use strict'

const eventObj = require("./create-order")
const io = require('socket.io-client')
const socket = io.connect('http://localhost:8000/caps')

socket.on('connect_new_user', (payload) => console.log(payload))

const pickupHandler = (req,res) => {
  socket.emit('pickup', req.body)
  res.status(200).send(req.body)
}

module.exports = pickupHandler;
