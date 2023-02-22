import { onRenderOneCard } from './renderOneCard';
import api from '../common/API';
import paginator from './pagination';
const data = localStorage.getItem('Date_current');

export function onSerchByCategori() {
  const dataCurrent = localStorage.getItem('Date_current');
  const categoriesLink = document.querySelector('.categories-box');

  categoriesLink.addEventListener('click', e => {
    if (e.target.nodeName !== 'A') {
      return;
    }
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
