import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/bootstrap.css'
import './index.css'
import router from './router.js'

const app = createApp(App)
app.use(router)
app.mount('#app')
