import { load, save } from '../common/local_storage';
import { updateUserCards } from './dataBase/setDatabase';
import { onGetCookie } from './dataBase/getCookie';
import { cleanLocalStorageFav } from './findCardsInBase';
import { makeCardObject, onClickReadMoreHome } from './onReadMore';

cleanLocalStorageFav();

export const newsListRef = document.querySelector('.list-news');

newsListRef.addEventListener('click', handleClickGallery);

function handleClickGallery(e) {
  const targetElement = e.target;

  if (targetElement.nodeName === 'A') {
    onClickReadMoreHome(targetElement);
  }

  const favoritesLocal = load('favCards') || [];

  if (targetElement.nodeName === 'P' || targetElement.nodeName === 'DIV') {
    const card = targetElement.closest('.item-news__article');
    const cardObject = makeCardObject(card);
    const cardBtn = card.querySelector('.item-news__add-text');
    const cardHeartImg = card.querySelector('#icon-heart');

    const indexArray = favoritesLocal.map(el => el.title);
    const index = indexArray.indexOf(cardObject.title);

    if (!cardObject.title) return;
    if (index == -1) {
      favoritesLocal.unshift(cardObject);
      cardHeartImg.classList.add('is-saved');
      cardBtn.textContent = 'Remove from favorite';
    } else {
      favoritesLocal.splice(index, 1);
      cardBtn.textContent = 'Add to favorite';
      cardHeartImg.classList.remove('is-saved');
    }

    if (onGetCookie('user')) {
      const userId = onGetCookie('user');
      save('favCards', favoritesLocal);
      updateUserCards(userId, { favCards: load('favCards') });
    } else {
      save('favCards', favoritesLocal);
    }
  }

  cleanLocalStorageFav();
}