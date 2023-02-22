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
  findFavoriteCards();
}

refs.favPage.addEventListener('click', handleClickGallery);

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
  const newsList = document.createElement('ul');
  newsList.classList.add('list-news');
  newsList.classList.add('favorite-flex-start');

  const renderedNewsArray = array.map(el => {
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
              <div class='item-news__already-read'>
                <span class='item-news__already-read-text'>Already read</span>
                <svg class='item-news__icon' width='18' height='18'>
                  <use class='item-news__check-icon' href='./img/sprite-icons.svg#icon-done'></use>
                </svg>
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

  newsList.insertAdjacentHTML('beforeend', renderedNewsArray.join(''));
  isEmptyPage(newsList);
}

function isEmptyPage(newsList) {
  if (newsList.hasChildNodes()) {
    refs.favPage.appendChild(newsList);
  } else {
    refs.emptyPage.classList.add('is-show');
  }
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
      refs.favPage.querySelectorAll('.item-news__article')
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

import './js/components/theme';

import './js/components/burger-menu';
// import './js/components/input';

// import './js/components/read';
// import './js/components/weather';

// import './js/components/dataBase/auth';
// import './js/components/dataBase/setDatabase';
// import './js/components/dataBase/register';
// import './js/components/dataBase/modal';
// import './js/components/dataBase/authForm';
// import './js/components/renderMostPopular';
// import './js/common/markup_template';
