const express = require('express');
const router = express.Router();

const admin = require('../../../controllers/admin');
const {
    signup,
    validateEmail
} = require('../../../validations/middlewares/signup');

const validation = require('../../../validations/schemas/admin');
const {
    validateError
}= require('../../../validations/schemas/validationError');
const validate = [...validation, validateError];

router.post('/signUp' , validate, signup, admin.signUp);
router.post('/login', validateEmail,admin.login);
router.get('/', admin.loadAdmin)
router.get('/loggout', admin.logout);

router.get('/:id', admin.loadSingleAdmin);
router.get('/:id', admin.updateAdmin);
router.get('/:id', admin.deletAdmin);

module.exports = router;

