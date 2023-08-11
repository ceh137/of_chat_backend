// const Mailjet = require('node-mailjet');
//
// const Recipient = require("mailersend").Recipient;
// const EmailParams = require("mailersend").EmailParams;
// const MailerSend = require("mailersend");
//
// const mailjet = new Mailjet({
//     apiKey: process.env.MJ_APIKEY_PUBLIC || 'your-api-key',
//     apiSecret: process.env.MJ_APIKEY_PRIVATE || 'your-api-secret'
// });
//
// const mailersend = new MailerSend({
//     api_key: "key",
// });

const nodemailer = require('nodemailer');
// const sendmail = require('sendmail')();
//
// const { MailtrapClient } = require("mailtrap");
//
// const TOKEN = "a905e96e31d98f38bba36edaf03c2b9d";
// const ENDPOINT = "https://send.api.mailtrap.io/";

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "ceh9.baybakov@gmail.com",
        pass: "drzzxoiozuuomaqn"
    }
}, {
    // default values for sendMail method
    from: "ceh9.baybakov@gmail.com",
    //headers: {
    //    'My-Awesome-Header': '123'
    //}
});

exports.sendVerificationEmail =  async (user, link) => {

    try {

        const mail_option = {
            "from": "ceh9.baybakov@gmail.com",
            "to": user.email,
            "subject": "Email Verification",
            "text": "Follow this link to verify your email " + link
        }
        console.log(transporter)
        const info = await transporter.sendMail(mail_option)
        console.log(info)

        return true
    } catch (e) {
        console.log(e)
        return false
    }

    // try {
    //     const request = await mailjet.post('send', { version: 'v3.1' }).request({
    //         Messages: [
    //             {
    //                 From: {
    //                     Email: 'ceh9.baybakov@gmail.com',
    //                     Name: 'OnlyChat - Chat Manager',
    //                 },
    //                 To: [
    //                     {
    //                         Email: user.email,
    //                         Name: user.username,
    //                     },
    //                 ],
    //                 TemplateID: 4954069,
    //                 TemplateLanguage: true,
    //                 Subject: 'Email verification',
    //                 Variables: {
    //                     username: user.username,
    //                     link: link
    //                 }
    //             },
    //         ],
    //     });
    //
    //     console.log(request.body)
    //     return true;
    //
    // } catch (e) {
    //     console.log(e);
    //     return false
    // }


}