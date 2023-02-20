import axios from "axios";
export async function fetchCategoriess() {
  try {
    const BASE_URL = 'https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key='
    const KEY = '2CU5jHC0OFWuoOquTogFU31832ZDQk3X'
    const data = await axios.get(`${BASE_URL}${KEY}`);
    
    return data.data.results
  } catch (error) {
    
}
  }
  // https://api.nytimes.com/svc//news/v3/content/section-list.json?api-key=eQ8t8FWqeAGnKDTtIFrHmgZCflFrUTcV