const ulCardList = document.querySelector('.list-news');
import { format, parse } from 'date-fns';

import {onRenderWetherCard} from './weather'
const weatherRef = document.querySelector('.weather')
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
            <div class="item-news__wrapper-img">
                <img class="item-news__img" src="${image}" alt="">
                <p class="item-news__category">${section}</p>
                <div class="item-news__add-to-favorite">
                <p class="item-news__add-text">Add to favorite</p>
                <svg class="item-news__icon" width="16" height="16">
                  <use class="item-news__heart-icon" href="./img/icons_site.svg#icon-heart_wite"></use>
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
                ${format(date, 'yyyy-MM-dd')}
                </span>
                <a class="item-news__info-link" href="${url}#">Read more</a>
            </div>
        </article>
    </li>`;
    if (window.matchMedia("(max-width: 768px)").matches) {
      if (index === 0) {
        return WETHER + MARKUP ;
      }
      return MARKUP;
    } else if(window.matchMedia("(min-width: 768px)").matches && window.matchMedia("(max-width: 1280px)").matches){
      if (index === 0) {
        return MARKUP + WETHER;
      }
      return MARKUP;
    }else{
      if (index === 1) {

        return MARKUP + `<li class="weathers">${WETHER}</li>`;
      }
      return MARKUP;

    }
      
    })
    .join('');
  onMarkupCard(arrayCard);
  findFavoriteCards();
  findReadCards();
}

function onMarkupCard(cards) {


    ulCardList.innerHTML = cards
    window.navigator.geolocation.getCurrentPosition(getGeolocation => {
      const geolocationNew = {
        lat: getGeolocation.coords.latitude,
        lon: getGeolocation.coords.longitude
      }
      
      onRenderWetherCard(geolocationNew).then(dataNew => {

          document.querySelector('.weathers').innerHTML = `${dataNew}`
      })
      
    }, error => {
      console.log("🚀 ~ error:", error);
    });
  }


