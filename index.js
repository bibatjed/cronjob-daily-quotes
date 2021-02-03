require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch');
const CronJob = require('cron').CronJob;

//for heroku deployments only, it cause an error if you don't include a http listener
const express = require('express');
const app = express();

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;
const quotesEndpoint = 'https://type.fit/api/quotes';

const sendTelegramBot = async () => {
    try {
        const fetchQuotes = await fetch(quotesEndpoint);
        const jsonQuotes = await fetchQuotes.json();

        const job = new CronJob('0 6 * * *', async () => {
            const randomNumber = Math.floor(Math.random() * jsonQuotes.length);
            const pickedQuote = jsonQuotes[randomNumber];
            const textToBeSent = `${pickedQuote.text} - ${
                pickedQuote.author || 'Random dude'
            }`;

            const bot = new TelegramBot(token);

            await bot.sendMessage(chatId, textToBeSent);
            console.log('Telegram Message Sent!');
        }, null, true, 'Asia/Singapore');

        job.start();
    } catch (e) {
        console.log(e);
    }
};

//to make dynos alive in heroku
app.all('/healthcheck', (req, res) => res.send('Cronjob is working'))

app.listen(process.env.PORT || 5000);

sendTelegramBot();
