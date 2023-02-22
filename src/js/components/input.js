
import api from '../common/API';
import paginator from './pagination';
import PaginationSearchHandler from './paginationSearchHandler';
import { findFavoriteCards, findReadCards } from './articles';
import { format, parse } from 'date-fns';
// console.log(API);

const form = document.querySelector('form.form-search');
const input = document.querySelector('.input-search');
form.addEventListener('submit', onSubmit);
const section = document.querySelector('.section__list-news');
const articles = document.querySelector('.list-news');
const date = document.getElementById('input-picker');

// console.log(API);

function onSubmit(event) {
  event.preventDefault();


  const options = {
    perPage: 8,
    api: {
      method: api.articleSearchByQuery,
      params: { q: input.value, date: null },
      externalHandler: new PaginationSearchHandler(),
    },
    onPageChanged: createMarkUp,
  };

  paginator.paginate(options);
  findFavoriteCards();
  findReadCards();
}


function createMarkUp(articles) {
  const markup = articles.map(article => {
    if (localStorage.getItem('Date_current')) {
      const selectedDate = new Date(localStorage.getItem('Date_current'));

      if (
        (article.date.getUTCDate() === selectedDate.getUTCDate()) &
        ((article.date.getUTCMonth() === selectedDate.getUTCMonth()) &
          (article.date.getUTCFullYear() === selectedDate.getUTCFullYear()))
      ) {
        return generateArticlesMarkup(article);
      } else {
        return;
      }
    }
    return generateArticlesMarkup(article);
  });
  if (markup.join('') !== '') {
    return insertMarkUp(markup.join(''));
  } else {
    return insertMarkUp(onNoResults());
  }
  findFavoriteCards();
  findReadCards();
}

function generateArticlesMarkup({
  title,
  image,
  description,
  url,
  date,
  category,
}) {
  function truncateString(str) {
    return str.length > 75 ? str.slice(0, 75) + '...' : str;
  }
  let limitString = truncateString(description);

  return `<li class="list-news__item">
        <article class="item-news__article">
            <div class="item-news__wrapper-img">
                <img class="item-news__img" src="${image}" alt="">
                <p class="item-news__category">${category}</p>

                <div class="item-news__add-to-favorite">

                <p class="item-news__add-text">Add to favorite</p>
                <svg class="item-news__icon" width="16" height="16">
                  <use class="item-news__heart-icon" href="./img/icons_site.svg#icon-heart_wite"></use>
                </svg>
              </div>
						</div>
              <div class='item-news__already-read'>
                <span class='item-news__already-read-text'>Already read</span>
                <svg class='item-news__icon' width='18' height='18'>
                  <use class='item-news__check-icon' href='./img/sprite-icons.svg#icon-done'></use>
                </svg>
              </div>

            <div class="item-news__wrapper-text">
                <h2 class="item-news__title">
                ${title}
                </h2>
                <p class="item-news__description">
                ${limitString}</p>
            </div>
            <div class="item-news__info">
                <span class="item-news__info-date">
                ${format(date, 'yyyy-MM-dd')}
                </span>
                <a class="item-news__info-link" href="${url}#">Read more</a>
            </div>
        </article>
    </li>`;
}

function insertMarkUp(markup) {
  articles.innerHTML = markup;
}

function onNoResults() {
  return `<section class="empty_main">

<p class="empty_title">We haven't found news
    <br>
    from this category</p>
<picture>
    <source srcset="../../img/mobile.png 1x, .../../img/mobile@2x.png 2x" type="image/png" media="(max-width: 480px)"
        alt="empty-page" />
    <source srcset="../../img/tablet.png 1x, ../../img/tablet@2x.png 2x" type="image/png" media="(max-width:768px)"
        alt="empty-page" />
    <source srcset="../../img/desktop.png 1x, ../../img/desktop@2x.png 2x" type="image/png" media="(min-width: 1280px)"
        alt="empty-page" />
    <img class="empty_picture" src="../../img/mobile.png" alt="empty-page" width="248" height="198" />
</picture>

</section>`;
}
