import axios, { AxiosResponse, AxiosError } from 'axios';
import { createHash } from 'crypto';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const baseUrl = 'https://fanyi-api.baidu.com/api/trans/vip/translate';
const appid = process.env.BD_APPID;
const secret = process.env.BD_SECRET;
const salt = randomString(10);


function randomString(n: number){
    const results: number[] = [];

    for (let i = 0; i < n; i++) {
    const randomValue = Math.floor(Math.random() * 10);
    results.push(randomValue);
    }

    const resultString = results.join('');

    return resultString;
}

export async function translateText(q: string, to: string, from="auto"){

    if (appid === undefined) {
        console.error('BD_APPID is not defined.');
        return;
    } else if (secret === undefined){
        console.error('BD_SECRET is not defined.');
        return;
    }

    const signRaw = appid + q + salt + secret
    const signHash = createHash('md5').update(signRaw).digest('hex');

    const params = {
        string: q,
        from: from,
        to: to,
        appid: appid,
        salt: salt,
        sign: signHash
      };
    
      try {
        const response = await axios.get(baseUrl, { params });
        console.log('POST:', response.request.res.responseUrl);
        console.log('Response:', response.data);
        return response.data; // Assuming you want to return the translated data
      } catch (error) {
        console.error('Error:', error);
        throw error; // Rethrow the error if needed
      }

}