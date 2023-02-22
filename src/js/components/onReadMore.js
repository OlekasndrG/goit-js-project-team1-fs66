import { saveCardsReadHistory, makeUniqueArrayByKey } from './findCardsInBase';

const data = {
  readCardsArray: [],
};

export function onClickReadMoreHome(targetElement) {
  const card = targetElement.closest('.item-news__article');
  const uniqueCards = takeUniqueCards(card);
  saveCardsReadHistory('readCards', uniqueCards);
  showReadStatus(card);
}

export function onClickReadMoreFav(targetElement) {
  const card = targetElement.closest('.item-news__article');
  const uniqueCards = takeUniqueCards(card);
  saveCardsReadHistory('readCards', uniqueCards);
}

function takeUniqueCards(card) {
  const cardObject = makeCardObject(card);
  data.readCardsArray.push(cardObject);

  return makeUniqueArrayByKey({
    key: 'title',
    array: data.readCardsArray,
  });
}

export function makeCardObject(card) {
  const date = new Date(Date.now()).toISOString();
  const cardImg = card.querySelector('.item-news__img');
  const cardSection = card.querySelector('.item-news__category');
  const cardTitle = card.querySelector('.item-news__title');
  const cardDescr = card.querySelector('.item-news__description');
  const carDate = card.querySelector('.item-news__info-date');
  const readMore = card.querySelector('.item-news__info-link');

  return {
    image: cardImg.src.trim(),
    section: cardSection.textContent.trim(),
    title: cardTitle.textContent.trim(),
    limitString: cardDescr.textContent.trim(),
    date: carDate.textContent.trim(),
    url: readMore.href.trim(),
    watchDate: date.trim(),
  };
}

function showReadStatus(card) {
  const cardStatus = card.querySelector('.item-news__already-read');
  const cardContentWrapper = card.querySelector('.item-news__content');

  cardContentWrapper.classList.add('is-ghost');
  cardStatus.classList.add('is-read');
}
