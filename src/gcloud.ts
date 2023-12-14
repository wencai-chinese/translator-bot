import { Translate } from '@google-cloud/translate/build/src/v2/index.js';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Set up Google Cloud Translate client
const translate = new Translate({
  key: process.env['GCLOUD_API_KEY'],
  projectId: 'pioneering-rex-408011', // Replace with your actual project ID
});

// Function to translate text
export async function translateText(text: string): Promise<string> {
  return translate.translate(text, 'zh')
    .then(([translation]) => translation);
}

// // Call translateText directly
// translateText("This is a great achievement!")
//   .then((output) => console.log(output));