'use strict'
require('dotenv').config()
const pickupHandler = require('./pickupHandler')
const express = require('express')
const cors = require('cors')

const PORT = process.env.PORT || 3002
const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req,res) => res.send('hello, make a request to /pickup please'))

app.post('/pickup', pickupHandler)

app.listen(PORT, () => console.log(`server up PORT: ${PORT}`) )
