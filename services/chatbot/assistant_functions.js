const AiMessage = require("../../models/ai_message");
const AiConversation = require("../../models/ai_conversation_model");



exports.sendEmail = async (ws, reply, args) => {
    console.log(JSON.parse(args))
    const email = {
            message: {
                body: JSON.parse(args).body,
                recipient: JSON.parse(args).recipient,
                subject: JSON.parse(args).subject
            },
            type: "email",
            sender_id: null,
            conversation_id: reply.aiConversationId
    }

    const emailtodb = await AiMessage.create({
        text: JSON.stringify(email.message),
        type: "email",
        sender_id: null,
        aiConversationId: reply.aiConversationId
    })
    if (emailtodb){
        ws.send(JSON.stringify(email))
    } else {
        return JSON.stringify({
            "message": "error",
            "function": "sendEmail"
        })
    }

}


exports.addEventCalendar = async (ws, reply, args) => {
    const event = {
        message: {
            title: JSON.parse(args).subject,
            start: JSON.parse(args).start,
            end: JSON.parse(args).end,
            body: JSON.parse(args).body || "",
            duration: Date.parse(JSON.parse(args).end) - Date.parse(JSON.parse(args).start),
            reminder: JSON.parse(args).reminder,
            place: JSON.parse(args).location,
            attendees: JSON.parse(args).attendees,
        },
        type: "calendar",
        sender_id: null,
        conversation_id: reply.aiConversationId
    }

    const eventtodb = await AiMessage.create({
        text: JSON.stringify(event.message),
        type: "calendar",
        sender_id: null,
        aiConversationId: reply.aiConversationId
    })
    if (eventtodb) {
        ws.send(JSON.stringify(event))
    } else {
        return JSON.stringify({
            "message": "error",
            "function": "addEventCalendar"
        })
    }
}

exports.getContacts = async (ws, reply, args) => {

}

exports.generateImage = (prompt, number_of_images, size) => {

}