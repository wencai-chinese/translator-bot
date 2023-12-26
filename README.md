A very basic translator bot that will translate everything you say into Chinese. 
Useful for bilingual communications. 
Especially powerful when combined with bridges that can port over and synchronize your communications across multiple platforms like [WhatsApp](https://matrix.org/ecosystem/bridges/whatsapp/), [Telegram](https://matrix.org/ecosystem/bridges/telegram/) etc. into matrix.

# Usage

1. Fork or clone this repo.
2. Setup the bot. 
3. Invite the bot into a room and start chatting.

All text posted in the room will be spontaneously translated into Chinese. 

# What you need

1. A matrix account. Get one [for free](https://matrix.org/try-matrix/).
2. A separate matrix account for the bot.
3. The following information that *should not* be shared publicly.
  a. `BOT_HOMESERVER`; information you will have after registering your bot matrix account. 
  b. `BOT_USERNAME`; information you will have after registering your bot matrix account. 
  c. `BOT_PASSWORD`; information you will have after registering your bot matrix account. 
  d. `BOT_STORE`; a json file to store information related to and accessible by the bot.
  e. `BOT_CRYPT`; a folder to store encryption information. 
  f. `BOT_ACCESS_TOKEN`; this can be retrieved by running `node dist/bot-login.js` after building the package.

When running locally, store the above as environment variables in a `.env` file. 
When running on Github, store the above as actions [secrets](translator-bot/settings/secrets/actions).

# Setup

## Locally

Run in terminal:

```bash
npm install
npm run build
node dist/basic-bot.js
```

## On Github

Start a new workflow with [this file](.github/workflows/deploy.yml) in the repo.
