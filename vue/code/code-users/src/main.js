import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { Loading } from 'element-ui'

Vue.config.productionTip = false

// axios.defaults.baseURL = 'https://www.escook.cn'
axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$http = axios
Vue.use(ElementUI)

Vue.filter('dateFormat', dateStr => {
  const dt = new Date(dateStr)
  const y = dt.getFullYear()
  const m = padZero(dt.getMonth() + 1)
  const d = padZero(dt.getDate())
  const hh = padZero(dt.getHours())
  const mm = padZero(dt.getMinutes())
  const ss = padZero(dt.getSeconds())
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

function padZero(n) {
  return n > 9 ? n : '0' + n
}

// 声明请求拦截器
let loadingInstance = null
axios.interceptors.request.use(config => {
  // 展示loading效果
  loadingInstance = Loading.service({ fullscreen: true })
  return config
})

// 声明响应拦截器
axios.interceptors.response.use(response => {
  // 隐藏loading效果
  loadingInstance.close()
  return response
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
