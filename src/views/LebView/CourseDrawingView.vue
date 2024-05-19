<template>
    <div class="home">
      <AppHeader/>
        <div id="leb-draw">
          <form action="">
            <!--왼쪽 창-->
            <div id="leb-course-left">
              <h2 id="leb-course-top">코스그리기</h2>

              <!--공개여부-->
              <div id="leb-course-left-whether">
                <span class="leb-course-left-maintext">공개여부</span>
                <label for="rdo-Public" id="leb-course-left-whether-public">공개</label>
                <input type="radio" id="rdo-Public" name="whether" value="public">
                <label for="rdo-nondisclosure" id="leb-course-left-whether-nondisclosure">비공개</label>
                <input type="radio" id="rdo-nondisclosure" name="whether" value="nondisclosure">
              </div>

              <!--제목 입력-->
              <div id="leb-course-left-title">
                  <label for="ctitle" class="leb-course-left-maintext">제목</label>
                  <input type="text" id="ctitle" value="" placeholder="제목을 입력해주세요">
              </div>
              
              <!--코스소개-->
              <div id="leb-course-left-introduction">
                <span class="leb-course-left-maintext">코스소개</span>
                <textarea name="courseIntro" id="" cols="40" rows="2" placeholder="100자 이내로 입력해주세요"></textarea>
              </div>

              <!--난이도-->
              <div id="leb-course-left-clevel">
                <span class="leb-course-left-maintext">난이도</span>
                <select name="clevel">
                  <option value="" selected disabled hidden>난이도</option>
                  <option value="veryeasy">매우쉬움</option>
                  <option value="easy">쉬움</option>
                  <option value="general">보통</option>
                  <option value="hard">어려움</option>
                  <option value="veryhard">매우어려움</option>
                </select>
              </div>

              <!--예상시간-->
              <div id="leb-course-left-predictive-time">
                <span class="leb-course-left-maintext" id="leb-course-left-predictive-time-maintext">예상소요시간</span>
                <span id="leb-course-left-predictive-time-time">03:08:19</span>
              </div>

              <!--예상거리-->
              <div id="leb-course-left-predictive-distance">
                <span class="leb-course-left-maintext" id="leb-course-left-predictive-distance-maintext">예상거리</span>
                <span id="leb-course-left-predictive-distance-distance">6km</span>
              </div>
              <div id="leb-course-left-button">
                <button id="leb-course-left-button-back">취소</button>
                <button id="leb-course-left-button-draw">그리기</button>
              </div>
            </div>
          </form>
          <!--오른쪽 지도-->
          <div id="leb-course-right-map">
            <KakaoMap id="leb-map" />
          </div>
          
          <!--오른쪽 아래 그리기도구-->
          <div id="leb-course-bottom-map">
            <div id="leb-course-bottom-map-search">
              <div id="leb-course-bottom-map-search-text">지도에서 위치찾기</div>
              <form action="" method="get">
                <img src="@/assets/img/searchimage.png"><input type="search" id="leb-course-bottom-map-search-box" value="" placeholder="지역을 입력해주세요">
              </form>
            </div>
            <div id="leb-course-bottom-map-search-point">
              <div id="leb-course-bottom-map-search-start-point">
                <img src="@/assets/img/blueping.png"> 
                <input type="text" id="leb-course-bottom-map-start-point" value="" placeholder="시작점">
              </div>
              <div id="leb-course-bottom-map-search-end-point">
                <img src="@/assets/img/pinkping.png">
                <input type="text" id="leb-course-bottom-map-end-point" value="" placeholder="도착점">
              </div>
            </div>
            <div id="leb-course-bottom-map-auto-draw">
              <button id="leb-course-bottom-map-draw-button">그리기</button>
              <button id="leb-course-bottom-map-restart-button">초기화</button>
            </div>
            <div id="leb-course-bottom-map-direct-draw">
              <button id="leb-course-bottom-map-direct-draw-button"><img src="@/assets/img/pencil.png" id="leb-course-bottom-map-direct-draw-button-img">직접그리기</button>
              <button id="leb-course-bottom-map-direct-draw-return-button"><img src="@/assets/img/return.png">되돌리기</button>
            </div>
          </div>
        </div>
      <AppFooter/>
    </div>
  </template>
  


<script setup>
import KakaoMap from "@/components/LebKakaoMap/CoursebookKakaoMap";
</script>

  <script>
  import "@/assets/css/LebCss/CourseDarwing.css";
  import AppFooter from "@/components/AppFooter.vue";
  import AppHeader from "@/components/AppHeader.vue";
  export default {
    name: 'CourseDrawingView',
    components: {
      AppFooter,
      AppHeader,
    }
  }
  </script>
  