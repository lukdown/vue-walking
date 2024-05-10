<template>
  <div class="ds-gallery">
    <!--헤더-->
    <AppHeader />
    <div class= "ds-gallery-contents">
      <div class="ds-header">  
        <h1 class="ds-gallery-title">갤러리</h1>
        <button class="ds-upload" @click="openModal">포스팅등록</button>
        <div v-if="showModal" class="ds-modal">
          <Content msg = "포스팅모달" />
        </div>
      </div>  
          <div class="ds-column">
            <div class="ds-walkingComments">
              <div class="ds-profile-all">
                <img class="ds-profile" src="@/assets/img/프사.jpg" alt="회원프사">
                <div class="ds-profile-detail">
                  <div class="ds-nickname">YoungSoooo</div>
                  <div class="ds-nickname">YoungSoooo</div>
                </div>
              </div>
              <div class="ds-divider"></div>
              <img class="ds-main-image" src="@/assets/img/오리산책.jpg" alt="오리산책이라능">
              <p class="ds-shortCmt">꽉꽊꽊까까꽈꽊꽈꽊</p>
              <p class="ds-date">2024.05.09</p>
              <div class="ds-additional-images">
                <img src="@/assets/img/코스예시.jpg" alt="추가 이미지">
              </div>
              <div class="ds-divider"></div>
              <button class="ds-likes" @click="likes++">좋아요</button>
            
            </div>
          </div>
          <!-- 푸터 -->
          <AppFooter />
    </div>    
  </div><!--/ds-gallery-->
</template>


<script>
import '@/assets/css/YdsCss/galleryModal.css'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
export default {
  name: "DsGalleryView",
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      showModal: false,
      posts: [
        // 각 게시물은 id, mainImage, comment, date, nickname, likes, additionalImages를 포함하는 객체입니다.
        // 예: { id: 1, mainImage: 'path-to-main-image.jpg', comment: '코멘트', date: '날짜', nickname: '닉네임', likes: 0, additionalImages: ['path-to-additional-image1.jpg', 'path-to-additional-image2.jpg'] }
      ],

    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    // 이미지 및 정보 업로드 메소드를 여기에 추가하세요.
    created() { }
  },
}  
</script>