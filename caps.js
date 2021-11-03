'use strict'
const events = require('./utils/event-pool.js')
require('./modules/vendor.js')
require('./modules/driver.js')

//from Alex
events.on('pickup',(eventObj) => logEvents(eventObj))
events.on('in-transit',(eventObj) => logEvents(eventObj))
events.on('delivered',(eventObj) => logEvents(eventObj))

function logEvents(eventObj){
  console.log('EVENT', eventObj)
}
