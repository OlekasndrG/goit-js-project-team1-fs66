import { load } from './js/common/local_storage';

const refs = {
  readPage: document.querySelector('.read-page-gallery'),
};

if (load('cards')) {
  const newsCardArray = cardsByDate(load('cards'));
  makeCardsTemplate(newsCardArray);
}

function makeCardsTemplate(array) {
  const datesArray = Object.keys(array);
  const decrSortedDates = datesArray.sort((a, b) => new Date(b) - new Date(a));

  const accordionGallery = makeAccordionGalleryMarkup();

  for (let date of decrSortedDates) {
    const news = array[date];
    const parsedDatesToString = new Date(date).toLocaleDateString('en-GB');

    const accordion = makeAccordionMarkup();
    const title = makeTitleMarkup(parsedDatesToString);
    const arrow = makeArrowMarkUp();
    const content = makeContentMarkup();

    title.append(arrow);
    content.insertAdjacentHTML('beforeend', news.join(''));
    accordion.appendChild(title);
    accordion.appendChild(content);
    accordionGallery.appendChild(accordion);

    const titleArrayRef = accordion.querySelectorAll('.accordion__title');
    ListenAllTitleClick(titleArrayRef);

    const cardStatusRef = content.querySelectorAll('.news-card__status');
    changeCardStatus(cardStatusRef);
  }
  refs.readPage.appendChild(accordionGallery);
}

function cardsByDate(array) {
  return array.reduce((acc, card) => {
    const { card: newsCard } = card;
    const date = new Date(card.watchDate).toLocaleDateString({
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

function makeAccordionGalleryMarkup() {
  const accordionGallery = document.createElement('div');
  accordionGallery.classList.add('accordion__gallery');
  return accordionGallery;
}

function makeAccordionMarkup() {
  const accordion = document.createElement('div');
  accordion.classList.add('accordion');
  return accordion;
}

function makeTitleMarkup(textContent) {
  const title = document.createElement('h2');
  title.classList.add('accordion__title');
  title.textContent = textContent;
  return title;
}

function makeArrowMarkUp() {
  const arrow = document.createElement('div');
  arrow.classList.add('accordion__arrow');
  arrow.classList.add('accordion__arrow--up');
  return arrow;
}

function makeContentMarkup() {
  const content = document.createElement('div');
  content.classList.add('accordion__content');
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
  const arrowRef = e.target.querySelector('.accordion__arrow');
  const bodyREf = e.target.nextSibling;

  if (arrowRef.classList.contains('accordion__arrow--up')) {
    arrowRef.classList.replace(
      'accordion__arrow--up',
      'accordion__arrow--down'
    );
    bodyREf.classList.add('is-active');
  } else {
    arrowRef.classList.replace(
      'accordion__arrow--down',
      'accordion__arrow--up'
    );
    bodyREf.classList.remove('is-active');
  }
}
