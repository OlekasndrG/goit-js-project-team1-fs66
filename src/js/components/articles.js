import { load, save } from '../common/local_storage';
import api from '../common/API';
import paginator from './pagination.js';
import PaginationSearchHandler from './paginationSearchHandler.js';
import { writeUserCards } from './dataBase/setDatabase';
import { onGetCookie } from './dataBase/getCookie';
import { getDatabase, ref, child, get } from 'firebase/database';
import {
  findFavoriteCards,
  findReadCards,
  cleanLocalStorageFav,
	saveCardsReadHistory,
	makeUniqueArrayByKey,
} from './findCardsInBase';

const data = {
  readCardsArray: [],
};

cleanLocalStorageFav();

export const newsListRef = document.querySelector('.list-news');

newsListRef.addEventListener('click', handleClickGallery);

function handleClickGallery(e) {
  e.preventDefault();
  const targetElement = e.target;

  if (targetElement.nodeName === 'A') {
    const date = new Date(Date.now()).toISOString();
    const card = targetElement.closest('.item-news__article');
    const cardImg = card.querySelector('.item-news__img');
    const cardSection = card.querySelector('.item-news__category');
    const cardTitle = card.querySelector('.item-news__title');
    const cardDescr = card.querySelector('.item-news__description');
    const carDate = card.querySelector('.item-news__info-date');
    const readMore = card.querySelector('.item-news__info-link');

    const cardStatus = card.querySelector('.item-news__already-read');
    card.classList.add('is-ghost');
    cardStatus.classList.add('is-read');

    const cardObject = {
      image: cardImg.src.trim(),
      section: cardSection.textContent.trim(),
      title: cardTitle.textContent.trim(),
      limitString: cardDescr.textContent.trim(),
      date: carDate.textContent.trim(),
      url: readMore.href.trim(),
      watchDate: date,
    };

    data.readCardsArray.push(cardObject);

    const uniqueReadNewsArray = makeUniqueArrayByKey({
      key: 'title',
      array: data.readCardsArray,
    });

    saveCardsReadHistory('readCards', uniqueReadNewsArray);
  }

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

// Кінець----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// const KEY = 'lN1jAQVvVGOPSqcIQoMHMLLJA9oE1Rka';
// const MOST_POPULAR_NEWS = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${KEY}`;

// async function getPopularArticle() {
//   const articleFetch = await fetch(MOST_POPULAR_NEWS);
//   const articles = await articleFetch.json();
//   let { results } = articles;
//   // console.log(results);

//   const articlesCardsArr = results
//     .map(
//       ({
//         id,
//         media,
//         title,
//         published_date,
//         abstract,
//         url,
//         section,
//       }) => `<li class='articles-list-item' id='${id}'>
//     <article class='articles-item-news'>

//             <div class='articles-news-wrapper'>
//                 <img class='articles-img-news'  src='${media}' alt=''/>
//                 <p class="articles-news-category">${section}</p>
//                 <button type='button'>
//                     <span> add favorite
//                         <svg></svg>
//                     </span>
//                 </button>
//             </div>

//             <div>
//                 <h2 class='articles-tittle-news'>${title}</h2>
//                 <p class='articles-text-news'>${abstract}</p>
//             </div>

//             <div>
//                 <span class='articles-date-news'>${published_date
//                   .split('')
//                   .splice(0, 10)
//                   .join('')
//                   .replaceAll('-', '/')}</span>
//                 <a target='blank' class='articles-link-news'  href='${url}'>Read more</a>
//             </div>
//     </article>
// </li>`
//     )
//     .join(' ');

//   findFavoriteCards();
//   findReadCards();
//   updateNewArticles(articlesCardsArr);
// }

// getPopularArticle();

// function updateNewArticles(articlesCardsArr) {
//   document.querySelector('.country-list').innerHTML = articlesCardsArr;
// }

// ------------------------приклад використання Pagination-----------------

// async function searchExample() {
//   // Приклад onSearch

//   // Взяти поточне значення с форми пошуку та дату з календаря.
//   const apiParams = { q: 'Corgi', date: null };

//   function onPageChanged(articles) {
//     //Тут ми отримаємо статті для поточної сторінкі на пагінаторі,
//     // в цьому місці можна їх рендерети
//     console.log(articles);
//   }

//   // передати метод API та поточні параметри, Paginator буде викликати API при навігації на наступну сторінку
//   const options = {
//     perPage: 8,
//     api: {
//       method: api.articleSearchByQuery,
//       params: apiParams,
//       // Якщо ми працюємо з пошуком, то обовязково передати цей параметр.
//       // Search дуже специфічне API, тому це потрібно, щоб не писати другий вид пагінатора
//       externalHandler: new PaginationSearchHandler()
//     },
//     onPageChanged: onPageChanged,
//   };

//   // Виклик методу paginate з нашими параметрами
//   paginator.paginate(options);
// }

// // searchExample()

// async function categoryExample() {

//   // Отримати поточну категорію та дату
//   const apiParams = { category: 'arts', date: null };

//   function onPageChanged(articles) {
//     // Тут ми отримаємо статті для поточної сторінкі на пагінаторі,
//     // в цьому місці можна їх рендерети
//     console.log(articles);
//   }

//   // передати метод API та поточні параметри, Paginator буде викликати API при навігації на наступну сторінку
//   const options = {
//     perPage: 8,
//     api: {
//       method: api.articleSearchByCategory,
//       params: apiParams,
//     },
//     onPageChanged: onPageChanged,
//   };

//   // Виклик методу paginate з нашими параметрами
//   paginator.paginate(options);
// }

// //categoryExample();

// async function mostPopularExample() {
//   // Цей метод API дуже простий, він завжди повератє 20 записів.
//   // Тому тут ми робимо pagination ніби-то це простий array
//   // Попередньо отримавши усі можливі результати одним запросом

//   const result = await api.articleSearchMostPopular();

//   function onPageChanged(articles) {
//     // Тут ми отримаємо статті для поточної сторінкі на пагінаторі,
//     // в цьому місці можна їх рендерети
//     console.log(articles);
//   }

//   // створити Paginator
//   const options = { perPage: 8, items: result.articles, onPageChanged: onPageChanged }
//   // Виклик методу paginate з нашими параметрами
//   paginator.paginate(options);
// }

// mostPopularExample()
