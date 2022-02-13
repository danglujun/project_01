import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './element-ui/index.js'
import axios from 'axios'
import { Loading } from 'element-ui'

Vue.config.productionTip = false

axios.defaults.baseURL = 'https://www.escook.cn'
// axios.defaults.baseURL = 'http://localhost:8080'

let loadingInstance = null
axios.interceptors.request.use(config => {
  loadingInstance = Loading.service({ fullscreen: true })
  config.headers.Authorization = 'Beraer xxx'
  console.log(config)
  return config
})
axios.interceptors.response.use(response => {
  loadingInstance.close()
  return response
})
Vue.prototype.$http = axios

const app = new Vue({
  render: h => h(App),
  router
})
app.$mount('#app')
