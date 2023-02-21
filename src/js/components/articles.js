import { load, save } from '../common/local_storage';
import api from '../common/API';
import paginator from './pagination.js';
import PaginationSearchHandler from './paginationSearchHandler.js';
import { writeUserCards } from './dataBase/setDatabase';
import { onGetCookie } from './dataBase/getCookie';
import { getDatabase, ref, child, get } from 'firebase/database';
export { findFavoriteCards };

const data = {
  source: 'nyt',
  section: 'business',
  readCardsArray: [],
};

const refs = {
  newsList: document.querySelector('.list-news'),
};

function findFavoriteCards() {
  if (load('favCards')) {
    const cardsArray = load('favCards');
    const arrayHomePageCards = Array.from(
      refs.newsList.querySelectorAll('.item-news__article')
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

function findReadCards() {
  if (onGetCookie('user')) {
    const userId = onGetCookie('user');
    findReadDataBase(userId);
  } else {
    if (load('readCards')) {
      const cardsArray = load('readCards');
      findReadLocalStorage(cardsArray);
    }
  }
}

function findReadLocalStorage(array) {
  const arrayHomePageCards = Array.from(
    refs.newsList.querySelectorAll('.item-news__article')
  );

  arrayHomePageCards.forEach(card => {
    const cardStatus = card.querySelector('.item-news__already-read');
    const cardTitle = card.querySelector('.item-news__title');
    array.forEach(({ title }) => {
      if (title === cardTitle.textContent) {
        cardStatus.classList.add('is-read');
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
        console.log('yes');
      }
    })
    .catch(error => {
      console.error(error);
    });
}

refs.newsList.addEventListener('click', handleClickGallery);

function handleClickGallery(e) {
  e.preventDefault();
  const targetElement = e.target;

  if (targetElement.nodeName === 'A') {
    const date = new Date(Date.now()).toISOString();
    const card = targetElement.closest('.list-news__item');
    const cardStatus = card.querySelector('.item-news__already-read');
    const cardTitle = card.querySelector('.item-news__title');
    cardStatus.classList.add('is-read');

    const stringifyCard = card.outerHTML;
    data.readCardsArray.push({
      watchDate: date,
      card: stringifyCard,
      title: cardTitle.textContent,
    });

    const uniqueReadNewsArray = makeUniqueArrayByKey({
      key: 'card',
      array: data.readCardsArray,
    });

    saveCardsReadHistory('readCards', uniqueReadNewsArray);
  }

  const favoritesLocal = load('favCards') || [];

  if (targetElement.nodeName === 'P') {
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
}

function saveCardsReadHistory(key, array) {
  if (onGetCookie('user')) {
    const userId = onGetCookie('user');
    mergeDbAndCurrentData(userId, array, key);
  } else {
    if (!load(key)) {
      save(key, array);
    } else {
      const cardsFromLocal = load(key).concat(array);
      const uniqueConcatedArray = makeUniqueArrayByKey({
        key: 'card',
        array: cardsFromLocal,
      });
      save(key, uniqueConcatedArray);
    }
  }
}

function mergeDbAndCurrentData(userId, array, key) {
  const dbRef = ref(getDatabase());

  get(child(dbRef, `users/${userId}/${key}`))
    .then(snapshot => {
      if (snapshot.exists()) {
        const cardsObject = snapshot.val();

        setDataToDatabase({
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

function setDataToDatabase({ userId, dbData, currentData, key }) {
  const cardsArray = Object.values(dbData).flat().concat(currentData);
  const uniqueConcatedArray = makeUniqueArrayByKey({
    key: 'card',
    array: cardsArray,
  });
  writeUserCards(userId, { [key]: uniqueConcatedArray });
}

function makeUniqueArrayByKey({ key, array }) {
  return [...new Map(array.map(item => [item[key], item])).values()];
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
