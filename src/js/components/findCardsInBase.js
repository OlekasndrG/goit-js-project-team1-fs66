import { load, save } from '../common/localStorage';
import { onGetCookie } from './dataBase/getCookie';
import { getDatabase, ref, child, get } from 'firebase/database';
import { writeUserData } from './dataBase/setDatabase';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCAzOEobkX7zjzKcWCZNu8dhUnsurUUSAw',
  authDomain: 'news-goit-1.firebaseapp.com',
  databaseURL:
    'https://news-goit-1-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'news-goit-1',
  storageBucket: 'news-goit-1.appspot.com',
  messagingSenderId: '618434101899',
  appId: '1:618434101899:web:58e5277fd4ec3d55f6ca8e',
  measurementId: 'G-7YDFYWJH4S',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export function findFavoriteCards(newsListRef) {
  if (load('favCards')) {
    const cardsArray = load('favCards');
    const arrayHomePageCards = Array.from(
      newsListRef.querySelectorAll('.item-news__article')
    );

    arrayHomePageCards.forEach(card => {
      const cardTitle = card.querySelector('.item-news__title');
      const cardBtn = card.querySelector('.item-news__add-text');
      const cardHeartImg = card.querySelector('#icon-heart');
      cardsArray.forEach(({ title }) => {
        if (title === cardTitle.textContent.trim()) {
          cardBtn.textContent = 'Remove from favorite';
          cardHeartImg.classList.add('is-saved');
        }
      });
    });
  }
}

export function findReadCards(newsListRef) {
  if (onGetCookie('user')) {
    const userId = onGetCookie('user');
    findReadDataBase(userId, newsListRef);
  } else {
    if (load('readCards')) {
      const cardsArray = load('readCards');
      setAlreadyReadStatus(newsListRef, cardsArray);
    }
  }
}

function findReadDataBase(userId, newsListRef) {
  const dbRef = ref(getDatabase());

  get(child(dbRef, `users/${userId}/readCards`))
    .then(snapshot => {
      if (snapshot.exists()) {
        const cardsObject = snapshot.val();
        setAlreadyReadStatus(newsListRef, cardsObject);
      }
    })
    .catch(error => {
      console.error(error);
    });
}

function setAlreadyReadStatus(newsListRef, array) {
  const arrayHomePageCards = Array.from(
    newsListRef.querySelectorAll('.item-news__article')
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
        const concatedArray = mergeLocalAndBaseData({
          dbData: cardsObject,
          currentData: array,
        });
        writeUserData(userId, { [key]: concatedArray });
      } else {
        writeUserData(userId, { [key]: array });
      }
    })
    .catch(error => {
      console.error(error);
    });
}

function mergeLocalAndBaseData({ dbData, currentData }) {
  const cardsArray = Object.values(dbData).flat().concat(currentData);
  return makeUniqueArrayByKey({
    key: 'title',
    array: cardsArray,
  });
}

export function makeUniqueArrayByKey({ key, array }) {
  return [...new Map(array.map(item => [item[key], item])).values()];
}

export function cleanLocalStorageFav() {
  if (load('favCards').length === 0) {
    localStorage.removeItem('favCards');
  }
}
