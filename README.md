# Translator Bot

A very basic translator bot built with [Matrix Bot SDK](https://turt2live.github.io/matrix-bot-sdk/index.html) that will translate everything you say into Chinese. 

![image](https://github.com/wencai-chinese/translator-bot/assets/152161788/91dd1e21-4746-4c67-a502-a4ede6d8a09c)

Useful for bilingual communications. 

Especially powerful when combined with bridges that can port over and synchronize your communications across multiple platforms like [WhatsApp](https://matrix.org/ecosystem/bridges/whatsapp/), [Telegram](https://matrix.org/ecosystem/bridges/telegram/) etc. into Matrix.

## Usage

1. Fork or clone this repo.
2. Setup the bot. 
3. Invite the bot into a room and start chatting.

All text posted in the room will be spontaneously translated into Chinese. 

## What you need

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

## Setup

### Locally

Run in terminal:

```bash
npm install
npm run build
node dist/basic-bot.js
```

### On Github

Start a new workflow with [this file](.github/workflows/deploy.yml) in the repo.

The workflow action will terminate after every 6 hours due to [usage limits](https://docs.github.com/en/actions/learn-github-actions/usage-limits-billing-and-administration#usage-limits) on Github. 

## Translator Engine

The bot uses a free Goolge Translate legacy service API `gLFree` by default. 

A range of different services can be chosen by setting the `SERVICE` variable in `src/basic-bot.ts`. These include:

1. `gLFree`: Free legacy Google Translate API utilized by bregydoc's [gtranslate](https://github.com/bregydoc/gtranslate.git).
2. `gFree`: Another free Google Translate API, [google-translate-free-api](https://github.com/datpmt/google-translate-free-api) hosted by datpmt, with more functionalities exposed other than translation. However, datpmt will [collect your IP information](https://api.datpmt.com) if you use the service.
3. `gcloud`: The official Google Cloud [Translation API](https://cloud.google.com/translate/docs/reference/rest). More credentials have to be provided, such as your `GCLOUD_API_KEY` if you wish to use this service. The service is free up to a certain character limit (500000 as at Dec 2023) per month. 
4. `baidu`: Baidu Translation [API](https://fanyi-api.baidu.com). Credentials such your `BD_APPID` and a `BD_SECRET` are needed to access this service. You need a Baidu account registered as a developer to obtain the credentials. Baidu accounts are only available to people with a PRC mobile number who are residing in China. The service is free up to a certain character limit (2000000 as at Dec 2023) per month. 

This bot is coded to automatically tally the total number of characters translated and stop the bot when the free monthly quota is exceeded. Update `limits.json` when the respective Google and Baidu policy changes.
