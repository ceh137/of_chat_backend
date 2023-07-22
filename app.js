const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const dotenv = require('dotenv').config();


const app = express()

const aiChatRoutes = require('./routes/ai_chat');
const authRoutes = require("./routes/auth")

app.use(cors())
app.options("*", cors())

app.use(bodyParser.json())

app.use('/ai_chat', aiChatRoutes)
app.use('/auth', authRoutes)

app.get("/", (req, res, next) => {
    res.status(200).send()
})

app.listen(8000)



