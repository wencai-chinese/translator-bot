import axios, { AxiosResponse, AxiosError } from 'axios';

const baseUrl = "https://translate.googleapis.com/translate_a/single"

export async function translateText(text: string){
    const params = {
        client: "gtx",
        sl: "auto",  // source lang
        tl: "zh-TW",  // target lang
        dj: 1,
        dt:"t",
        ie: "UTF-8",
        q: text,
      };

      try {
        const response = await axios.get(baseUrl, { params });
        // console.log('POST:', response.request.res.responseUrl);
        const sentences = response.data['sentences'];
        let combinedTranslation = '';

        for (const sentence of sentences) {
        combinedTranslation += sentence['trans'] + ' ';
        }

        console.log('Translated:', combinedTranslation);
        return combinedTranslation; // Assuming you want to return the translated data
      } catch (error) {
        console.error('Error:', error);
        throw error; // Rethrow the error if needed
      }
}
