'use strict'

const events = require('../utils/event-pool.js')
const faker = require('faker')


const handlePickup = () => {
  setTimeout(() => {
    let eventObj = {
      event: 'pickup-start',
      time: new Date(),
      payload: {
        store: faker.company.companyName(), 
        orderId: faker.datatype.uuid(),
        customer: `${faker.name.firstName()}, ${faker.name.lastName()}`,
        address: `${faker.address.city()}, ${faker.address.state(true)}`
      }
    }
    console.log('EVENT ',eventObj)
    events.emit('pickup-now', eventObj)
  },3000)
}

const handleDelivered = (eventObj) => {
  setTimeout( () => {
    console.log(`VENDOR: Thank you for delivering '${eventObj.payload.orderId}'`)
    eventObj.event = 'delivered'
    eventObj.time = new Date()
    console.log('EVENT',eventObj)
  }, 2000)
}

events.on( 'pickup-start', handlePickup  )
events.on( 'delivered', handleDelivered  )

module.exports = { handlePickup, handleDelivered }
