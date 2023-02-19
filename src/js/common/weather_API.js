import axios from 'axios';

const ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather?';
const API_KEY = 'eb208d9e6f2962fbd904029d1ed12318';

let geoData = null;

getGeolocation();

function getGeolocation() {
  navigator.geolocation.getCurrentPosition(geolocationSuccess, error);
}
async function error() {
  console.log('error');
  console.log(await getWeather());
}

async function geolocationSuccess(succeessGeo) {
  geoData = succeessGeo;

  console.log(await getWeather());
}

async function getWeather() {
  let latitude = 44.34;
  let longitude = 10.99;

  if (geoData !== null) {
    latitude = geoData.coords.latitude;
    longitude = geoData.coords.longitude;
  } else {
    console.log('geo data = null');
  }

  const response = await axios.get(
    `${ENDPOINT}lat=${latitude}&lon=${longitude}&units=metric&lang=en&appid=${API_KEY}`
  );

  return response;
}

export default { getWeather };
