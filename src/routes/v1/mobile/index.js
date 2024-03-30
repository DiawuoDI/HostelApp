const { Router} = require('express');
const route = Router()

//IMPORTING MY ROUTES 
const student = require('./student');
const room = require('./rooms')

route.use('/student', student);
route.use('./room', room );

module.exports = route