import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import common from '@/assets/js/common.js'

Vue.config.productionTip = false
import axios from 'axios'
Vue.prototype.$axios = axios
Vue.prototype.$common = common
Vue.use(Vuex)
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
