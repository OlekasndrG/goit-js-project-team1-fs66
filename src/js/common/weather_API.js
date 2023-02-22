import axios from 'axios';
import { format, parse } from 'date-fns';
import { onRenderWetherCard } from '../components/weather';
// const divRef = 
const ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather?lat=';
const API_KEY = 'eb208d9e6f2962fbd904029d1ed12318';




export async function getWeather(lat, lon) {

  try {
    const data = await axios.get(`${ENDPOINT}${lat}&lon=${lon}&appid=${API_KEY}`)

      const result = {
        location: data.data.name,
        temp: Math.round(data.data.main.temp-273.15),
        weather: data.data.weather[0].main,
        date : format(Date.now(), 'dd MMM yyyy')
    }
    return result
    
  } catch (error) {
}
}

