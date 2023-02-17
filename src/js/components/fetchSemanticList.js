import axios from "axios";

export async function fetchCategories() {
  try {
    const BASE_URL = 'https://api.nytimes.com/svc//news/v3/content/section-list.json?api-key='
    const KEY = '2CU5jHC0OFWuoOquTogFU31832ZDQk3X'
    const data = await axios.get(`${BASE_URL}${KEY}`);
    
    return data.data.results

  } catch (error) {
  console.error(error);
}
  }