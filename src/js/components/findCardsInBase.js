import { load, save } from '../common/local_storage';
import { onGetCookie } from './dataBase/getCookie';
import { getDatabase, ref, child, get } from 'firebase/database';
import { writeUserCards } from './dataBase/setDatabase';

export function findFavoriteCards(favPage) {
  if (load('favCards')) {
    const cardsArray = load('favCards');
    const arrayHomePageCards = Array.from(
      favPage.querySelectorAll('.item-news__article')
    );

    arrayHomePageCards.forEach(card => {
      const cardBtn = card.querySelector('.item-news__add-text');
      const cardHeartImg = card.querySelector('#icon-heart');
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
    const cardContentWrapper = card.querySelector('.item-news__content');
    const cardStatus = card.querySelector('.item-news__already-read');
    const cardTitle = card.querySelector('.item-news__title');
    array.forEach(({ title }) => {
      if (title === cardTitle.textContent.trim()) {
        cardStatus.classList.add('is-read');
        cardContentWrapper.classList.add('is-ghost');
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

export function saveCardsReadHistory(key, array) {
  if (onGetCookie('user')) {
    const userId = onGetCookie('user');
    setDataToDataBase(userId, array, key);
  } else {
    if (!load(key)) {
      save(key, array);
    } else {
      const cardsFromLocal = load(key).concat(array);
      const uniqueConcatedArray = makeUniqueArrayByKey({
        key: 'title',
        array: cardsFromLocal,
      });
      save(key, uniqueConcatedArray);
    }
  }
}

function setDataToDataBase(userId, array, key) {
  const dbRef = ref(getDatabase());

  get(child(dbRef, `users/${userId}/${key}`))
    .then(snapshot => {
      if (snapshot.exists()) {
        const cardsObject = snapshot.val();

        mergeLocalAndBaseData({
          userId,
          dbData: cardsObject,
          currentData: array,
          key,
        });
      } else {
        writeUserCards(userId, { [key]: array });
      }
    })
    .catch(error => {
      console.error(error);
    });
}

function mergeLocalAndBaseData({ userId, dbData, currentData, key }) {
  const cardsArray = Object.values(dbData).flat().concat(currentData);
  const uniqueConcatedArray = makeUniqueArrayByKey({
    key: 'title',
    array: cardsArray,
  });
  writeUserCards(userId, { [key]: uniqueConcatedArray });
}

export function makeUniqueArrayByKey({ key, array }) {
  return [...new Map(array.map(item => [item[key], item])).values()];
}

export function cleanLocalStorageFav() {
  if (load('favCards').length === 0) {
    localStorage.removeItem('favCards');
  }
}
