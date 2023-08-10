const AiMessage = require("../models/ai_message");
const AiConversation = require("../models/ai_conversation_model");
const Assistant = require('../services/chatbot/workki_assistant')
const {Op, where} = require("sequelize");
const User = require("../models/user_model");
const Wallet = require("../models/wallet");
const {toInt} = require("validator");
const sequelize = require("../utils/db");
const Transaction = require("../models/transaction");


exports.addMessage = async (req, res, next) => {

    try {
        const data = req.body;

        const wallet = await Wallet.findOne({
            where: {
                UserId: +data.userId
            }
        });
        if (!wallet) {
            return res.status(404).json({
                message: "Could not find wallet"
            })
        }

        if (wallet && +wallet.balance <= 0) {
            return res.status(401).json({
                balance: wallet.balance,
                status: "not_enough_balance",
                message: "Not enough money on your balance"
            })
        }
        const response = await Assistant.main(data.message, data.conversation_id);

        const tokens = response.data.usage.total_tokens;

        const t = await sequelize.transaction()

        try {
            await wallet.decrement({
                balance: (tokens*process.env.PRICE_PER_TOKEN).toFixed(7)
            }, {transaction: t})

            const transaction = await Transaction.create({
                amount: tokens*process.env.PRICE_PER_TOKEN,
                type: "withdrawal",
                WalletId: wallet.id
            }, {transaction: t})

            t.commit()
        } catch (e) {
            console.log(e);
            t.rollback()
            return res.status(500).json({
                message: "Error when decrementing the wallet"
            })
        }

        res.status(201).json({
            response: response.data.choices,
            conversation_id: +data.conversation_id,
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "Error getting response from API"
        })
    }

}

exports.changeMessageSlightly = async (req, res, next) => {
    try {
        const data = req.body;

        const response = await Assistant.slightChange(data.message, data.conversation_id);
        if (response.data.choices[0].text.split(": ")[0] === "You") {
            response.data.choices[0].text = response.data.choices[0].text.split(": ")[1]
        }
        res.status(201).json({
            response: response.data.choices[0],
            conversation_id: +data.conversation_id,
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "Error getting response from API"
        })
    }
}

exports.changeMessageCompletely = async (req, res, next) => {
    try {
        const data = req.body;

        const response = await Assistant.completelyChange(data.message, data.conversation_id);
        if (response.data.choices[0].text.split(": ")[0] === "You") {
            response.data.choices[0].text = response.data.choices[0].text.split(": ")[1]
        }
        res.status(201).json({
            response: response.data.choices[0],
            conversation_id: +data.conversation_id,
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "Error getting response from API"
        })
    }
}

exports.addSubscriberMessage = async (req, res, next) => {

    try {
        const data = req.body;
        console.log(data)
        let message = await AiMessage.findOne({
            where: {
                text: data.message.trim(),
                aiConversationId: toInt(data.conversation_id),
            }
        })
        if (!message) {
            message = await AiMessage.create({
                text: data.message.trim(),
                type: null,
                sender_id: toInt(data.userId),
                aiConversationId: toInt(data.conversation_id),
            });
        }

        res.status(201).json({
            sub_message: message,
        })
    } catch (e) {
        res.status(500).json({
            message: "Error saving subscriber messages"
        })
    }

}

exports.addModelMessage = async (req, res, next) => {

    try {
        const data = req.body;
        const model_mes = await AiMessage.create({
            text: data.message,
            sender_id: null,
            type: null,
            aiConversationId: toInt(data.conversation_id),
        });

        res.status(201).json({
            model_mes: model_mes,
        })
    } catch (e) {
        res.status(500).json({
            message: "Error saving model messages"
        })
    }

}

exports.addConversation = async (req, res, next) => {
    try {
        let conversation;
        let of_id = req.body.onlyFansId

        conversation = await AiConversation.create({
            onlyFansId: of_id,
            UserId: req.body.userId
        })

        res.status(201).json({
            id: conversation.id,
            onlyFansId: conversation.onlyFansId
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Error adding the conversation"
        })
    }


}

exports.getConversation = async (req, res, next) => {
    try {
        let conversation;
        let of_id = req.query.onlyFansId
        conversation = await AiConversation.findOne({
            where: {
                onlyFansId: of_id,
                UserId: req.body.userId
            }
        })
        res.status(201).json({
            id: conversation.id,
            onlyFansId: conversation.onlyFansId
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Error getting the conversation"
        })
    }


}
