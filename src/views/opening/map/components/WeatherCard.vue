<template>
  <dv-border-Box-7 :color="borderColor" class="top-middle-cmp">
    <div class="weather-title">
      <div class="title-left">
        <div class="title-left1">{{todayDate}} {{todayWeek}}</div>
        <div class="title-left2">{{todayTime}}</div>
      </div>
      <div class="title-right">
        <div style="width: 50%">
          <svg-icon :icon-class="todayWeatherSvg" class="weather-svg1"></svg-icon>
          <span class="weather-text">{{ todayTemp }}­</span>
          <span class="weather-unit">°C</span>
        </div>
        <div style="width: 50%">
          <svg-icon icon-class="湿度-天气" class="weather-svg2"></svg-icon>
          <span class="weather-text">{{ todayHumidity }}</span>
          <span class="weather-unit">%</span>
        </div>
      </div>
    </div>
    <div class="weather-content">
      <h4>未来三天天气预报</h4>
      <div class="weather-forecast">
        <div class="weather-forecast-item">
          <div class="item">{{tomorrowWeek}}</div>
          <div class="item">{{tomorrowDate}}</div>
          <div class="item">
            <svg-icon
              :icon-class="tomorrowWeatherSvg"
              class="weather-forecast-svg"
            ></svg-icon>
          </div>
          <div class="item">{{tomorrowWeather}}</div>
          <div class="item">{{tomorrowNighttemp}}-{{tomorrowDaytemp}}°C</div>
        </div>
        <div class="weather-forecast-item">
          <div class="item">{{tomorrowWeek2}}</div>
          <div class="item">{{tomorrowDate2}}</div>
          <div class="item">
            <svg-icon
              :icon-class="tomorrowWeatherSvg2"
              class="weather-forecast-svg"
            ></svg-icon>
          </div>
          <div class="item">{{tomorrowWeather2}}</div>
          <div class="item">{{tomorrowNighttemp2}}-{{tomorrowDaytemp2}}°C</div>
        </div>
        <div class="weather-forecast-item">
          <div class="item">{{tomorrowWeek3}}</div>
          <div class="item">{{tomorrowDate3}}</div>
          <div class="item">
            <svg-icon
              :icon-class="tomorrowWeatherSvg3"
              class="weather-forecast-svg"
            ></svg-icon>
          </div>
          <div class="item">{{tomorrowWeather3}}</div>
          <div class="item">{{tomorrowNighttemp3}}-{{tomorrowDaytemp3}}°C</div>
        </div>
      </div>
    </div>
  </dv-border-Box-7>
</template>

