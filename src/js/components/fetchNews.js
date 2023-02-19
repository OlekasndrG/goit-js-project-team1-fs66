export { newsAPI };

class newsAPI {
  constructor() {
    this.option = new URLSearchParams({
      'api-key': 'pzPa16QZvkG7Bet6yTKMlmGdQxS2ANHl',
    });
    this.newsConfig = "news/v3/content/";
    this.mostPolularConfig = "mostpopular/v2/";
    this.BASE_URL = "https://api.nytimes.com/svc/";
  }

  async fetchNews({ source, section }) {
    const r = await fetch(
      `${this.BASE_URL + this.newsConfig + source}/${section}?${this.option}`
    );
    if (r.ok) {
      return r.json();
    }
    throw Error("Something went wrong in fetchNews");
  }
  async fetchCatagoryList() {
    const r = await fetch(
      `${this.BASE_URL + this.newsConfig}/section-list.json?${this.option}`
    );
    if (r.ok) {
      return r.json();
    }
    throw Error("Something went wrong in fetchCatagoryList");
  }
}
