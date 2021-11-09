'use strict'

const faker = require('faker') 

let eventObj = {
  event: 'pickup',
  time: new Date(),
  payload: {
    store: faker.company.companyName(), 
    orderId: faker.datatype.uuid(),
    customer: `${faker.name.firstName()}, ${faker.name.lastName()}`,
    address: `${faker.address.city()}, ${faker.address.state(true)}`
  }
}   

module.exports = eventObj;