<script>
import { getLiveWeather, getForecastWeather } from "@/api/weather";
import {formatDate} from '@/utils/date';
export default {
  name: "LeftChart1",
  data() {
    return {
      borderColor: ["rgba(1, 153, 209, 0.5)", "rgba(1, 153, 209, 0.5)"],
      cityCode: "330523",
      todayDate: null,
      todayWeek: null,
      todayTime: null,
      todayTemp: 0,
      todayWeather: null,
      todayWeatherSvg: '',
      todayHumidity: null,

      tomorrowDate: null,
      tomorrowWeek: null,
      tomorrowWeather: null,
      tomorrowWeatherSvg: '',
      tomorrowDaytemp: null,
      tomorrowNighttemp: null,

      tomorrowDate2: null,
      tomorrowWeek2: null,
      tomorrowWeather2: null,
      tomorrowWeatherSvg2: '',
      tomorrowDaytemp2: null,
      tomorrowNighttemp2: null,

      tomorrowDate3: null,
      tomorrowWeek3: null,
      tomorrowWeather3: null,
      tomorrowWeatherSvg3: '',
      tomorrowDaytemp3: null,
      tomorrowNighttemp3: null,
    };
  },
  mounted() {
    let that = this;
    this.timer = setInterval(() => {
      that.todayTime = formatDate(new Date(), 'hh:mm:ss');
    }, 1000)
  },
  created() {
    this.getToday();
    this.getWeather();
  },
  methods: {
    getToday() {
        this.todayDate = formatDate(new Date(), 'yyyy年MM月dd号');
        this.todayTime = formatDate(new Date(), 'hh:mm:ss');
        this.todayWeek = this.getWeekDay(new Date());
        let oneDay = 3600 * 1000 * 24
        this.tomorrowDate = formatDate(new Date(new Date().getTime() + oneDay), 'MM-dd');
        this.tomorrowWeek = this.getWeekDay2(new Date(new Date().getTime() + oneDay));
        this.tomorrowDate2= formatDate(new Date(new Date().getTime() + oneDay * 2), 'MM-dd');
        this.tomorrowWeek2 = this.getWeekDay2(new Date(new Date().getTime() + oneDay * 2));
        this.tomorrowDate3 = formatDate(new Date(new Date().getTime() + oneDay * 3), 'MM-dd');
        this.tomorrowWeek3 = this.getWeekDay2(new Date(new Date().getTime() + oneDay * 3));
    },
    getWeather() {
      getLiveWeather(this.cityCode).then((response) => {
        if (response.status == 200) {
          let data = response.data;
          if ("lives" in data) {
            this.todayTemp = data.lives[0].temperature;
            this.todayWeather = data.lives[0].weather;
            this.todayHumidity = data.lives[0].humidity;
            this.todayWeatherSvg = this.getWeatherSvg(this.todayWeather);
          }
        }
      });
      getForecastWeather(this.cityCode).then((response) => {
        if (response.status == 200) {
          let data = response.data;
          if ("forecasts" in data) {
            this.tomorrowWeather = data.forecasts[0].casts[1].dayweather;
            this.tomorrowWeatherSvg = this.getWeatherSvg(this.tomorrowWeather);
            this.tomorrowDaytemp = data.forecasts[0].casts[1].daytemp;
            this.tomorrowNighttemp = data.forecasts[0].casts[1].nighttemp;
            this.tomorrowWeather2 = data.forecasts[0].casts[2].dayweather;
            this.tomorrowWeatherSvg2 = this.getWeatherSvg(this.tomorrowWeather2);
            this.tomorrowDaytemp2 = data.forecasts[0].casts[2].daytemp;
            this.tomorrowNighttemp2 = data.forecasts[0].casts[2].nighttemp;
            this.tomorrowWeather3 = data.forecasts[0].casts[3].dayweather;
            this.tomorrowWeatherSvg3 = this.getWeatherSvg(this.tomorrowWeather3);
            this.tomorrowDaytemp3 = data.forecasts[0].casts[3].daytemp;
            this.tomorrowNighttemp3 = data.forecasts[0].casts[3].nighttemp;
          }
        }
      });
    },
    getWeekDay(date){
        var week;
        if(date.getDay()==0) week="星期天"
        if(date.getDay()==1) week="星期一"
        if(date.getDay()==2) week="星期二"
        if(date.getDay()==3) week="星期三"
        if(date.getDay()==4) week="星期四"
        if(date.getDay()==5) week="星期五"
        if(date.getDay()==6) week="星期六"
        return week;
    },
    getWeekDay2(date){
        var week;
        if(date.getDay()==0) week="周日"
        if(date.getDay()==1) week="周一"
        if(date.getDay()==2) week="周二"
        if(date.getDay()==3) week="周三"
        if(date.getDay()==4) week="周四"
        if(date.getDay()==5) week="周五"
        if(date.getDay()==6) week="周六"
        return week;
    },
    getWeatherSvg(weather) {
        let weatherSvg = '多云-天气';
        if (weather.indexOf('冰雹') > -1){
            weatherSvg = '冰雹-天气';
        } else if (weather.indexOf('风') > -1){
            weatherSvg = '风-天气';
        } else if (weather.indexOf('沙') > -1){
            weatherSvg = '风-天气';
        } else if (weather.indexOf('霾') > -1){
            weatherSvg = '霾-天气';
        } else if (weather.indexOf('雾') > -1){
            weatherSvg = '雾-天气';
        } else if (weather.indexOf('雪') > -1){
            weatherSvg = '雪-天气';
        } else if (weather.indexOf('雷') > -1) {
            weatherSvg = '雷电-天气';
        } else if (weather.indexOf('雨') > -1) {
            if (weather.indexOf('大') > -1) {
                weatherSvg = '大雨-天气';
            } else {
                weatherSvg = '小雨-天气';
            }
        } else if (weather.indexOf('晴') > -1) {
            weatherSvg = '晴-天气';
        }
        return weatherSvg
    }
  },
};
</script>

<style lang="less">
.top-middle-cmp {
  position: relative;
  padding: 0;
  box-sizing: border-box;

  .weather-title {
    height: 30%;
    font-size: 16px;
    display: flex;
    border-bottom: 1px solid rgba(1, 153, 209, 0.5);
    .title-left {
      width: 50%;
      color: rgba(1, 153, 209, 1);
      text-align: center;
      font-weight: 700;
      .title-left1 {
        margin-top: 15px;
      }
      .title-left2 {
        font-size: 22px;
        margin-top: 4px;
        margin-bottom: 10px;
      }
    }
    .title-right {
      width: 50%;
      display: flex;
      align-items: center;
      padding-right: 5%;
      .weather-svg1 {
        font-size: 32px;
        margin-right: 10px;
      }
      .weather-svg2 {
        font-size: 28px;
        margin-right: 10px;
      }
      .weather-text {
        font-size: 26px;
        margin-right: 2px;
      }
      .weather-unit {
        font-size: 14px;
        margin-top: 10px;
      }
    }
  }

  .weather-content {
    height: 70%;
    padding: 3% 5% 0 5%;
    h4 {
      font-size: 14px;
      color: #05bbdb;
      margin-top: 0;
    }
    .weather-forecast {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      font-size: 10px;
      .weather-forecast-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .item {
          text-align: center;
          margin-bottom: 4px;
          .weather-forecast-svg {
            font-size: 30px;
          }
        }
      }
    }
  }
}
</style>

