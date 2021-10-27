'use strict'

// EVENT HUB 

const events = require('./utils/event-pool.js')

require('./modules/vendor.js')
require('./modules/driver.js')
console.log(events)

events.emit('pickup-start')
