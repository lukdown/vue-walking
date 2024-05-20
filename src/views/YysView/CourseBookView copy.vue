<template>
  <div>
    <AppHeader />

    <div id="wrap">
      <div id="container">
        <!-- aside 없음 -->
        <div id="full-content">
          <!-- content-head 없음 -->

          <div id="index">
            <div id="yys-course-title-h2">
              <h2>코스북</h2>
            </div>
            <div id="greetings">
              <div id="yys-contentbox">
                <div id="yys-courselist-content">
                  <div id="yys-course-btn-box">
                    <button class="yys-course-select-btn" v-for="(tab, index) in tabs" v-bind:key="{active: currentTab === index}" v-on:click="currentTab = index" @click="getList(index)">{{ tab }}</button>
                  </div>

                  <div id="yys-searchbox">
                    <input
                      type="text"
                      id="yys-search-input"
                      placeholder="지역 검색"
                    />
                    <button id="yys-search-btn">
                      <img src="@/assets/img/icon/search_3031293.png" alt="" />
                    </button>
                  </div>

                  <div id="yys-filterbox">
                    <div class="yys-filter-btn" @click="openModal2">
                      <img
                        src="@/assets/img/icon/funnel_15104382.png"
                        alt="filter"
                      />필터
                    </div>

                    <div id="yss-filter-modal" v-if="isModalViewed2">
                      <div id="yys-filter">
                        <div class="yys-filter-btn-modal">
                          <img
                            src="@/assets/img/icon/funnel_15104382.png"
                            alt="filter"
                          />필터
                        </div>
                        <div
                          class="yys-filter-close-modal"
                          @click="(isModalViewed2 = false), listcolor"
                        >
                          X
                        </div>
                      </div>
                      <div id="yys-filter-checkbox">
                        <p>지역이름</p>
                        <div class="yys-filter-border">
                          <div>
                            <input
                              type="checkbox"
                              name="yys-filter-checkbox"
                              id="yys-nationwide"
                              class="yys-filter-course-region"
                            />
                            <label for="yys-nationwide">전국</label>
                            <input
                              type="checkbox"
                              name="yys-filter-checkbox"
                              id="yys-seoul"
                              class="yys-filter-course-region"
                            />
                            <label for="yys-seoul">서울특별시</label>
                            <input
                              type="checkbox"
                              name="yys-filter-checkbox"
                              id="yys-gyeonggi-do"
                              class="yys-filter-course-region"
                            />
                            <label for="yys-gyeonggi-do">경기도</label>
                            <input
                              type="checkbox"
                              name="yys-filter-checkbox"
                              id="yys-incheon"
                              class="yys-filter-course-region"
                            />
                            <label for="yys-incheon">인천광역시</label>
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              name="yys-filter-checkbox"
                              id="yys-gangwon-do"
                              class="yys-filter-course-region"
                            />
                            <label for="yys-gangwon-do">강원특별자치도</label>
                            <input
                              type="checkbox"
                              name="yys-filter-checkbox"
                              id="yys-daejeon"
                              class="yys-filter-course-region"
                            />
                            <label for="yys-daejeon">대전광역시</label>
                            <input
                              type="checkbox"
                              name="yys-filter-checkbox"
                              id="yys-etc"
                              class="yys-filter-course-region"
                            />
                            <label for="yys-etc">기타</label>
                          </div>
                        </div>
                      </div>

                      <div id="yys-filter-difficulty-checkbox">
                        <p>난이도</p>
                        <div class="yys-filter-border">
                          <div>
                            <input
                              type="checkbox"
                              name="yys-filter-checkbox"
                              id="yys-very-easy"
                              class="yys-filter-course-difficulty"
                            />
                            <label for="yys-very-easy">매우 쉬움</label>
                            <input
                              type="checkbox"
                              name="yys-filter-checkbox"
                              id="yys-easy"
                              class="yys-filter-course-difficulty"
                            />
                            <label for="yys-easy">쉬움</label>
                            <input
                              type="checkbox"
                              name="yys-filter-checkbox"
                              id="yys-commonly"
                              class="yys-filter-course-difficulty"
                            />
                            <label for="yys-commonly">보통</label>
                            <input
                              type="checkbox"
                              name="yys-filter-checkbox"
                              id="yys-difficult"
                              class="yys-filter-course-difficulty"
                            />
                            <label for="yys-difficult">어려움</label>
                            <input
                              type="checkbox"
                              name="yys-filter-checkbox"
                              id="yys-very-difficult"
                              class="yys-filter-course-difficulty"
                            />
                            <label for="yys-very-difficult">매우 어려움</label>
                          </div>
                        </div>
                      </div>

                      <div id="yys-filter-search-btn">
                        <button type="button" @click="isModalViewed2 = false">
                          검색
                        </button>
                      </div>
                    </div>

                    <button class="yys-filter-btn">
                      <img
                        src="@/assets/img/icon/list_12672199.png"
                        alt="filter"
                      />최신 순
                    </button>
                  </div>

                  <ul id="yys-list">
                    <div v-show="currentTab == 0">
                      <li class="yys-list-info" :style="{ backgroundColor: listcolor }" v-bind:key="i" v-for="(coursebookVo, i) in coursebookList" >
                        <div class="yys-list-contentbox">
                          <p id="yys-course-title">
                            <span>{{ coursebookVo.course_name }}</span>
                          </p>

                          <div>
                            <div class="yys-writing">
                              <p id="yys-course-icon-img">
                                <button>
                                  <img src="@/assets/img/icon/heart_9131541.png" alt="" />
                                </button>
                                <span>123</span>
                                <button>
                                  <img src="@/assets/img/icon/view_709612.png" alt=""/>
                                </button>
                                <span>{{ coursebookVo.course_hit }}</span>
                              </p>
                              <div class="yys-listcontent-ex">
                                <div class="yys-listinfo-ex1">
                                  <p>
                                    <label for="">지역 위치 :</label>
                                  </p>
                                  <p>
                                    <span> {{ coursebookVo.course_region }}</span>
                                  </p>
                                  <p>
                                    <label for="">소요 시간 :</label>
                                    <span> {{ coursebookVo.course_time }}</span>
                                  </p>
                                </div>

                                <div class="yys-listinfo-ex2">
                                  <p>
                                    <label for="">난이도 :</label>
                                    <span> {{ coursebookVo.course_difficulty }}</span>
                                  </p>
                                  <p>
                                    <label for="">코스길이 :</label>
                                    <span> {{ coursebookVo.course_length}} m</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="yys-list-info-arrow">
                          <img
                            src="@/assets/img/icon/right-arrow_3031716.png"
                            alt="#"
                            @click="openModal()"
                          />
                        </div>
                      </li>
                    </div>
                    <div v-show="currentTab == 1">
                      gdfg
                    </div>
                    <div v-show="currentTab == 2">
                      gfdgdfd
                    </div>
                  </ul>
                </div>

                <div class="yys-reviewlist-content" v-if="isModalViewed">
                  <div id="yys-course-name-box">
                    <span
                      >산책하기 힘든 코스입니다. 하지마세요
                      <button type="button">
                        <img src="@/assets/img/icon/star_3794158.png" alt="" />
                      </button>
                    </span>
                    <p @click="closeModal()">X</p>
                  </div>

                  <div id="yys-course-explanation">
                    <span>이 코스는 그냥 힘들어요</span>
                  </div>

                  <div id="yys-content-link-box">
                    <router-link class="yys-link-btn" to="#">
                      > 이 코스의 갤러리로 가기</router-link
                    >
                    <router-link class="yys-link-btn" to="#">
                      > 이 코스의 소모임으로 가기</router-link
                    >
                  </div>

                  <div id="yys-reviewbox">
                    <input
                      type="text"
                      id="yys-review-input"
                      placeholder="후기를 등록해주세요"
                    />
                    <button id="yys-review-btn">
                      <img src="@/assets/img/icon/upload_3097412.png" alt="#" />
                    </button>
                  </div>

                  <ul id="yys-reviewlist">
                    <li class="yys-reviewlist-info">
                      <div>
                        <img
                          src="@/assets/img/icon/people_11081625.png"
                          alt="#"
                        />
                      </div>
                      <div id="yys-explanation">
                        <span>이 코스 짱 어려움</span>
                      </div>
                    </li>

                    <li class="yys-reviewlist-info">
                      <div>
                        <img
                          src="@/assets/img/icon/people_11081625.png"
                          alt="#"
                        />
                      </div>
                      <div id="yys-explanation">
                        <span>이 코스 짱 어려움</span>
                      </div>
                    </li>

                    <li class="yys-reviewlist-info">
                      <div>
                        <img
                          src="@/assets/img/icon/people_11081625.png"
                          alt="#"
                        />
                      </div>
                      <div id="yys-explanation">
                        <span>이 코스 짱 어려움</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div class="yys-coursemap">
                  <KakaoMap id="yys-map" />
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
import KakaoMap from "@/components/YysKakaoMap/CoursebookKakaoMap";
</script>


