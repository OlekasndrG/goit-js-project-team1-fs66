import { onRenderOneCard } from './renderOneCard';
import api from '../common/API';
import paginator from './pagination';
const data = localStorage.getItem('Date_current');
const inputEl = document.getElementById('search');
console.log(inputEl);
export let classActiv = null;

export function onSerchByCategori() {
  const dataCurrent = localStorage.getItem('Date_current');
  const categoriesLink = document.querySelector('.categories-box');
  categoriesLink.addEventListener('click', e => {
    if (e.target.nodeName !== 'A') {
      return;
    }
    if (classActiv !== null) {
      classActiv.classList.remove('categories-activ');
    }
    classActiv = e.target.parentNode;
    classActiv.classList.add('categories-activ');
    inputEl.value = '';
    const category = encodeURIComponent(
      `${e.target.textContent.toLowerCase()}`
    );

    const options = {
      api: {
        method: api.articleSearchByCategory,
        params: { category: category, date: null },
      },
      onPageChanged: onRenderOneCard,
    };

    paginator.paginate(options);
  });
}
