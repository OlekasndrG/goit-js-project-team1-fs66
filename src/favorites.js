import { getAuth } from 'firebase/auth';
import { load, save } from './js/common/local_storage';
// import { onGetCookie } from './js/components/dataBase/getCookie';
// import { getDatabase, ref, child, get } from 'firebase/database';
// import { initializeApp } from 'firebase/app';

// const firebaseConfig = {
//   apiKey: 'AIzaSyCAzOEobkX7zjzKcWCZNu8dhUnsurUUSAw',
//   authDomain: 'news-goit-1.firebaseapp.com',
//   databaseURL:
//     'https://news-goit-1-default-rtdb.europe-west1.firebasedatabase.app',
//   projectId: 'news-goit-1',
//   storageBucket: 'news-goit-1.appspot.com',
//   messagingSenderId: '618434101899',
//   appId: '1:618434101899:web:58e5277fd4ec3d55f6ca8e',
//   measurementId: 'G-7YDFYWJH4S',
// };

// const app = initializeApp(firebaseConfig);

const refs = {
  favPage: document.querySelector('.favotire-page-gallery'),
};

// if (onGetCookie('user')) {
//   const auth = getAuth(app);
//   const userId = onGetCookie('user');
//   renderCardsDatabase(userId);
// } else {
if (load('favCards')) {
  renderCards(load('favCards'));
}
// }

refs.favPage.addEventListener('click', handleClickGallery);

function handleClickGallery(e) {
  e.preventDefault();
  const targetElement = e.target;

  const favoritesLocal = load('favCards') || [];

  if (targetElement.nodeName === 'BUTTON') {
    const card = targetElement.closest('.news-card');
    const cardBtn = card.querySelector('.news-card__btn');
    const cardTitle = card.querySelector('.news-card__title');
    cardBtn.textContent = 'Remove from favorites';
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
      cardBtn.textContent = 'Add to favorites';
    }

    save('favCards', favoritesLocal);
  }
}

function renderCards(array) {
  const cardsMarup = array.map(el => Object.values(el)[0]);
  refs.favPage.insertAdjacentHTML('beforeend', cardsMarup.join(''));
}

// function renderCardsDatabase(userId) {
//   const dbRef = ref(getDatabase());
//   get(child(dbRef, `users/${userId}/favCards`))
//     .then(snapshot => {
//       if (snapshot.exists()) {
//         const cardsObject = snapshot.val();
//         const cardsArray = Object.values(cardsObject).flat();
//         renderCards(cardsArray);
//       } else {
//         console.log('No data available');
//       }
//     })
//     .catch(error => {
//       console.error(error);
//     });
// }