<script>
import axios from "axios";
import "@/assets/css/YysCss/CourseBookView.css";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";

export default {
  name: "CourseBookView",
  components: {
    AppFooter,
    AppHeader,
  },
  data() {
    return {
      currentTab: 0,
      tabs: ['전체코스','내 코스','즐겨찾기'],
      isModalViewed: false,
      isModalViewed2: false,
      coursebookList: [],
    };
  },
  methods: {
    getList() {
      console.log("데이터 가져오기");

      axios({
        method: "get", // put, post, delete
        url: `${this.$store.state.apiBaseUrl}/api/walking/coursebooklist`,
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        //params: course_category_no, //get방식 파라미터로 값이 전달
        //data: course_category_no, //put, post, delete 방식 자동으로 JSON으로 변환 전달

        responseType: "json", //수신타입
      })
        .then((response) => {
          console.log(response); //수신데이타
          this.coursebookList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openModal() {
      this.isModalViewed = true; // 모달 창을 열기 위해 true로 설정
      this.listcolor = "#d9d9d9";
    },
    openModal2() {
      this.isModalViewed2 = true; // 모달 창을 열기 위해 true로 설정
    },
    closeModal() {
      this.isModalViewed = false;
      this.listcolor = "white";
    },
  },
  created() {
    this.getList();
  },
};
</script>
