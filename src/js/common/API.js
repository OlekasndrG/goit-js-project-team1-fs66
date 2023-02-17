const ENDPOINT = '';
const API_KEY = 'lN1jAQVvVGOPSqcIQoMHMLLJA9oE1Rka';
import axios from 'axios';

export default class API {
  constructor() {
    this.name = '';
    this.page = 1;
  }

  async articleSearchByQuery() {
    const response = await axios(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${this.name}&api-key=${API_KEY}`
    );
    // https://api.nytimes.com/svc/search/v2/articlesearch.json?q=ukraine&api-key=eQ8t8FWqeAGnKDTtIFrHmgZCflFrUTcV

    return response.data.response.docs;
  }
  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }
}
