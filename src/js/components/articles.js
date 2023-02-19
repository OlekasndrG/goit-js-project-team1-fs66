import { newsAPI } from './fetchNews';
import { load, save } from '../common/local_storage';

// !!!!!!!!!!!!!!!!!!!!!! код що ничже - це є для тесту, що сформувати різні дати прочитання, кожний раз коли буде перезагружатись сторінка home він буде перезаписувати localStorage кодом що нижче
const testLocalArray = [
  {
    watchDate: '2023-02-17T10:21:24.890Z',
    card: `<div class="news-card">
			<p class="news-card__status">Already read<p>
				<img src="https://static01.nyt.com/images/2023/02/16/multimedia/16sbf-bail-lbmc/16sbf-bail-lbmc-thumbStandard.jpg" class="news-card__img">
				<h2 class="news-card__title">Judge Signals Jail Time if Bankman-Fried’s Internet Access Is Not Curbed</h2>
				<p class="news-card__description">The defendant in a widespread cryptocurrency fraud case has been living in a “garden of electronic devices,” the judge says. Tighter restrictions are ahead.</p>
				<p class="news-card__date">2023-02-16</p>
				<a href="https://www.nytimes.com/2023/02/16/business/bankman-fried-crypto-fraud-bail.html" class="news-card__link">Read more</a>
			</div>`,
  },
  {
    watchDate: '2023-02-15T10:21:24.890Z',
    card: `<div class="news-card">
			<p class="news-card__status">Already read<p>
				<img src="https://static01.nyt.com/images/2023/02/16/business/ai-text-detection-promo/ai-text-detection-promo-thumbStandard.jpg" class="news-card__img">
				<h2 class="news-card__title">How ChatGPT Could Embed a ‘Watermark’ in the Text It Generates</h2>
				<p class="news-card__description">An arms race is underway to build more advanced artificial intelligence models like ChatGPT. So is one to build tools to determine whether something was written by A.I.</p>
				<p class="news-card__date">2023-02-17</p>
				<a href="https://www.nytimes.com/interactive/2023/02/17/business/ai-text-detection.html" class="news-card__link">Read more</a>
			</div>`,
  },
  {
    watchDate: '2023-02-15T10:21:24.890Z',
    card: `<div class="news-card">
			<p class="news-card__status">Already read<p>
				<img src="https://static01.nyt.com/images/2023/02/17/business/17stocks-promo/17stocks-promo-thumbStandard.png" class="news-card__img">
				<h2 class="news-card__title">Why a Strong Economy Is Making Stock Investors Jittery</h2>
				<p class="news-card__description">After stocks jumped more than 6 percent in January, the tone shifted markedly this week as a steady flow of data showed the economy continued to run hot.</p>
				<p class="news-card__date">2023-02-17</p>
				<a href="https://www.nytimes.com/2023/02/17/business/stock-market-economy.html" class="news-card__link">Read more</a>
			</div>`,
  },
  {
    watchDate: '2023-02-16T10:21:24.890Z',
    card: `<div class="news-card">
			<p class="news-card__status">Already read<p>
				<img src="https://static01.nyt.com/images/2023/02/18/business/17newworld-gpt-print1/00newworld-gpt-thumbStandard.jpg" class="news-card__img">
				<h2 class="news-card__title">Why China Didn’t Invent ChatGPT</h2>
				<p class="news-card__description">The state’s hardening censorship and heavier hand have held back its tech industry; so has entrepreneurs’ reluctance to invest for the long term. It wasn’t always that way.</p>
				<p class="news-card__date">2023-02-17</p>
				<a href="https://www.nytimes.com/2023/02/17/business/china-chatgpt-microsoft-openai.html" class="news-card__link">Read more</a>
			</div>`,
  },
];
// кінець тестового коду-----------------------------------------------------------------------------------------------------------------------------------

// особистий фетч для тесту, він не потрібний та на функціонал read page не впливає, окрім data об'єкту. В ньому зберігається у властивості cardsArray прочитані статті. 1 та 2 властивості для кастомного фетчу - не потрібні.

const newsFetch = new newsAPI();

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const data = {
  source: 'nyt',
  section: 'business',
  cardsArray: [],
};
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------

const refs = {
  homePageGallery: document.querySelector('.section__list-news'),
};

newsFetch.fetchNews(data).then(makeArrayOfNewsData).catch(console.log);

function makeArrayOfNewsData(response) {
  const arrayOfObject = response.results.map(el => {
    const {
      title,
      thumbnail_standard: imgUrl,
      created_date,
      abstract: description,
      url: readMore,
    } = el;
    const date = created_date.slice(0, 10);
    return { title, imgUrl, date, description, readMore };
  });
  const arrayOfCardTemplate = arrayOfObject.map(el => {
    const { title, imgUrl, date, description, readMore } = el;
    const template = `
			<div class="news-card">
				<p class="news-card__status"><p>
				<img src="${imgUrl}" class="news-card__img">
				<h2 class="news-card__title">${title}</h2>
				<p class="news-card__description">${description}</p>
				<p class="news-card__date">${date}</p>
				<a href="${readMore}" class="news-card__link">Read more</a>
			</div>
		`;

    return template;
  });

  refs.homePageGallery.insertAdjacentHTML(
    'beforeend',
    arrayOfCardTemplate.join(' ')
  );

  //  цейц код перезаписує local Storage після перезагрузки сторінки Home--------------------------------------------------------------------------------------------------
  save('cards', testLocalArray);
  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
}

// кінець кастомного фетчу----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// запис коду у local storage. З коду вище потрібний тільки data об'єкт із cardsArray властивістю

refs.homePageGallery.addEventListener('click', handleClickGallery);

function handleClickGallery(e) {
  e.preventDefault();
  const targetElement = e.target;

  if (targetElement.nodeName === 'A') {
    const date = new Date(Date.now());
    const card = targetElement.closest('.news-card');
    const cardStatus = card.querySelector('.news-card__status');
    cardStatus.textContent = 'Already read';

    const stringifyCard = card.outerHTML;

    data.cardsArray.push({ watchDate: date, card: stringifyCard });
  }

  const uniqueNewsCardsArray = makeUniqueArrayByKey({
    key: 'card',
    array: data.cardsArray,
  });

  saveCardsToLocalStorage(uniqueNewsCardsArray);
}

function saveCardsToLocalStorage(array) {
  if (!load('cards')) {
    save('cards', array);
  } else {
    const cardsFromLocal = load('cards').concat(array);
    const uniqueConcatedArray = makeUniqueArrayByKey({
      key: 'card',
      array: cardsFromLocal,
    });

    save('cards', uniqueConcatedArray);
  }
}

function makeUniqueArrayByKey({ key, array }) {
  return [...new Map(array.map(item => [item[key], item])).values()];
}

// Кінець----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
