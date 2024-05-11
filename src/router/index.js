import MainView from '@/views/MainView/MainView.vue'
import LoginPageView from '@/views/PjhView/LoginPageView.vue'
import JoinFormView from '@/views/PjhView/JoinFormView.vue'
import ModifyFormView from '@/views/PjhView/ModifyFormView.vue'
import SmallGatheringView from '@/views/PjhView/SmallGatheringView.vue'
import CourseBookView from '@/views/YysView/CourseBookView.vue'
import CourseDrawingView from '@/views/LebView/CourseDrawingView.vue'
import AmenityView from '@/views/LebView/AmenityView.vue'
import DsGalleryView from '@/views/YdsView/DsGalleryView.vue'
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
  {
    path: '/walking/smallgatheringpage',
    name: '/walking/smallgatheringpage',
    component: SmallGatheringView
  },
  {
    path: '/walking/coursebook',
    name: '/walking/coursebook',
    component: CourseBookView
  },
  {
    path: '/walking/coursedraw',
    name: '/walking/coursedraw',
    component: CourseDrawingView
  },
  {
    path: '/walking/gallery',
    name: 'DsGalleryView',
    component: DsGalleryView
  },
  {
    path: '/walking/amenity',
    name: '/walking/amenity',
    component: AmenityView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
