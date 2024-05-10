import MainView from '@/views/MainView/MainView.vue'
import LoginPageView from '@/views/PjhView/LoginPageView.vue'
import JoinFormView from '@/views/PjhView/JoinFormView.vue'
import ModifyFormView from '@/views/PjhView/ModifyFormView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'MainView',
    component: MainView
  },
  {
    path: '/walking/loginpage',
    name: '/walking/loginpage',
    component: LoginPageView
  },
  {
    path: '/walking/joinpage',
    name: '/walking/joinpage',
    component: JoinFormView
  },
  {
    path: '/walking/modifypage',
    name: '/walking/modifypage',
    component: ModifyFormView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
