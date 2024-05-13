<template>
  <div class="home">
    <AppHeader/>
    <div class="leb-background">
      <div id="leb-smallgathering-detail">
        
        <div id="leb-smallgathering-detail-buttons">
          <h2>소모임</h2>
          <button id="leb-smallgathering-detail-modify-button"><router-link id="leb-smallgathering-detail-router-link" to="/walking/smallgatheringmodify">수정</router-link></button>
          <button id="leb-smallgathering-detail-delete-button">삭제</button>
        </div>
        <!--사진등록-->
        <div id="leb-smallgathering-detail-img">
          <img src="../../assets/img/sg_modify_ex.png" alt="미리보기 이미지" id="leb-preview">
        </div>
      
        <!--소모임 이름-->
        <div id="leb-smallgathering-detail-name" class="leb-smallgathering-write-img-right">
            <span class="leb-smallgathering-detail-title">소모임 이름</span>
            <span class="leb-smallgathering-detail-content">걸음걸음</span>
        </div>

        <!--주최자 이름-->
        <div id="leb-smallgathering-detail-host-name" class="leb-smallgathering-write-img-right">
            <span class="leb-smallgathering-detail-title">주최자 이름</span>
            <span class="leb-smallgathering-detail-content">유영수</span>
        </div>

        <!--주최자 연락처-->
        <div id="leb-smallgathering-detail-host-number" class="leb-smallgathering-write-img-right">
            <span class="leb-smallgathering-detail-title">주최자 연락처</span>
            <span class="leb-smallgathering-detail-content">010-2222-2222</span>
        </div>
        
        <!--모집인원-->
        <div id="leb-smallgathering-detail-required" class="leb-smallgathering-write-img-right">
          <span class="leb-smallgathering-detail-title">모집인원</span>
          <span class="leb-smallgathering-detail-content">2명 / 8명</span>
        </div>

        <!--코스-->
        <div id="leb-smallgathering-detail-course-map">
          <div id="leb-smallgathering-detail-course-location">코스 위치</div>
          <img src="../../assets/img/코스예시.jpg">
        </div>
        <div id="leb-smallgathering-detail-course-choice">
          <span class="leb-smallgathering-detail-title">코스 이름</span>
          <span class="leb-smallgathering-detail-content">영수코스</span>
        </div>
        

        <!--모임 일시-->
        <div id="leb-smallgathering-detail-date">
          <span class="leb-smallgathering-detail-title">모임 일시</span>
          <span class="leb-smallgathering-detail-content">2024-05-12</span>
        </div>

        <!--신청 마감일-->
        <div id="leb-smallgathering-detail-closing-date">
          <span class="leb-smallgathering-detail-title">신청마감일</span>
          <span class="leb-smallgathering-detail-content">2024-05-13</span>
        </div>

        <!--신청제한-->
        <div id="leb-smallgathering-detail-limit">
          <span id="leb-smallgathering-detail-limit-title">신청 제한</span>
          <span id="leb-smallgathering-detail-limit-gender">
            <span class="leb-smallgathering-detail-title">성별</span>
            <span class="leb-smallgathering-detail-content">제한없음</span>
          </span>
          <span id="leb-smallgathering-detail-limit-age">
            <span class="leb-smallgathering-detail-title">나이</span>
            <span class="leb-smallgathering-detail-content">20</span>
            <span class="leb-smallgathering-detail-content">~</span>
            <span class="leb-smallgathering-detail-content">40</span>
          </span>
        </div>

        <!--모임정보-->
        <div id="leb-smallgathering-detail-information">
          <div class="leb-smallgathering-detail-title">모임정보</div>
          <div class="leb-smallgathering-detail-content">유영수영수유영수영수유영수영수유영수영수유영수영수유영수영수유영수영수유영수영수유영수영수유영수영수유영수영수유영수영수유영수영수유영수영수유영수영수유영수영수유영수영수유영수영수유영수영수</div>
        </div>

      </div>
    </div>
    <AppFooter/>
  </div>
</template>
  
<script>
import "@/assets/css/LebCss/SmallGatheringDetail.css";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
export default {
  name: 'SmallGatheringDetailView',
  components: {
    AppFooter,
    AppHeader,
  }
}
</script>