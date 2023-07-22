const dotenv = require('dotenv').config();
const fs = require('fs')
const {glob,
    globSync,
    globStream,
    globStreamSync,
    Glob,} = require('glob')
const openaiPack = require('openai')
const {OpenAIApi} = require("openai");

const configuration = new openaiPack.Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

exports.getResponse = async (options) => {
    let response = await openai.createCompletion(options);
    return response
}
