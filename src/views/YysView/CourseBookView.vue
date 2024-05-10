<template>
  <div>
    <AppHeader />




    <div id="wrap">
      <div id="container" class="clearfix">
        <!-- aside 없음 -->
        <div id="full-content">
          <!-- content-head 없음 -->

          <div id="index">


            <div id="greetings">













              <div class="yys-title">
                <h2>코스북</h2>
              </div>
              <div id="yys-contentbox">
                
                

                <div class="yys-courselist-content">
                  <div id="yys-course-btn-box">
                    <button class="yys-course-select-btn">전체코스</button>
                    <span> / </span>
                    <button class="yys-course-select-btn">내 코스</button>
                    <span> / </span>
                    <button class="yys-course-select-btn">즐겨찾기</button>
                  </div>

                  <div id="yys-searchbox">
                    <input type="text" id="yys-search-input">
                    <button id="yys-search-btn">검색</button>
                  </div>

                  <div id="yys-filterbox">
                    <button class="yys-filter-btn">필터</button>
                    <button class="yys-filter-btn">최신순</button>
                  </div>

                 

                  <ul id="yys-list">
                                            
                      <li class="yys-list-info" @click="openModal()">
                          <div>
                              3213123
                          </div>
                          <div>
                              <strong>32233원</strong>
                          </div>
                      </li>
                      <li class="yys-list-info" @click="openModal()">
                          <div>
                            3213123
                          </div>
                          <div>
                              <strong>32233원</strong>
                          </div>
                      </li>
                                            
                  </ul>


                </div>
                
                <div class="yys-reviewlist-content" v-if="isModalViewed">


                  


                  <div id="yys-course-name-box">
                    <span>코스 이름 : 산책하기 힘든 코스</span>
                  </div>

                  <div id="yys-course-explanation">
                    <span>이 코스는 그냥 힘들어요</span>
                  </div>

                  <div id="yys-content-link-box">
                    <router-link class="yys-link-btn" to="#"> > 이 코스의 갤러리로 가기</router-link>
                    <router-link class="yys-link-btn" to="#"> > 이 코스의 소모임으로 가기</router-link>
                  </div>

                  <div id="yys-reviewbox">
                    <input type="text" id="yys-review-input">
                    <button id="yys-review-btn">후기등록</button>
                  </div>


                  <ul id="yys-reviewlist">
                                            
                      <li class="yys-reviewlist-info">
                          <div>
                            3213123
                          </div>
                          <div>
                              <strong>32233원</strong>
                          </div>
                      </li>
                      <li class="yys-reviewlist-info">
                          <div>
                            3213123
                          </div>
                          <div>
                              <strong>32233원</strong>
                          </div>
                      </li>
                                                                  
                  </ul>





                </div>


                <div class="yys-coursemap">
                  <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true" style="width: 100%; height: 100%;">
                    <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng"></KakaoMapMarker>
                  </KakaoMap>
                  
                </div>







              </div>











            </div>



            <!-- //greetings -->
            <div class="clear"></div>
          </div>
          <!-- //index -->
        </div>
        <!-- //full-content -->
      </div>
      <!-- //container -->

      <!-- //footer -->
    </div>
    <!-- //wrap -->




    
    <AppFooter />
  </div>
</template>


<script setup>
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';
const coordinate = {
  lat: 37.566826,
  lng: 126.9786567
};
</script>


<script>

import "@/assets/css/YysCss/CourseBookView.css";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";


export default {
  name: 'CourseBookView',
  components: {
    AppFooter,
    AppHeader,
  },
  data() {
      return {
        isModalViewed: false,
      };
  },
  methods: {
    openModal() {
            console.log("모달");
            console.log(this.isModalViewed);
            
            this.isModalViewed = true; // 모달 창을 열기 위해 true로 설정
            console.log(this.isModalViewed);
           
        },
  },
  created(){

  }
}
</script>
