const V2_API_KEY = 'lN1jAQVvVGOPSqcIQoMHMLLJA9oE1Rka';
const V3_API_KEY = '2CU5jHC0OFWuoOquTogFU31832ZDQk3X';
// 3CItmRm8j68GAL0hCexL4TtbIz43N2Mu
import axios from 'axios';
import { format, parse } from 'date-fns';

class API {
  async articleSearchByQuery({ q, page = 1, date = null }) {
    let fq = '';
    if (date) {
      fq = `pub_date:${format(date, 'yyyy-MM-dd')}`;
    }

    const response = await axios.get(
      'https://api.nytimes.com/svc/search/v2/articlesearch.json',
      {
        params: {
          q: q,
          page: page,
          fq: fq,
          'api-key': V2_API_KEY,
        },
      }
    );

    const articles = response.data.response.docs.map(result => {
      let image =
        'https://static01.nyt.com/images/2023/02/12/opinion/12French/12French-mediumThreeByTwo440.jpg';
      if (result.multimedia.length > 0) {
        image = 'https://nyt.com/' + result.multimedia[0].url;
      }

      return {
        category: result.section_name ,
        title: result.headline.main,
        image: image,
        description: result.abstract,
        date: new Date(result.pub_date),
        url: result.web_url,
      };
    });

    return {
      articles: articles,
      total: response.data.response.meta.hits,
    };
  }

  async articleSearchMostPopular() {
    const response = await axios.get(
      'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json',
      { params: { 'api-key': V2_API_KEY } }
    );

    const articles = response.data.results.map(result => {

      if (result.media.length === 0) {

        return {
          title: result.title,
          image:
            'https://static01.nyt.com/images/2023/02/12/opinion/12French/12French-mediumThreeByTwo440.jpg',
          description: result.abstract,
          date: parse(result.published_date, 'yyyy-MM-dd', new Date()),
          url: result.url,
        };
      } else
        return {
          title: result.title,
          image: result.media[0]['media-metadata'][2].url,
          description: result.abstract,
          date: parse(result.published_date, 'yyyy-MM-dd', new Date()),
          url: result.url,
        };
    });

    return {
      articles: articles,
      total: response.data.num_results,
    };
  }

  async articleSearchByCategory({ category, date = null, limit, offset }) {
    const response = await axios(
      `https://api.nytimes.com/svc/news/v3/content/all/${category}.json`,
      { params: { 'api-key': V3_API_KEY, limit: limit, offset: offset } }
    );
    const articles = response.data.results.map(result => {
      if (!result.multimedia) {
        return {
          title: result.title,
          image: "https://static01.nyt.com/images/2023/02/12/opinion/12French/12French-mediumThreeByTwo440.jpg",
          description: result.abstract,
          date: new Date(result.published_date),
          url: result.url,
          section: result.section
        };
      } else
        return {
          title: result.title,
          image: result.multimedia[2].url,
          description: result.abstract,
          date: new Date(result.published_date),
          url: result.url,

          section: result.section

        };
    });
    return {
      articles: articles,
      total: response.data.num_results,
    };
  }
}

export default new API();
