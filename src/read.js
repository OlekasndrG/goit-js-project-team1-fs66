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
  isEmptyPage();
  findFavoriteCards();
}

refs.readPage.addEventListener('click', handleClickGallery);

function handleClickGallery(e) {
  e.preventDefault();
  const targetElement = e.target;

  const favoritesLocal = load('favCards') || [];

  if (targetElement.nodeName === 'P' || targetElement.nodeName === 'DIV') {
    const card = targetElement.closest('.item-news__article');
    const cardImg = card.querySelector('.item-news__img');
    const cardSection = card.querySelector('.item-news__category');
    const cardTitle = card.querySelector('.item-news__title');
    const cardDescr = card.querySelector('.item-news__description');
    const carDate = card.querySelector('.item-news__info-date');
    const readMore = card.querySelector('.item-news__info-link');

    const cardBtn = card.querySelector('.item-news__add-text');
    const cardHeartImg = card.querySelector('.item-news__icon');
    cardHeartImg.classList.add('is-saved');
    cardBtn.textContent = 'Remove from favorite';

    const cardObject = {
      image: cardImg.src.trim(),
      section: cardSection.textContent.trim(),
      title: cardTitle.textContent.trim(),
      limitString: cardDescr.textContent.trim(),
      date: carDate.textContent.trim(),
      url: readMore.href.trim(),
    };

    const indexArray = favoritesLocal.map(el => el.title);
    const index = indexArray.indexOf(cardTitle.textContent.trim());

    if (!cardTitle) return;

    if (index == -1) {
      favoritesLocal.push(cardObject);
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
    const newsArray = array[date];

    const accordion = makeAccordionMarkup();
    const title = makeTitleMarkup(date);
    const arrow = makeArrowMarkUp();
    const content = makeContentMarkup();
    const border = makeBorderMarkUp();

    const renderedNewsArray = newsArray.map(el => {
      const { image, section, title, limitString, date, url } = el;
      return `<li class="list-news__item">
        <article class="item-news__article">
            <div class="item-news__wrapper-img">
                <img class="item-news__img" src="${image}" alt="">
                <p class="item-news__category">${section}</p>
                <div class="item-news__add-to-favorite">
                <p class="item-news__add-text">Add to favorite</p>
               	<svg class='item-news__icon' viewBox="0 0 30 32">
									<path stroke="#4440F7" style="stroke: var(--color3, #4440F7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2" d="M9.334 4c-3.682 0-6.668 2.954-6.668 6.6 0 2.942 1.168 9.926 12.652 16.986 0.194 0.12 0.43 0.191 0.682 0.191s0.488-0.071 0.688-0.194l-0.006 0.003c11.484-7.060 12.652-14.044 12.652-16.986 0-3.646-2.986-6.6-6.668-6.6-3.68 0-6.666 4-6.666 4s-2.986-4-6.666-4z"></path>
					      </svg>
              </div>
						</div>
              <div class='item-news__already-read is-read'>
                <span class='item-news__already-read-text'>Have Read</span>
              </div>
            <div class="item-news__wrapper-text">
                <h2 class="item-news__title">
                ${title}
                </h2>
                <p class="item-news__description">
                ${limitString}</p>
            </div>
            <div class="item-news__info">
                <span class="item-news__info-date">
                ${date}
                </span>
                <a class="item-news__info-link" href="${url}#">Read more</a>
            </div>
        </article>
    </li>`;
    });

    title.append(arrow);
    content.insertAdjacentHTML('beforeend', renderedNewsArray.join(''));

    accordion.appendChild(title);
    accordion.appendChild(border);
    accordion.appendChild(content);
    accordionByDate.appendChild(accordion);

    const titleArrayRef = accordion.querySelectorAll('.accordion__title');
    ListenAllTitleClick(titleArrayRef);
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
				findFavoriteCards();
      } else {
        console.log('No data available');
      }
    })
    .catch(error => {
      console.error(error);
    });
}

function cardsByDate(array) {
  // console.log(array);
  const decrSortedDates = array.sort(
    (a, b) => new Date(b.watchDate) - new Date(a.watchDate)
  );

  return decrSortedDates.reduce((acc, card) => {
    const date = new Date(card.watchDate).toLocaleDateString('en-GB', {
      year: 'numeric',
      day: 'numeric',
      month: 'numeric',
    });

    if (acc[date]) {
      acc[date].push(card);
    } else {
      acc[date] = [card];
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

// function cleanLabelFromHomePage(cards) {
//   cards.forEach(el => {
//     el.classList.remove('is-ghost');
//     const cardStatus = el.querySelector('.item-news__already-read');
//   });
// }

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
      const cardHeartImg = card.querySelector('.item-news__icon');
      const cardTitle = card.querySelector('.item-news__title');
			cardsArray.forEach(({ title }) => {
				console.log(title);
        if (title === cardTitle.textContent.trim()) {
          cardBtn.textContent = 'Remove from favorite';
          cardHeartImg.classList.add('is-saved');
        }
      });
    });
  }
}
