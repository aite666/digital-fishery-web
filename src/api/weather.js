import axios from 'axios'

const amapApi = 'https://restapi.amap.com/v3/weather/weatherInfo';
const amapKey = 'c1b0fc3e2561e58f94074ab68ee341f2';

export function getLiveWeather(cityCode) {
  let url = amapApi + '?key=' + amapKey + '&extensions=base&city=' + cityCode
  return axios.get(url)
}

export function getForecastWeather(cityCode) {
    let url = amapApi + '?key=' + amapKey + '&extensions=all&city=' + cityCode
    return axios.get(url)
  }
