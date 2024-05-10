import MainView from '@/views/MainView/MainView.vue'
import CourseBookView from '@/views/YysView/CourseBookView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'MainView',
    component: MainView
  },
  {
    path: '/walking/coursebook',
    name: 'CourseBookView',
    component: CourseBookView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
