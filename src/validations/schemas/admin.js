const { body } = require('express-validator');

const validate = [
    body('email')
     .trim()
     .isEmail()
     .withMessage('Please enter an email'),
    body('password')
     .trim()
     .isLength()
     .isStrongPassword()
     .withMessage('Please enter a strong password'),
    body('telephone')
     .optional()
     .trim()
     .isLength({min: 10})
     .withMessage('The minimum should be 10 digits')
     .isMobilePhone('en-GH', {strictMode: true})
     .withMessage('It not a phone number'),
    body('fullName')
     .trim()
     .isString()
     .withMessage('Your fullname must be a sting'),
];

module.exports = validate;