import { MatrixAuth } from "matrix-bot-sdk";
import * as dotenv from 'dotenv';

// This will be the URL where clients can reach your homeserver. Note that this might be different
// from where the web/chat interface is hosted. The server must support password registration without
// captcha or terms of service (public servers typically won't work).

// Load environment variables from .env file
dotenv.config();

async function login(){

    const homeserverUrl: string | undefined = process.env.BOT_HOMESERVER;
    const username: string | undefined = process.env.BOT_USERNAME;
    const password: string | undefined = process.env.BOT_PASSWORD;

    if (!homeserverUrl) {
        console.error("BOT_HOMESERVER is not defined");
        return;
    } else if (!username) {
        console.error("BOT_USERNAME is not defined");
        return;
    } else if (!password) {
        console.error("BOT_PASSWORD is not defined");
        return;
    }

    const auth = new MatrixAuth(homeserverUrl);
    const client = await auth.passwordLogin(username, password);

    // Assuming you have an access token from the client
    const accessToken = client.accessToken;

    // Set the environment variable
    process.env.BOT_ACCESS_TOKEN = accessToken;
    console.log("Copy this access token to your bot's config: ", client.accessToken);

}

login();