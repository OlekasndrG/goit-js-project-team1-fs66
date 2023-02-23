import './js/components/theme';
import './js/components/burger-menu';
import './js/components/dataBase/auth';
import './js/components/dataBase/setDatabase';
import './js/components/dataBase/register';
import './js/components/dataBase/modal';
import './js/components/dataBase/authForm';

import { load, save } from './js/common/localStorage';
import './js/components/burger-menu';
import './js/components/theme';
import {
  findFavoriteCards,
  cleanLocalStorageFav,
} from './js/components/findCardsInBase';
import { makeCardObject, onClickReadMoreFav } from './js/components/onReadMore';
import { onGetCookie } from './js/components/dataBase/getCookie';
import { updateUserCards } from './js/components/dataBase/setDatabase';

const refs = {
  favPage: document.querySelector('.favotire-page-gallery'),
  emptyPage: document.querySelector('.empty-page'),
  nameRef: document.getElementById('name'),
  passRef: document.getElementById('pass'),
  emailRef: document.getElementById('email'),
  formRef: document.getElementById('form'),
  buttonLogin: document.getElementById('login'),
  buttonRegistr: document.querySelector('.registr'),
  buttonLogout: document.querySelector('.logout'),
};

cleanLocalStorageFav();

if (load('favCards')) {
  renderCards(load('favCards'));
  findFavoriteCards(refs.favPage);
}

refs.favPage.addEventListener('click', handleClickGallery);

function handleClickGallery(e) {
  const targetElement = e.target;

  if (targetElement.nodeName === 'A') {
    onClickReadMoreFav(targetElement);
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

function renderCards(array) {
  const newsList = document.createElement('ul');
  newsList.classList.add('list-news');
  newsList.classList.add('favorite-flex-start');

  const renderedNewsArray = array.map(el => {
    const { image, section, title, limitString, date, url } = el;
    return `<li class="list-news__item">
												<article class="item-news__article">
													<div class='item-news__already-read'>
														<span class='item-news__already-read-text'>Already read</span>
														<svg class='item-news__icon item-news__icon-check' viewBox="0 0 14 14">
															<path
																d="M16.188 3.594a.6.6 0 0 0-.412.182L6.6 12.952 2.824 9.176a.6.6 0 1 0-.848.848l4.2 4.2a.6.6 0 0 0 .848 0l9.6-9.6a.6.6 0 0 0-.436-1.03Z"
																fill="#00DD73" />
														</svg>
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

  newsList.insertAdjacentHTML('beforeend', renderedNewsArray.join(''));

  isEmptyPage(newsList);
}

function isEmptyPage(newsList) {
  if (newsList.hasChildNodes()) {
    refs.favPage.appendChild(newsList);
    refs.favPage.classList.add('is-favorite');
  } else {
    refs.emptyPage.classList.add('is-show');
    refs.favPage.classList.remove('is-favorite');
  }
}
