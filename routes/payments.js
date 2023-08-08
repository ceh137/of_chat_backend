const express = require('express')

const aiChatController = require('../controllers/ai_chat_controller')
const isAuth = require('../middleware/is_auth')
const {createCheckout, coinbaseWebhook, getBalance} = require("../controllers/payment");

const router = express.Router()

router.post('/create-checkout', isAuth, createCheckout)
router.post('/webhook', coinbaseWebhook)
router.get('/balance', isAuth, getBalance)

module.exports = router