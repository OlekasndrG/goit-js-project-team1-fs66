import api from '../common/API';
import paginator from './pagination';
import PaginationSearchHandler from './paginationSearchHandler';
import { format, parse } from 'date-fns';
import { onRenderOneCard } from './renderOneCard';
import { classActiv } from './clickByCategoriesLink';
import mobile2x from '/img/mobile@2x.png';
import tablet2x from '/img/tablet@2x.png';
import desktop2x from '/img/desktop@2x.png';
import mobile from '/img/mobile.png';
import tablet from '/img/tablet.png';
import desktop from '/img/desktop.png';


const form = document.querySelector('form.form-search');
const input = document.querySelector('.input-search');
form.addEventListener('submit', onSubmit);
const section = document.querySelector('.section__list-news');
const articles = document.querySelector('.list-news');
const date = document.getElementById('input-picker');

function onSubmit(event) {
  event.preventDefault();
  if (classActiv !== null) {
    classActiv.classList.remove('categories-activ')
  }
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
    <source srcset="${mobile} 1x, ${mobile2x} 2x" type="image/png" media="(max-width: 480px)"
        alt="empty-page" />
    <source srcset="${tablet} 1x, ${tablet2x} 2x" type="image/png" media="(max-width:768px)"
        alt="empty-page" />
    <source srcset="${desktop} 1x, ${desktop2x} 2x" type="image/png" media="(min-width: 1280px)"
        alt="empty-page" />
    <img class="empty_picture" src="${mobile}" alt="empty-page" width="248" height="198" />
</picture>

</section>`;

  articles.innerHTML = emptyPage;
}
