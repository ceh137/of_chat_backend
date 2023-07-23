const AiMessage = require("../models/ai_message");
const AiConversation = require("../models/ai_conversation_model");
const Assistant = require('../services/chatbot/workki_assistant')
const {Op, where} = require("sequelize");
const User = require("../models/user_model");
const {toInt} = require("validator");


exports.addMessage = async (req, res, next) => {

    try {
        const data = req.body;

        const response = await Assistant.main(data.message, data.conversation_id);

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
        if (response.data.choices[0].text.split(":")[0] === "You")
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
