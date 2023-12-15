import axios, { AxiosResponse, AxiosError } from 'axios';

const baseUrl = 'https://api.datpmt.com/api/v1/dictionary';
const translator = baseUrl + '/' + 'translate';
const alt_translator = baseUrl + '/' + 'alternate_translations';
const define = baseUrl + '/' + 'definitions';
const usage = baseUrl + '/' + 'examples';  // sample use cases of keyword.
const correction = baseUrl + '/' + 'suggest';
const detector = baseUrl + '/' + 'detection';

async function detectLang(body: string): Promise<[string, number]> {
  try {
    // Make a GET request
    const response: AxiosResponse = await axios.get(detector + '?string=' + encodeURIComponent(body));

    console.log('Response:', response.data);

    // Assuming response.data is a tuple like ['ja', 1]
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    
    // Handle the error appropriately or return a default value
    return Promise.resolve(['defaultLang', 0]);
  }
}

export async function translateText(text: string) {

  // const source: [string, number] | void = await detectLang(text);

  // if (!source) {
  //   console.error("Source language cannot be detected");
  //   return;
  // } 

  const params = {
    string: text,
    from_lang: "auto",
    to_lang: "zh_TW",
  };

  try {
    const response = await axios.get(translator, { params });
    console.log('POST:', response.request.res.responseUrl);
    console.log('Response:', response.data);
    return response.data[0]; // Assuming you want to return the translated data
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error if needed
  }
}

