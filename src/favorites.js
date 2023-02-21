import { load, save } from './js/common/local_storage';
import './js/components/burger-menu';
import './js/components/theme';

const refs = {
  favPage: document.querySelector('.favotire-page-gallery'),
  emptyPage: document.querySelector('.empty-page'),
};

cleanLocalStorageFav();

if (load('favCards')) {
  renderCards(load('favCards'));
}

refs.favPage.addEventListener('click', handleClickGallery);

function handleClickGallery(e) {
  e.preventDefault();
  const targetElement = e.target;
  const favoritesLocal = load('favCards') || [];

  if (targetElement.nodeName === 'P' || targetElement.nodeName === 'DIV') {
    const card = targetElement.closest('.list-news__item');
    const cardBtn = card.querySelector('.item-news__add-text');
    const cardTitle = card.querySelector('.item-news__title');
    const cardHeartImg = card.querySelector('.item-news__heart-icon');
    cardHeartImg.classList.add('is-saved');
    cardBtn.textContent = 'Remove from favorite';
    const stringifyCard = card.outerHTML;

    const indexArray = favoritesLocal.map(el => el.title);
    const index = indexArray.indexOf(cardTitle.textContent);

    if (!cardTitle) return;

    if (index == -1) {
      favoritesLocal.push({
        card: stringifyCard,
        title: cardTitle.textContent,
      });
    } else {
      favoritesLocal.splice(index, 1);
      cardBtn.textContent = 'Add to favorite';
      cardHeartImg.classList.remove('is-saved');
    }

    save('favCards', favoritesLocal);
  }

  cleanLocalStorageFav();
}

function renderCards(array) {
  const newsList = document.createElement('ul');
  newsList.classList.add('list-news');
  newsList.classList.add('favorite-flex-start');

  const cardsMarup = array.map(el => Object.values(el)[0]);
  newsList.insertAdjacentHTML('beforeend', cardsMarup.join(''));
  const cards = newsList.querySelectorAll('.list-news__item');

  cleanLabelFromHomePage(cards);
  isEmptyPage(newsList);
}

function isEmptyPage(newsList) {
  if (newsList.hasChildNodes()) {
    refs.favPage.appendChild(newsList);
  } else {
    refs.emptyPage.classList.add('is-show');
  }
}

function cleanLabelFromHomePage(cards) {
  cards.forEach(el => {
    el.classList.remove('is-ghost');
    const cardStatus = el.querySelector('.item-news__already-read');
    cardStatus.classList.remove('is-read');
  });
}

function cleanLocalStorageFav() {
  if (load('favCards').length === 0) {
    localStorage.removeItem('favCards');
  }
}
