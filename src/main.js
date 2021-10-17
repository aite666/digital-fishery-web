import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import VCharts from 'v-charts'
import BaiduMap from 'vue-baidu-map'
import dataV from '@jiaminghi/data-view'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

import utils from './utils'

Vue.prototype.$utils = utils

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
