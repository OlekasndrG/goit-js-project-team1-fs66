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
        'https://textis.ru/wp-content/uploads/2017/02/kak-pisat-novosti.png';
      if (result.multimedia.length > 0) {
        image = 'https://nyt.com/' + result.multimedia[0].url;
      }

      return {
        section: result.section_name,
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
            'https://textis.ru/wp-content/uploads/2017/02/kak-pisat-novosti.png',
          description: result.abstract,
          date: parse(result.published_date, 'yyyy-MM-dd', new Date()),
          url: result.url,
          section: result.section,
        };
      } else
        return {
          title: result.title,
          image: result.media[0]['media-metadata'][2].url,
          description: result.abstract,
          date: parse(result.published_date, 'yyyy-MM-dd', new Date()),
          url: result.url,
          section: result.section,
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
      console.log(result);
      return {
        title: result.title,
        image: getImage(result),
        description: result.abstract,
        date: new Date(result.published_date),
        url: result.url,

        section: result.section,
      };
    });
    return {
      articles: articles,
      total: 26, // api always returns 26 results, yet it shows total number of 500
    };
  }
}

function getImage(result) {
  if (!result.multimedia || result.multimedia.length === 0) {
    return 'https://textis.ru/wp-content/uploads/2017/02/kak-pisat-novosti.png';
  }
  return getBiggestImage(result.multimedia).url;
}

export default new API();

function getBiggestImage(multimedia) {
  return multimedia.reduce((max, obj) => (max.height > obj.height ? max : obj));
}
