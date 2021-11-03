'use strict'

const events = require('../utils/event-pool.js')
const faker = require('faker')

events.on( 'in-transit', handleDelivered  )

setTimeout(() => {
      let eventObj = {
        event: 'order-ready',
        time: new Date(),
        payload: {
          store: faker.company.companyName(), 
          orderId: faker.datatype.uuid(),
          customer: `${faker.name.firstName()}, ${faker.name.lastName()}`,
          address: `${faker.address.city()}, ${faker.address.state(true)}`
        }
      }
      events.emit('ready', eventObj)
},0);
  
function handleDelivered(eventObj){
  setTimeout(()=>{
    console.log(`VENDOR: Thank you for delivering '${eventObj.payload.orderId}'`)
    eventObj.event = 'delivered'
    eventObj.time = new Date()
    events.emit('delivered', eventObj)
  },0)
}
