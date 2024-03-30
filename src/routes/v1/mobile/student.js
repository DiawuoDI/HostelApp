const express = require('express');
const Router = express.Router();

const student = require('../../../controllers/student');

Router.post('/', student.registerStudent);
Router.post('/login', student.login);
Router.get('/:id', student.findStudentsAllocation);
Router.patch('/:id', student.edithStudent);
Router.delete('/:id', student.deleteStudent);

module.exports = Router;