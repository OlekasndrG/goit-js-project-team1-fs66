// import API from '../common/weather_API.js';
import {getWeather} from '../common/weather_API'

export async function onRenderWetherCard({lat = "48.452339", lon = '35.027011'}) {
    const Objectcard = await getWeather(lat, lon)
    const {location, temp, weather, weatherIcon, date, day} = Objectcard
    
    let wetherCard = `
<div class="weather">
  <div class="weather__hat">
    <p class="weather__temperature">${temp}°</p>
    <div class="weather__contain">
      <p class="weather__description">${weather}</p>
      <div class="weather__location">

        <p class="weather__city">${location}</p>
      </div>
    </div>
  </div>
  <div class="weather__icon">
    <img class="weather__pic" src="https://openweathermap.org/img/wn/${weatherIcon}@4x.png" alt="${weather}" />
  </div>
    <p class="weather__day">
    <div class="weather__date">
    <p class="weather__day">
    ${day}</br>
    ${date}
    </p>
  </div>
  <div class="weather__button">
  <a class="weather__btn" href="https://ua.sinoptik.ua/">weather for week</a>
  </div>
  </div>
    `;
    
    return wetherCard;
}
