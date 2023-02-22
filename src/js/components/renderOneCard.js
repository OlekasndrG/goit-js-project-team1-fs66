const ulCardList = document.querySelector('.list-news');
import { format, parse } from 'date-fns';
import { findFavoriteCards, findReadCards } from './findCardsInBase';
import { newsListRef } from './articles';

import { onRenderWetherCard } from './weather';
const weatherRef = document.querySelector('.weather');
export async function onRenderOneCard(arrayNews) {
  const WETHER = await onRenderWetherCard({});

  const arrayCard = arrayNews
    .map((news, index) => {
      const { image, section, title, description, date, url } = news;
      function truncateString(str) {
        return str.length > 75 ? str.slice(0, 75) + '...' : str;
      }
      let limitString = truncateString(description);

      const MARKUP = `<li class="list-news__item">
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
																${format(date, 'yyyy-MM-dd')}
															</span>
															<a class="item-news__info-link" href="${url}#">Read more</a>
														</div>
													</div>
												</article>
											</li>`;
      if (window.matchMedia('(max-width: 768px)').matches) {
        if (index === 0) {
          return WETHER + MARKUP;
        }
        return MARKUP;
      } else if (
        window.matchMedia('(min-width: 768px)').matches &&
        window.matchMedia('(max-width: 1280px)').matches
      ) {
        if (index === 0) {
          return MARKUP + WETHER;
        }
        return MARKUP;
      } else {
        if (index === 1) {
          return MARKUP + `<li class="weathers">${WETHER}</li>`;
        }
        return MARKUP;
      }
    })
    .join('');
  onMarkupCard(arrayCard);
  findFavoriteCards(newsListRef);
  findReadCards(newsListRef);
}

function onMarkupCard(cards) {
  ulCardList.innerHTML = cards;
  window.navigator.geolocation.getCurrentPosition(
    getGeolocation => {
      const geolocationNew = {
        lat: getGeolocation.coords.latitude,
        lon: getGeolocation.coords.longitude,
      };

      onRenderWetherCard(geolocationNew).then(dataNew => {
        document.querySelector('.weathers').innerHTML = `${dataNew}`;
      });
    },
    error => {
      console.log('🚀 ~ error:', error);
    }
  );
}
