const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const dotenv = require('dotenv').config();


const app = express()

const aiChatRoutes = require('./routes/ai_chat');
const authRoutes = require("./routes/auth")
const paymentRoutes = require("./routes/payments")


app.use(cors())
app.options("*", cors())


app.use(bodyParser.json({
    verify: (req, res, buf) => {
        const url = req.originalUrl;
        if (url.startsWith("/payment/webhook")) {
            req.rawBody = buf.toString()
        }
    }
}))

app.use('/ai_chat', aiChatRoutes)
app.use('/auth', authRoutes)
app.use('/payment', paymentRoutes)
app.get("/", (req, res, next) => {
    res.status(200).send()
})

app.listen(8000)



