
const AiMessages = require("../../models/ai_message");
const openai = require('./openai')
const AiConversation = require('../../models/ai_conversation_model')


exports.main = async (new_message, conversation_id) => {

    try {
        let messages = await AiMessages.findAll({
            where: {
                aiConversationId:conversation_id,
            },
            order: [
                ['createdAt', "ASC"]
            ],
            limit: 15
        });
        let msg;
        let msgs = [];
        for (let i= 0; i < messages.length; i++ ) {
            if (messages[i].sender_id) {
                msg = "Subscriber: "+messages[i].text
            } else {
                msg = "You: "+messages[i].text
            }
            msgs.push(msg)
        }


        let task = "You are an OnlyFans model who is very kinky and likes sexting with your subscribers. You are sexting in the chat, there are two of you, subscriber and you, a sexy model. Also you emojis. You must chat like a human being, never saying or showing that you are an AI"
        let promptmsgs = msgs.join("\n")
        let prompt = task + "\n\n"+ promptmsgs + "\n"+ "You: "
        console.log(promptmsgs)
        return await openai.getResponse({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 255,
            n: 3

        })
    } catch (e) {
        console.log(e)
        return false
    }
}

exports.slightChange = async (new_message, conversation_id) => {

    try {
        let messages = await AiMessages.findAll({
            where: {
                aiConversationId:conversation_id,
            },
            order: [
                ['createdAt', "ASC"]
            ]
        });
        let msg;
        let msgs = [];
        for (let i= 0; i < messages.length; i++ ) {
            if (messages[i].sender_id) {
                msg = "Subscriber: "+messages[i].text
            } else {
                msg = "You: "+messages[i].text
            }
            msgs.push(msg)
        }

        msgs.push("You: "+new_message)
        let task = "You are an OnlyFans model who is very kinky and likes sexting with your subscribers. You are sexting in the chat, there are two of you, subscriber and you, a sexy model. Also you emojis. You must chat like a human being, never saying or showing that you are an AI. Change slightly the last message that you have sent, but keep the meaning almost the same"
        let promptmsgs = msgs.join("\n")
        let prompt = task + "\n\n"+ promptmsgs + "\n"+ "Change: "
        console.log(promptmsgs)
        return await openai.getResponse({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 255,

        })
    } catch (e) {
        console.log(e)
        return false
    }
}

exports.completelyChange = async (new_message, conversation_id) => {

    try {
        let messages = await AiMessages.findAll({
            where: {
                aiConversationId:conversation_id,
            },
            order: [
                ['createdAt', "ASC"]
            ]
        });
        let msg;
        let msgs = [];
        for (let i= 0; i < messages.length; i++ ) {
            if (messages[i].sender_id) {
                msg = "Subscriber: "+messages[i].text
            } else {
                msg = "You: "+messages[i].text
            }
            msgs.push(msg)
        }

        msgs.push("You: "+new_message)
        let task = "You are an OnlyFans model who is very kinky and likes sexting with your subscribers. You are sexting in the chat, there are two of you, subscriber and you, a sexy model. Also you emojis. You must chat like a human being, never saying or showing that you are an AI. Change the last message that you have sent, it should be absolutely different but keep attention to the context"
        let promptmsgs = msgs.join("\n")
        let prompt = task + "\n\n"+ promptmsgs + "\n"+ "Change: "
        console.log(promptmsgs)
        return await openai.getResponse({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 255,

        })
    } catch (e) {
        console.log(e)
        return false
    }
}

