import {
    MatrixClient,
    SimpleFsStorageProvider,
    AutojoinRoomsMixin,
    RustSdkCryptoStorageProvider,
} from "matrix-bot-sdk";

import * as fs from 'fs';
import * as dotenv from 'dotenv';
import * as gFree from './googleFree.js'
import * as gLFree from './googleLegacyFree.js'
import * as gcloud from './gcloud.js';
import * as baidu from './baidu.js'

const SERVICE: string = "gLFree"

// Load environment variables from .env file
dotenv.config();

let translateText: Function

if (SERVICE === "gcloud") {
    translateText = gcloud.translateText;
} else if (SERVICE === "gFree") {
    translateText = gFree.translateText;
} else if (SERVICE === "gLFree") {
    translateText = gLFree.translateText;
} else if (SERVICE === "baidu") {
    translateText = baidu.translateText;
}

let storage: SimpleFsStorageProvider;
let crypto: RustSdkCryptoStorageProvider;

async function runBot() {
    const homeserverUrl: string | undefined = process.env.BOT_HOMESERVER;
    const accessToken: string | undefined = process.env.BOT_ACCESS_TOKEN;
    const store: string | undefined = process.env.BOT_STORE;
    const crypt: string | undefined = process.env.BOT_CRYPT;

    if (accessToken === undefined) {
        console.error('BOT_ACCESS_TOKEN is not defined.');
        return;
    } else if (homeserverUrl === undefined){
        console.error('BOT_HOMESERVER is not defined.');
        return;
    } else if (store === undefined){
        console.error('BOT_STORE is not defined.');
        return;
    } else if (crypt === undefined){
        console.error('BOT_CRYPT is not defined.');
        return;
    }

    storage = new SimpleFsStorageProvider(store);
    crypto = new RustSdkCryptoStorageProvider(crypt)
    const client = new MatrixClient(homeserverUrl, accessToken, storage, crypto);
    AutojoinRoomsMixin.setupOnClient(client);
    client.on("room.message", (roomId, event) => handleCommand(client, roomId, event));

    await client.start();
    console.log("Bot started!");
}

async function tally(body: string) {
        // Check if the key exists in the storage
        const storedValue = storage.readValue("translatedChars");
        if (storedValue !== null && storedValue !== undefined) {
        // If the key exists, parse the stored value as a number
        const oldLength: number = parseInt(storedValue, 10) || 0;
        const updatedLength = oldLength + body.length

        // Store the updated value back to the storage
        storage.storeValue("translatedChars", updatedLength.toString());

        return updatedLength;

        } else {
        // If the key does not exist, create it with the current length
        storage.storeValue("translatedChars", body.length.toString());

        return body.length;
        }
}


async function handleCommand(client: MatrixClient, roomId: string, event: any) {

    if (event['content']?.['msgtype'] !== 'm.text') return;
    if (event['sender'] === await client.getUserId()) return;
    
    const body = event['content']['body'];
    if (typeof body !== 'string') {
        return; // Unable to determine language for non-string content
    }

    const currentCount: number = await tally(body)

    
    if (!SERVICE.includes("Free")) {
        // Check if monthly limit is reached
        const jsonString = fs.readFileSync("limits.json", 'utf-8');
        const limit = JSON.parse(jsonString);
        const monthlyLimit = limit[SERVICE]
        if (currentCount > monthlyLimit) {
        await client.replyNotice(roomId, event, "My limit has been reached. Taking a break for now. I'll see you again next month!");
        console.error(`Monthly translation limit ${monthlyLimit} exceeded for ${SERVICE}. Cannot translate.`);
        return;
        }
    } 

    const translated: string = await translateText(body)
    // console.log(translated)
    await client.replyNotice(roomId, event, translated);
    
}

runBot().catch(error => console.error("Error starting bot:", error));
