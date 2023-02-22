import api from '../common/API';
import paginator from './pagination';
import PaginationSearchHandler from './paginationSearchHandler';
import { format, parse } from 'date-fns';
import { onRenderOneCard } from './renderOneCard';

const form = document.querySelector('form.form-search');
const input = document.querySelector('.input-search');
form.addEventListener('submit', onSubmit);
const section = document.querySelector('.section__list-news');
const articles = document.querySelector('.list-news');
const date = document.getElementById('input-picker');

function onSubmit(event) {
  event.preventDefault();

  const options = {
    api: {
      method: api.articleSearchByQuery,
      params: {
        q: input.value,
        date: dateSet(),
      },
      externalHandler: new PaginationSearchHandler(),
    },
    onPageChanged: createMarkUp,
  };

  paginator.paginate(options);
}
function dateSet() {
  if (localStorage.getItem('Date_current')) {
    return new Date(localStorage.getItem('Date_current'));
  } else {
    return null;
  }
}
function createMarkUp(articles) {
  if (articles.length !== 0) {
    onRenderOneCard(articles);
  } else {
    return onNoResults();
  }
}

function onNoResults() {
  const emptyPage = `<section class="empty_main">

<p class="empty_title">We haven't found news
    <br>
    from this category</p>
<picture>
    <source srcset="./img/mobile.png 1x, ./img/mobile@2x.png 2x" type="image/png" media="(max-width: 480px)"
        alt="empty-page" />
    <source srcset="./img/tablet.png 1x, ./img/tablet@2x.png 2x" type="image/png" media="(max-width:768px)"
        alt="empty-page" />
    <source srcset="./img/desktop.png 1x, ./img/desktop@2x.png 2x" type="image/png" media="(min-width: 1280px)"
        alt="empty-page" />
    <img class="empty_picture" src="./img/mobile.png" alt="empty-page" width="248" height="198" />
</picture>

</section>`;

  articles.innerHTML = emptyPage;
}
