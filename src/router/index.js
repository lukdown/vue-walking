import MainView from '@/views/MainView/MainView.vue'
import LoginPageView from '@/views/PjhView/LoginPageView.vue'
import JoinFormView from '@/views/PjhView/JoinFormView.vue'
import ModifyFormView from '@/views/PjhView/ModifyFormView.vue'
import SmallGatheringView from '@/views/PjhView/SmallGatheringView.vue'
import CourseBookView from '@/views/YysView/CourseBookView.vue'
import CourseDrawingView from '@/views/LebView/CourseDrawingView.vue'
import AmenityView from '@/views/LebView/AmenityView.vue'
import SmallGatheringWriteView from '@/views/LebView/SmallGatheringWriteView.vue'
import SmallGatheringDetailView from '@/views/LebView/SmallGatheringDetailView.vue'
import SmallGatheringModifyView from '@/views/LebView/SmallGatheringModifyView.vue'
import DsGalleryView from '@/views/YdsView/DsGalleryView.vue'
import MyGalleryView from '@/views/YdsView/MyGalleryView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import MyPageView from '@/views/KsbView/MyPageView.vue'
import CalenderView from '@/views/YysView/CalenderView.vue'
import AchievementView from '@/views/KsbView/AchievementView.vue'
import RecordView from '@/views/KsbView/RecordView.vue'


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
    path: '/walking/mypage/gallery',
    name: '/walking/mypage/gallery',
    component: MyGalleryView
  },
  {
    path: '/walking/amenity',
    name: '/walking/amenity',
    component: AmenityView
  },
  {
    path: '/walking/mypage',
    name: '/walking/mypage',
    component: MyPageView
  },
  {
    path: '/walking/smallgatheringwrite',
    name: '/walking/smallgatheringwrite',
    component: SmallGatheringWriteView
  },
  {
    path: '/walking/smallgatheringdetail',
    name: '/walking/smallgatheringdetail',
    component: SmallGatheringDetailView
  },
  {
    path: '/walking/smallgatheringmodify',
    name: '/walking/smallgatheringmodify',
    component: SmallGatheringModifyView
  },
  {
    path: '/walking/calender',
    name: '/walking/calender',
    component: CalenderView
  },
  {
    path: '/walking/record',
    name: '/walking/record',
    component: RecordView
  },
  {
    path: '/walking/achievement',
    name: '/walking/achievement',
    component: AchievementView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
