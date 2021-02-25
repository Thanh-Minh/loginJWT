import {check, validationResult} from 'express-validator';


exports.loginValidation = [
    check('email')
        .trim()
        .normalizeEmail()
        .not()
        .isEmpty()
        .withMessage('')
        .bail(),
    check('password')
        .not()
        .isEmpty()
        .withMessage('password cannot be empty')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters long'),
    (req:any, res:any, next:any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});
    next()
    }
]

