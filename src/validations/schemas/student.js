const { body } = require('express-validator');

const validate = [
    body('fullName')
     .trim()
     .notEmpty()
     .withMessage('Please provide your fullname'),
    body('email')
     .trim()
     .isEmail()
     .withMessage('Please make sure you provide an email'),
    body('password')
     .trim()
     .isLength({ min: 8})
     .withMessage('Please your password must be at least 8 characters')
     .isStrongPassword()
     .withMessage(
        'Please your password be strong: must contain an uppercase, lowercase letter, a symbol and numbers'),
    body('telephone')
     .optional()
     .trim()
     .isLength({mix: 14, min: 10})
     .withMessage('The maximum should be 14 and minimum should be 10 digits')
     .isMobilePhone('en-GH', {strictMode: true})
     .withMessage('make sure you enter your phone number'),
    body('level')
     .trim()
     .toInt()     
];

module.exports = validate;