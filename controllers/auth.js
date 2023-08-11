const User = require('../models/user_model');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require("email-validator");
const {sendVerificationEmail} = require("../services/sendgrid");
const sequelize = require("../utils/db");
const Wallet = require("../models/wallet");
const  dotenv = require('dotenv').config()


exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty() && !res.headersSent) {
        console.log(errors)
        return res.status(401).send({
            message: errors.array()[0].msg
        });

    }
    try {

        const email = req.body.email;
        const password = req.body.password;
        const username = req.body.email;

        const hashedPw = bcrypt.hash(password, 10)
        let user ;
        let wallet;
        const t = await sequelize.transaction()
        try {
            user = await User.create({
                email: email,
                username: username,
                verified: false,
                password: await hashedPw,
            }, {transaction: t})
            wallet = await Wallet.create({
                balance:0,
                UserId: user.id,
            }, {transaction: t})
            t.commit()
        } catch (e) {
            t.rollback()
            console.log(e)
            if (!res.headersSent) {
                return res.status(401).json({
                    message: 'Error creating your account'
                });
            }
        }

        const token = jwt.sign({
            userId: user.id,
            email: user.email.trim()
        }, 'somehypersecretthing', {expiresIn: '24h'})
        if (!res.headersSent) {
            res.status(201).json({
                token: token,
                userId: user.id,
                verified: user.verified,
                expiresIn: 24 * 60 * 60 * 1000,
                email: user.email
            })
        }

    } catch (e) {
            console.log(e)
            res.status(500).send({
                message: 'Error has occured'
            });
    }

}

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try {

        if (!validator.validate(email)) {
            res.status(400).send({
                message: 'Not a valid Email'
            });
        }

        const user = await User.findOne({
            where: {
                email: email
            }
        });
        if (!user) {
             res.status(401).send({
                message: 'No user with such email was found'
            });
        }
        let isValid = await bcrypt.compare(password, user.password.trim());
        if (!isValid && !res.headersSent) {
            res.status(401).send({
                message: 'Password is not correct'
            });

        }
        const token = jwt.sign({
            userId: user.id,
            email: user.email.trim()
        }, 'somehypersecretthing', {expiresIn: '24h'})
        if (!res.headersSent) {
            res.status(200).json({
                token: token,
                userId: user.id,
                verified: user.verified,
                expiresIn: 24 * 60 * 60 * 1000,
                email: user.email
            })
        }
    } catch (e) {
        if (!res.headersSent) {
            res.status(500).send({
                message: 'Error has occured'
            });
        }
    }
}

exports.sendVerificationMessage = async (req, res, next) => {
    if (req.body.userId) {
        const user = await User.findByPk(req.body.userId);
        if (user) {
            const token = jwt.sign({
                    data: {
                        id: user.id,
                        email: user.email
                    }
                }, 'verification_key', { expiresIn: '10m' }
            );

            const link = process.env.BASE_URL+'auth/verify/'+encodeURIComponent(token);
            if (await sendVerificationEmail(user, link)) {
                return res.status(200).json({
                    message: "We sent an email to "+user.email
                })
            }

            return res.status(500).json({
                message: "Error sending an email"
            })
        }

    }
}

exports.verifyUser = async (req, res, next) => {
    try {

        const token = req.params.token
        console.log(token)
        const decodedToken = jwt.verify(decodeURIComponent(token), 'verification_key');
        console.log(decodedToken)
        if (decodedToken && decodedToken.data.id) {
            const user = await User.findByPk(decodedToken.data.id);
            user.verified = true;
            if (await user.save()) {
                return res.status(200).json({
                    message: "Your email has been verified"
                })
            }
        }
        return res.status(500).json({
            message: "Verification failed"
        })

    } catch (e) {
        res.status(403).json({
            message: "Verification failed"
        })
    }


}

exports.checkVerification = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.body.userId);
        return res.status(200).json({
            verified: user.verified
        })
    } catch (e) {
        return res.status(500).json({
            message: "something went wrong"
        })
    }



}
