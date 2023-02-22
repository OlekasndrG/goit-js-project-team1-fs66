// import API from '../common/weather_API.js';
import {getWeather} from '../common/weather_API'

export async function onRenderWetherCard({lat = "15.482255869480554", lon = '34.91895493757489'}) {
    const Objectcard = await getWeather(lat, lon)
    const {location, temp, weather, date} = Objectcard
    let wetherCard = `
<div class="weather">
  <div class="weather__hat">
    <p class="weather__temperature">${temp}°</p>
    <div class="weather__contain">
      <p class="weather__description">${weather}</p>
      <div class="weather__location">
        <svg class="weather__svg">
          <use href="../img/location.svg#Vector"></use>
        </svg>
        <p class="weather__city">${location}</p>
      </div>
    </div>
  </div>
  <div class="weather__icon">
    <img class="weather__pic" src="" alt="" />
  </div>

  <div class="weather__date">
    <p class="weather__day">
    ${date}
    </p>
  </div>
  <div class="weather__button">
    <button class="weather__btn" type="button">weather for week</button>
  </div>
  </div>
    `;
    
    return wetherCard;
}
