import MainView from '@/views/MainView/MainView.vue'
import LoginPageView from '@/views/PjhView/LoginPageView.vue'
import KakaoJoinView from '@/views/PjhView/KakaoJoinView.vue'
import KakaoModifyView from '@/views/PjhView/KakaoModifyView.vue'
import GoogleJoinView from '@/views/PjhView/GoogleJoinView.vue'
import NaverJoinView from '@/views/PjhView/NaverJoinView.vue'
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
import CourseGalleryView from '@/views/YdsView/CourseGalleryView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store/storage.js' 
import MyPageView from '@/views/KsbView/MyPageView.vue'
import MyWalkView from '@/views/YysView/CalenderView.vue'
import AchievementView from '@/views/KsbView/AchievementView.vue'
import YysTestView from '@/views/YysView/YysTestView.vue'
import temporaryGPSView from '@/views/LebView/temporaryGPS.vue'

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
    path: '/walking/kakaojoinpage',
    name: '/walking/kakaojoinpage',
    component: KakaoJoinView
  },
  {
    path: '/walking/googlejoinpage',
    name: '/walking/googlejoinpage',
    component: GoogleJoinView
  },
  {
    path: '/walking/naverjoinpage',
    name: '/walking/naverjoinpage',
    component: NaverJoinView
  },
  {
    path: '/walking/kakaomodify',
    name: '/walking/kakaomodify',
    component: KakaoModifyView
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
    path: '/walking/coursebook/:users_no',
    name: '/walking/coursebook',
    component: CourseBookView
  },
  {
    path: '/walking/coursedraw',
    name: '/walking/coursedraw',
    component: CourseDrawingView,
    meta: { requiresAuth: true }
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
    path: '/walking/gallery/course',
    name: '/walking/gallery/course',
    component: CourseGalleryView
  },
  {
    path: '/walking/amenity',
    name: '/walking/amenity',
    component: AmenityView
  },
  {
    path: '/walking/temporary/gps',
    name: '/walking/temporary/gps',
    component: temporaryGPSView,
    meta: { requiresAuth: true }
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
    path: '/walking/mywalk',
    name: '/walking/mywalk',
    component: MyWalkView
  },
  {
    path: '/walking/achievement',
    name: '/walking/achievement',
    component: AchievementView
  },
  {
    path: '/walking/yystest',
    name: '/walking/yystest',
    component: YysTestView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 전역 가드 설정
router.beforeEach((to, from, next) => {
  // `to`는 사용자가 이동하려고 하는 라우트 객체
  // `from`은 사용자가 이동하려고 하는 이전 라우트 객체
  // `next`는 라우트 이동을 제어하는 함수
  
  // `to.matched.some(record => record.meta.requiresAuth)`:
  // 이동하려는 라우트나 그 상위 라우트 중에 `meta.requiresAuth`가 true로 설정된 라우트가 있는지 확인합니다.
  // `to.matched`는 `to` 라우트와 일치하는 모든 라우트 레코드 배열을 반환합니다.
  // `some` 메서드는 배열의 일부 요소가 주어진 조건을 만족하는지 검사합니다.
  if (to.matched.some(record => record.meta.requiresAuth) && !store.getters.isAuthenticated) {
    // `store.getters.isAuthenticated`:
    // Vuex 스토어의 `isAuthenticated` getter를 호출하여 사용자가 인증되어 있는지 확인합니다.
    // `!store.getters.isAuthenticated`는 사용자가 인증되지 않은 경우를 나타냅니다.
    alert("로그인이 필요합니다.");
    next('/login'); // 로그인 페이지로 이동
  } else {
    next(); // 다음 라우트로 이동
  }
});

export default router