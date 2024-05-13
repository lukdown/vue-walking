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
                    <button id="yys-search-btn"><img src="@/assets/img/icon/search_3031293.png" alt=""></button>
                  </div>

                  <div id="yys-filterbox">
                    <button class="yys-filter-btn"><img src="@/assets/img/icon/funnel_15104382.png" alt="filter">필터</button>
                    <button class="yys-filter-btn"><img src="@/assets/img/icon/list_12672199.png" alt="filter">최신 순</button>
                  </div>

                 

                  <ul id="yys-list">
                      
                      <li class="yys-list-info">
                        <div class="yys-list-contentbox">
                          <p id="yys-course-title">
                            <span>경기도 하남</span>
                            <button type="button">
                              <img src="@/assets/img/icon/star_3794158.png" alt="">
                            </button>
                          </p>

                          <div>
                            <div class="yys-writing">
                              <p id="yys-course-icon-img">
                                <button>
                                  <img src="@/assets/img/icon/heart_9131541.png" alt="">
                                </button>
                                <span>123</span>
                                <button>
                                  <img src="@/assets/img/icon/view_709612.png" alt="">
                                </button>
                                <span>123</span>
                              </p>
                              <div class="yys-listcontent-ex">
                                <div class="yys-listinfo-ex1">

                                  <p>
                                    <label for="">코스 이름 :</label>
                                  </p>
                                  <p>
                                    <span> 하기힘든코스</span>
                                  </p>
                                  <p>
                                    <label for="">소요 시간 :</label>
                                    <span> 20분</span>
                                  </p>
                                </div>



                                <div class="yys-listinfo-ex2">
                                  <p>
                                    <label for="">난이도 :</label>
                                    <span> 쉬움</span>
                                  </p>
                                  <p>
                                    <label for="">코스길이 :</label>
                                    <span> 1.6Km</span>
                                  </p>

                                </div>
                              </div>
                            </div>
                            
                            
                        </div>
                          
                          
                          
                        </div>
                        <div class="yys-list-info-arrow">
                          <img src="@/assets/img/icon/right-arrow_3031716.png" alt="#" @click="openModal()">
                        </div>
                        
                      </li>



                      <li class="yys-list-info">
                        <div class="yys-list-contentbox">
                          <p id="yys-course-title">
                            <span>경기도 하남</span>
                            <button type="button">
                              <img src="@/assets/img/icon/star_3794158.png" alt="">
                            </button>
                          </p>

                          <div>
                            <div class="yys-writing">
                              <p id="yys-course-icon-img">
                                <button>
                                  <img src="@/assets/img/icon/heart_9131541.png" alt="">
                                </button>
                                <span>123</span>
                                <button>
                                  <img src="@/assets/img/icon/view_709612.png" alt="">
                                </button>
                                <span>123</span>
                              </p>
                              <div class="yys-listcontent-ex">
                                <div class="yys-listinfo-ex1">

                                  <p>
                                    <label for="">코스 이름 :</label>
                                  </p>
                                  <p>
                                    <span> 하기힘든코스</span>
                                  </p>
                                  <p>
                                    <label for="">소요 시간 :</label>
                                    <span> 20분</span>
                                  </p>
                                </div>



                                <div class="yys-listinfo-ex2">
                                  <p>
                                    <label for="">난이도 :</label>
                                    <span> 쉬움</span>
                                  </p>
                                  <p>
                                    <label for="">코스길이 :</label>
                                    <span> 1.6Km</span>
                                  </p>

                                </div>
                              </div>
                            </div>
                            
                            
                        </div>
                          
                          
                          
                        </div>
                        <div class="yys-list-info-arrow">
                          <img src="@/assets/img/icon/right-arrow_3031716.png" alt="#" @click="openModal()">
                        </div>
                        
                      </li>



                      <li class="yys-list-info">
                        <div class="yys-list-contentbox">
                          <p id="yys-course-title">
                            <span>경기도 하남</span>
                            <button type="button">
                              <img src="@/assets/img/icon/star_3794158.png" alt="">
                            </button>
                          </p>

                          <div>
                            <div class="yys-writing">
                              <p id="yys-course-icon-img">
                                <button>
                                  <img src="@/assets/img/icon/heart_9131541.png" alt="">
                                </button>
                                <span>123</span>
                                <button>
                                  <img src="@/assets/img/icon/view_709612.png" alt="">
                                </button>
                                <span>123</span>
                              </p>
                              <div class="yys-listcontent-ex">
                                <div class="yys-listinfo-ex1">

                                  <p>
                                    <label for="">코스 이름 :</label>
                                  </p>
                                  <p>
                                    <span> 하기힘든코스</span>
                                  </p>
                                  <p>
                                    <label for="">소요 시간 :</label>
                                    <span> 20분</span>
                                  </p>
                                </div>



                                <div class="yys-listinfo-ex2">
                                  <p>
                                    <label for="">난이도 :</label>
                                    <span> 쉬움</span>
                                  </p>
                                  <p>
                                    <label for="">코스길이 :</label>
                                    <span> 1.6Km</span>
                                  </p>

                                </div>
                              </div>
                            </div>
                            
                            
                        </div>
                          
                          
                          
                        </div>
                        <div class="yys-list-info-arrow">
                          <img src="@/assets/img/icon/right-arrow_3031716.png" alt="#" @click="openModal()">
                        </div>
                        
                      </li>
                                            
                  </ul>


                </div>
                
                <div class="yys-reviewlist-content" v-if="isModalViewed">

                  <div id="yys-course-name-box">
                    <span>산책하기 힘든 코스</span>
                  </div>

                  <div id="yys-course-explanation">
                    <span>이 코스는 그냥 힘들어요</span>
                  </div>

                  <div id="yys-content-link-box">
                    <router-link class="yys-link-btn" to="#"> > 이 코스의 갤러리로 가기</router-link>
                    <router-link class="yys-link-btn" to="#"> > 이 코스의 소모임으로 가기</router-link>
                  </div>

                  <div id="yys-reviewbox">
                    <input type="text" id="yys-review-input" placeholder="후기를 등록해주세요">
                    <button id="yys-review-btn"><img src="@/assets/img/icon/upload_3097412.png" alt="#"></button>
                  </div>


                  <ul id="yys-reviewlist">
                                            
                      <li class="yys-reviewlist-info">
                          <div>
                            <img src="@/assets/img/icon/people_11081625.png" alt="#">
                          </div>
                          <div id="yys-explanation">
                              <span>이 코스 짱 어려움</span>
                          </div>
                      </li>

                      <li class="yys-reviewlist-info">
                          <div>
                            <img src="@/assets/img/icon/people_11081625.png" alt="#">
                          </div>
                          <div id="yys-explanation">
                              <span>이 코스 짱 어려움</span>
                          </div>
                      </li>

                      <li class="yys-reviewlist-info">
                          <div>
                            <img src="@/assets/img/icon/people_11081625.png" alt="#">
                          </div>
                          <div id="yys-explanation">
                              <span>이 코스 짱 어려움</span>
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
            this.isModalViewed = true; // 모달 창을 열기 위해 true로 설정
        },
  },
  created(){

  }
}
</script>
