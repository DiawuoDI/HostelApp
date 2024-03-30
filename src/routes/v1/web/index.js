const { Router } = require('express');
const route = Router();

const adminRoute = require('./admin')
const student = require('./student')
const hostel = require('./hostel')
const allocation = require('./allocation')
const department = require('./department')
const room = require('./rooms')
const requests = require('./requests')

route.use('/admin', adminRoute)
route.use('/hostel', hostel)
route.use('/student', student)
route.use('/allocation', allocation)
route.use('/department', department)
route.use('/room', room)
route.use('/request', requests)

module.exports = route