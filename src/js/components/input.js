const ENDPOINT = '';
const API_KEY = 'lN1jAQVvVGOPSqcIQoMHMLLJA9oE1Rka';
import axios from 'axios';
import { onRenderOneCard } from './renderOneCard';
class API {
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

const api = new API();

const form = document.querySelector('form.form-search');
const input = document.querySelector('.input-search');
form.addEventListener('submit', onSubmit);
const section = document.querySelector('.section__list-news');
const articles = document.querySelector('.list-news');
function onSubmit(event) {
  event.preventDefault();
  console.log(input.value.trim());
  api.name = input.value.trim();
  api
    .articleSearchByQuery()
    .then(articles => {
      if (articles.length === 0) {
        return console.log(`ми не знайшли статтей про ${api.name}`);
      }

      return createMarkUp(articles);
    })
    .catch(error => console.error(error));
}

function createMarkUp(articles) {
  console.log(articles);

  const markup = articles.map(
    ({
      news_desk,
      section_name,
      abstract,
      web_url,
    }) => `<li class="list-news__item">
            <article class="item-news__article">
                <div class="item-news__wrapper-img">
                    <img class="item-news__img" src="#" alt="">
                    <p class="item-news__category">${news_desk}</p>
                    <p class="item-news__add-to-favorite">Add to favorite
                        <svg class="item-news__icon" width="16" height="16">
                            <use class="item-news__heart-icon" href="../img/icons_site.svg#icon-heart_wite"></use>
                        </svg>
                    </p>
                </div>
                <div class=".item-news__wrapper-text">
                    <h2 class="item-news__title">
                        ${section_name}
                    </h2>
                    <p class="item-news__description">
                        ${abstract}</p>
                </div>
                <div class="item-news__info">
                    <span class="item-news__info-date">
                        20/02/2021
                    </span>
                    <a class="item-news__info-link" href="${web_url}">Read more</a>
                </div>
            </article>
        </li>`
  );

  markup.join('');
  return insertMarkUp(markup);
}

function insertMarkUp(markup) {
  articles.innerHTML = markup;
}
