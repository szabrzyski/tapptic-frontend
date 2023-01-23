import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as bootstrap from 'bootstrap';
import './assets/main.css'

window.bootstrap = bootstrap;

const app = createApp(App)

app.use(router)

app.mount('#app')
