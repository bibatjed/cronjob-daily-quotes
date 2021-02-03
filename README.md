# Daily Quotes Telegram

A simple cronjob that randomly picks a quote and send it through telegram.

## Installation

Clone the repo

```
git clone https://github.com/jedpogi/cronjob-daily-quotes
```

Install dependecies
```
npm install
```

Create a telegram bot using botfather, you can refer to this docs on how to create a bot in telegram.
```
https://core.telegram.org/bots
```


## Env Example

```
TELEGRAM_BOT_TOKEN=<telegram_bot_token> //after creating a bot in telegram
TELEGRAM_CHAT_ID=<telegram_chat_id>    //after creating a bot in telegram
```