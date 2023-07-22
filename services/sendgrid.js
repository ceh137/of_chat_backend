const Mailjet = require('node-mailjet');



const mailjet = new Mailjet({
    apiKey: process.env.MJ_APIKEY_PUBLIC || 'your-api-key',
    apiSecret: process.env.MJ_APIKEY_PRIVATE || 'your-api-secret'
});


exports.sendVerificationEmail = async (user, link) =>  {

    try {
        const request = await mailjet.post('send', { version: 'v3.1' }).request({
            Messages: [
                {
                    From: {
                        Email: 'ceh9.baybakov@gmail.com',
                        Name: 'OnlyChat - Chat Manager',
                    },
                    To: [
                        {
                            Email: user.email,
                            Name: user.username,
                        },
                    ],
                    TemplateID: 4954069,
                    TemplateLanguage: true,
                    Subject: 'Email verification',
                    Variables: {
                        username: user.username,
                        link: link
                    }
                },
            ],
        });

        console.log(request.body)
        return true;

    } catch (e) {
        console.log(e);
        return false
    }





}