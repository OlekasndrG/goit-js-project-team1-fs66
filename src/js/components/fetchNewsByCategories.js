import axios from "axios";

export async function fetchNewsByCategories(categories) {
  try {
    const BASE_URL = 'https://api.nytimes.com/svc/news/v3/content/all/'
    const KEY = '2CU5jHC0OFWuoOquTogFU31832ZDQk3X'
    const data = await axios.get(`${BASE_URL}${categories}.json?api-key=${KEY}`);
    
    return data.data.results

  } catch (error) {
  console.error(error);
}
  }