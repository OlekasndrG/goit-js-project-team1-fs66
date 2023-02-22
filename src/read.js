import { getAuth } from 'firebase/auth';
import './js/components/burger-menu';
import './js/components/theme';
import { load, save } from './js/common/local_storage';
import { onGetCookie } from './js/components/dataBase/getCookie';
import { getDatabase, ref, child, get } from 'firebase/database';
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

cleanLocalStorageFav();

const app = initializeApp(firebaseConfig);

const refs = {
  readPage: document.querySelector('.read-page-gallery'),
  emptyPage: document.querySelector('.empty-page'),
};

if (onGetCookie('user')) {
  const auth = getAuth(app);
  const userId = onGetCookie('user');
  renderCardsDatabase(userId);
} else {
  if (load('readCards')) {
    renderCards(load('readCards'));
  }
  findFavoriteCards();

  isEmptyPage();
}

refs.readPage.addEventListener('click', handleClickGallery);

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
  const newsCardArray = cardsByDate(array);
  renderCardsTemplate(newsCardArray);
}

function renderCardsTemplate(array) {
  const datesArray = Object.keys(array);
  const accordionByDate = makeAccordionByDateMarkup();

  for (let date of datesArray) {
    const news = array[date];

    const accordion = makeAccordionMarkup();
    const title = makeTitleMarkup(date);
    const arrow = makeArrowMarkUp();
    const content = makeContentMarkup();
    const border = makeBorderMarkUp();

    title.append(arrow);
    content.insertAdjacentHTML('beforeend', news.join(''));

    const cardBtn = content.querySelector('.item-news__add-text');
    const cardHeartImg = content.querySelector('.item-news__heart-icon');
    const cards = content.querySelectorAll('.list-news__item');

    cleanLabelFromHomePage(cards);
    cardBtn.textContent = 'Add to favorite';
    cardHeartImg.classList.remove('is-saved');

    accordion.appendChild(title);
    accordion.appendChild(border);
    accordion.appendChild(content);
    accordionByDate.appendChild(accordion);

    const titleArrayRef = accordion.querySelectorAll('.accordion__title');
    ListenAllTitleClick(titleArrayRef);

    const cardStatusRef = content.querySelectorAll('.item-news__already-read');
    changeCardStatus(cardStatusRef);
  }
  refs.readPage.appendChild(accordionByDate);
}

function renderCardsDatabase(userId) {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `users/${userId}/readCards`))
    .then(snapshot => {
      if (snapshot.exists()) {
        const cardsObject = snapshot.val();
        const cardsArray = Object.values(cardsObject).flat();
        renderCards(cardsArray);
      } else {
        console.log('No data available');
      }
    })
    .catch(error => {
      console.error(error);
    });
}

function cardsByDate(array) {
  const decrSortedDates = array.sort(
    (a, b) => new Date(b.watchDate) - new Date(a.watchDate)
  );

  return decrSortedDates.reduce((acc, card) => {
    const { card: newsCard } = card;

    const date = new Date(card.watchDate).toLocaleDateString('en-GB', {
      year: 'numeric',
      day: 'numeric',
      month: 'numeric',
    });

    if (acc[date]) {
      acc[date].push(newsCard);
    } else {
      acc[date] = [newsCard];
    }

    return acc;
  }, {});
}

function isEmptyPage() {
  const content = document.querySelector('.accordion__content');

  if (!content) {
    console.log('yes');
    refs.emptyPage.classList.add('is-show');
  }
}

function makeAccordionByDateMarkup() {
  const accordionByDate = document.createElement('div');
  accordionByDate.classList.add('accordion__by-date');
  return accordionByDate;
}

function makeAccordionMarkup() {
  const accordion = document.createElement('div');
  accordion.classList.add('accordion');
  return accordion;
}

function makeTitleMarkup(textContent) {
  const title = document.createElement('h2');
  title.classList.add('accordion__title');
  title.classList.add('container');
  title.textContent = textContent;
  return title;
}

function makeArrowMarkUp() {
  const arrow = document.createElement('div');
  arrow.classList.add('accordion__arrow');
  arrow.classList.add('accordion__arrow--up');
  return arrow;
}

function makeBorderMarkUp() {
  const border = document.createElement('div');
  border.classList.add('accordion__border');
  return border;
}

function makeContentMarkup() {
  const content = document.createElement('ul');
  content.classList.add('accordion__content');
  content.classList.add('container');
  return content;
}

function ListenAllTitleClick(refArray) {
  refArray.forEach(title =>
    title.addEventListener('click', onAccordionTitleClick)
  );
}

function changeCardStatus(array) {
  array.forEach(status => (status.textContent = 'Have read'));
}

function onAccordionTitleClick(e) {
  const targetElement = e.target;
  const accordion = targetElement.closest('.accordion');
  const arrowRef = accordion.querySelector('.accordion__arrow');
  const contentRef = accordion.querySelector('.accordion__content');

  if (arrowRef.classList.contains('accordion__arrow--up')) {
    arrowRef.classList.replace(
      'accordion__arrow--up',
      'accordion__arrow--down'
    );
    contentRef.classList.add('is-active');
  } else {
    arrowRef.classList.replace(
      'accordion__arrow--down',
      'accordion__arrow--up'
    );
    contentRef.classList.remove('is-active');
  }
}

function cleanLabelFromHomePage(cards) {
  cards.forEach(el => {
    el.classList.remove('is-ghost');
    const cardStatus = el.querySelector('.item-news__already-read');
  });
}

function cleanLocalStorageFav() {
  if (load('favCards').length === 0) {
    localStorage.removeItem('favCards');
  }
}

function findFavoriteCards() {
  if (load('favCards')) {
    const cardsArray = load('favCards');
    const arrayHomePageCards = Array.from(
      refs.readPage.querySelectorAll('.item-news__article')
    );

    arrayHomePageCards.forEach(card => {
      const cardBtn = card.querySelector('.item-news__add-text');
      const cardHeartImg = card.querySelector('.item-news__heart-icon');
      const cardTitle = card.querySelector('.item-news__title');
      cardsArray.forEach(({ title }) => {
        if (title === cardTitle.textContent) {
          cardBtn.textContent = 'Remove from favorite';
          cardHeartImg.classList.add('is-saved');
        }
      });
    });
  }
}
