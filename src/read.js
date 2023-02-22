import './js/components/burger-menu';
import './js/components/theme';

import { load, save } from './js/common/local_storage';
import { onGetCookie } from './js/components/dataBase/getCookie';
import { getDatabase, ref, child, get } from 'firebase/database';
import {
  findFavoriteCards,
  cleanLocalStorageFav,
} from './js/components/findCardsInBase';
import { makeCardObject } from './js/components/onReadMore';
import { updateUserCards } from './js/components/dataBase/setDatabase';

cleanLocalStorageFav();

const refs = {
  readPage: document.querySelector('.read-page-gallery'),
  emptyPage: document.querySelector('.empty-page'),
  nameRef: document.getElementById('name'),
  passRef: document.getElementById('pass'),
  emailRef: document.getElementById('email'),
  formRef: document.getElementById('form'),
  buttonLogin: document.getElementById('login'),
  buttonRegistr: document.querySelector('.registr'),
  buttonLogout: document.querySelector('.logout'),
};

if (onGetCookie('user')) {
  const userId = onGetCookie('user');
  renderCardsDatabase(userId);
} else {
  if (load('readCards')) {
    renderCards(load('readCards'));
  }
  isEmptyPage();
  findFavoriteCards(refs.readPage);
}

refs.readPage.addEventListener('click', handleClickGallery);

function handleClickGallery(e) {
  const targetElement = e.target;

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
													<div class='item-news__already-read is-read'>
														<span class='item-news__already-read-text'>Have read</span>
													</div>
													<div class="item-news__content">
														<div class="item-news__wrapper-img">
															<img class="item-news__img" src="${image}" alt="">
															<p class="item-news__category">${section}</p>
															<div class="item-news__add-to-favorite">
																<p class="item-news__add-text">Add to favorite</p>
																<svg class='item-news__icon' id='icon-heart' viewBox="0 0 30 32">
																	<path stroke="#4440F7" style="stroke: var(--color3, #4440F7)" stroke-linejoin="round" stroke-linecap="round"
																		stroke-miterlimit="4" stroke-width="2"
																		d="M9.334 4c-3.682 0-6.668 2.954-6.668 6.6 0 2.942 1.168 9.926 12.652 16.986 0.194 0.12 0.43 0.191 0.682 0.191s0.488-0.071 0.688-0.194l-0.006 0.003c11.484-7.060 12.652-14.044 12.652-16.986 0-3.646-2.986-6.6-6.668-6.6-3.68 0-6.666 4-6.666 4s-2.986-4-6.666-4z">
																	</path>
																</svg>
															</div>
														</div>
														<div class="item-news__wrapper-text">
															<h2 class="item-news__title">${title}</h2>
															<p class="item-news__description">${limitString}</p>
														</div>
														<div class="item-news__info">
															<span class="item-news__info-date">
																${date}
															</span>
															<a class="item-news__info-link" target="_blank" href="${url}#">Read more</a>
														</div>
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
        findFavoriteCards(refs.readPage);
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
