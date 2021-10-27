import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import VCharts from 'v-charts'
import BaiduMap from 'vue-baidu-map'
import dataV from '@jiaminghi/data-view'
import AmapVue from '@amap/amap-vue';

import '@/styles/index.scss' // global css
import '@/assets/icofont/icofont.min.css'

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

import utils from './utils'

Vue.prototype.$utils = utils

AmapVue.config.version = '2.0'; // 默认2.0，这里可以不修改
AmapVue.config.key = 'fef2a05990680da15b73af8b400e37c3';
AmapVue.config.plugins = [
  'AMap.ToolBar',
  'AMap.MoveAnimation',
  'AMap.PolyEditor',
  // 在此配置你需要预加载的插件，如果不配置，在使用到的时候会自动异步加载
];
Vue.use(AmapVue);

Vue.use(ElementUI, { locale })
Vue.use(VCharts)
Vue.use(BaiduMap, { ak: 'kex74bEK5m4qBpUDM3TlaXAUGPHFidHp'})
Vue.use(dataV)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
