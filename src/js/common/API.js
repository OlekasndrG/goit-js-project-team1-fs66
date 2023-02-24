const V2_API_KEY = 'lN1jAQVvVGOPSqcIQoMHMLLJA9oE1Rka';
const V3_API_KEY = '2CU5jHC0OFWuoOquTogFU31832ZDQk3X';
const V1_API_KEY = 'FoTuvAlXuYDVQYZPH6OxOy31ekAM4HNA';
// 3CItmRm8j68GAL0hCexL4TtbIz43N2Mu
import axios from 'axios';
import { format, parse } from 'date-fns';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import emptyImage from '/img/imageholder.jpeg';

class API {
  async articleSearchByQuery({ q, page = 1, date = null }) {
    let fq = '';
    if (date) {
      fq = `pub_date:${format(date, 'yyyy-MM-dd')}`;
    }

    try {
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
        let image = emptyImage;
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
    } catch (error) {
      console.log(error);
      handleError(error.response);
      return {
        articles: [],
        total: 0,
      };
    }
  }

  async articleSearchMostPopular() {
    try {
      const response = await axios.get(
        'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json',
        { params: { 'api-key': V2_API_KEY } }
      );

      const articles = response.data.results.map(result => {
        return {
          title: result.title,
          image: getImageByPopular(result),
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
    } catch (error) {
      console.log(error);
      handleError(error.response);
      return {
        articles: [],
        total: 0,
      };
    }
  }

  async articleSearchArchiv(date) {
    try {
      const year = format(parse(date, 'yyyy/MM/dd', new Date()), 'yyyy');
      const month = format(parse(date, 'yyyy/MM/dd', new Date()), 'MM');
      const response = await axios.get(
        `https://api.nytimes.com/svc/archive/v1/2019/1.json?api-key=FoTuvAlXuYDVQYZPH6OxOy31ekAM4HNA`,
        { params: { headers: {"Access-Control-Allow-Origin": '*'}
      } }
      );

      const articles = response.data.results.map(result => {
        return {
          title: result.title,
          image: getImageByPopular(result),
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
    } catch (error) {
      console.log(error);
      handleError(error.response);
      return {
        articles: [],
        total: 0,
      };
    }
  }

  async articleSearchByCategory({ category, date = null, limit, offset }) {
    try {
      const response = await axios(
        `https://api.nytimes.com/svc/news/v3/content/all/${category}.json`,
        { params: { 'api-key': V3_API_KEY, limit: limit, offset: offset } }
      );

      const articles = response.data.results.map(result => {
        return {
          title: result.title,
          image: getImageCategory(result),
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
    } catch (error) {
      console.log(error);
      handleError(error.response);
      return {
        articles: [],
        total: 0,
      };
    }
  }
}

function getImageCategory(result) {
  if (!result.multimedia || result.multimedia.length === 0) {
    return emptyImage;
  }
  return getBiggestImage(result.multimedia).url;
}

function getImageByPopular(result) {
  if (!result.media || result.media.length === 0) {
    return emptyImage;
  }
  return getBiggestImage(result.media[0]['media-metadata']).url;
}

function getBiggestImage(multimedia) {
  return multimedia.reduce((max, obj) => (max.height > obj.height ? max : obj));
}

function handleError(response) {
  if (response.status === 429) {
    Notify.failure('API requests limit was exceeded. Please, try again later.');
  } else {
    Notify.failure('something went wrong');
  }
}

export default new API();
