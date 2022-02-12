import { createApp } from 'vue'
import App from './components/router-start/App.vue'
import './assets/css/bootstrap.css'
import './index.css'
import router from './components/router-start/router.js'

const app = createApp(App)
app.use(router)
app.mount('#app')
