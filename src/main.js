import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store/storage"
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

createApp(App).use(store).use(router).mount('#app')
