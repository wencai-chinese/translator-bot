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

    let retryCount = 0;
    const maxRetries = 3; // Adjust as needed

    async function attemptLogin() {
        try {

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
            const accessToken = client.accessToken;

            // Set the environment variable
            process.env.BOT_ACCESS_TOKEN = accessToken;
            console.log("Copy this access token to your bot's config: ", accessToken);

        } catch (error: any) {
            if (error.errcode === 'M_LIMIT_EXCEEDED' && retryCount < maxRetries) {
                const retryAfterMs = error.retry_after_ms || 5000; // Default to 5 seconds
                console.log(`Rate limit exceeded. Retrying after ${retryAfterMs / 1000} seconds...`);
                retryCount++;
                await new Promise(resolve => setTimeout(resolve, retryAfterMs));
                await attemptLogin(); // Retry
            } else {
                throw error; // Propagate other errors
            }
        }
    }
    await attemptLogin();
}

login();