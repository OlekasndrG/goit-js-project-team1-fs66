import axios from "axios";

export async function fetchCategories() {
  try {
    const BASE_URL = 'https://api.nytimes.com/svc//news/v3/content/section-list.json?api-key='
    const KEY = '3CItmRm8j68GAL0hCexL4TtbIz43N2Mu'
    const data = await axios.get(`${BASE_URL}${KEY}`);
    
    return data.data.results

  } catch (error) {
  console.error(error);
}
  }

  // 76882478-afc6-447b-914d-bc911ba6f5bf
// 2CU5jHC0OFWuoOquTogFU31832ZDQk3X