const express = require('express');
const Router = express.Router();
const multer = require('multer')

const student = require('../../../controllers/student');
const validation = require('../../../validations/schemas/student')

const {
    validationError,
} = require('../../../validations/schemas/validationError')
const validate = [...validation, validationError];
const upload = multer({ dest: 'uploads/'});

Router.post('/',upload.single('profile'), validate, student.registerStudent)
Router.get('/', student.getAllStudents)
Router.get('/:id', student.findStudentsAllocation)
Router.patch('/:id', student.edithStudent)
Router.delete('/:id', student.deleteStudent)

module.exports = Router;