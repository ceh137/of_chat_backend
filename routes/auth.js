const express = require('express');
const router = express.Router();
const { body } = require('express-validator')
const User = require('../models/user_model')
const authController = require('../controllers/auth')
const isAuth = require('../middleware/is_auth')


router.post('/signup', [
    body('email')
        .trim()
        .isEmail()
        .custom( async (value) => {
            const user = await User.findOne({
                where: {
                    email: value
                }
            })
            if (user) {
                throw new Error("User with such email is already registered")
            }

        }),

    body('password')
        .trim()
        .isLength({min: 8}),

], authController.signup);

router.post('/login', authController.login)

router.get('/verify', isAuth, authController.sendVerificationMessage)

router.get('/check_verification', isAuth, authController.checkVerification)

router.get('/verify/:token', authController.verifyUser)


module.exports  = router