const express = require('express')

const aiChatController = require('../controllers/ai_chat_controller')
const isAuth = require('../middleware/is_auth')

const router = express.Router()

router.post('/conversation' , isAuth, aiChatController.addConversation)

router.get('/conversation' , isAuth, aiChatController.getConversation)

router.put('/message', isAuth , aiChatController.addMessage)
router.put('/sl_message', isAuth , aiChatController.changeMessageSlightly)
router.put('/cmpl_message', isAuth , aiChatController.changeMessageCompletely)

router.post('/sub_message', isAuth , aiChatController.addSubscriberMessage)

router.post('/model_message', isAuth , aiChatController.addModelMessage)

module.exports = router