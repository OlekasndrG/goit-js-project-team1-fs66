import { load } from '../common/local_storage';
import { onGetCookie } from './dataBase/getCookie';
import { getDatabase, ref, child, get } from 'firebase/database';

export function findFavoriteCards(favPage) {
  if (load('favCards')) {
    const cardsArray = load('favCards');
    const arrayHomePageCards = Array.from(
      favPage.querySelectorAll('.item-news__article')
    );

    arrayHomePageCards.forEach(card => {
      const cardBtn = card.querySelector('.item-news__add-text');
      const cardHeartImg = card.querySelector('.item-news__icon');
      const cardTitle = card.querySelector('.item-news__title');
      cardsArray.forEach(({ title }) => {
        if (title === cardTitle.textContent.trim()) {
          cardBtn.textContent = 'Remove from favorite';
          cardHeartImg.classList.add('is-saved');
        }
      });
    });
  }
}

export function findReadCards(link) {
  if (onGetCookie('user')) {
    const userId = onGetCookie('user');
    findReadDataBase(userId);
  } else {
    if (load('readCards')) {
      const cardsArray = load('readCards');
      findReadLocalStorage(link, cardsArray);
    }
  }
}

function findReadLocalStorage(link, array) {
  const arrayHomePageCards = Array.from(
    link.querySelectorAll('.item-news__article')
  );

  arrayHomePageCards.forEach(card => {
    const cardStatus = card.querySelector('.item-news__already-read');
    const cardTitle = card.querySelector('.item-news__title');
    array.forEach(({ title }) => {
      if (title === cardTitle.textContent.trim()) {
        cardStatus.classList.add('is-read');
        card.classList.add('is-ghost');
      }
    });
  });
}

function findReadDataBase(userId) {
  const dbRef = ref(getDatabase());

  get(child(dbRef, `users/${userId}/readCards`))
    .then(snapshot => {
      if (snapshot.exists()) {
        const cardsObject = snapshot.val();
        findReadLocalStorage(cardsObject);
      }
    })
    .catch(error => {
      console.error(error);
    });
}
