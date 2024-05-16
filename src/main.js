import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store/storage"
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useKakao } from 'vue3-kakao-maps/@utils';
import { quillEditor } from 'vue3-quill'

//캘린더
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';


useKakao('df6af04d0c7740cc52da078913f38627', ['clusterer', 'services', 'drawing']);   // api-key입력(javascript-key)
createApp(App).component('VueDatePicker', VueDatePicker).use(store).use(router).use(quillEditor).mount('#app')
window.Kakao.init('bec95067442add30fba8a7cedcf638ff')