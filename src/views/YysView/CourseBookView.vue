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
                    <button v-if="this.$store.state.authUser != null"
                      class="yys-course-select-btn"
                      @click="
                        getList(
                          this.$store.state.authUser.users_no,
                          coursebookVo.users_no
                        )
                      "
                    >
                      전체코스
                    </button>
                    <button v-else-if="this.$store.state.authUser == null"
                      class="yys-course-select-btn"
                      @click="
                        gettotalList()
                      "
                    >
                      전체코스
                    </button>
                    <span> | </span>
                    <button v-if="this.$store.state.authUser != null"
                      class="yys-course-select-btn"
                      @click="
                        getList(
                          this.$store.state.authUser.users_no,
                          this.$store.state.authUser.users_no
                        )
                      "
                      isActive
                    >
                      내 코스
                    </button>
                    <button v-else-if="this.$store.state.authUser == null"
                      class="yys-course-select-btn"
                      @click="
                        loginAlert
                      "
                      isActive
                    >
                      내 코스
                    </button>
                    <span> | </span>
                    <button v-if="this.$store.state.authUser != null"
                      class="yys-course-select-btn"
                      @click="
                        getfavoritesList(this.$store.state.authUser.users_no)
                      "
                    >
                      즐겨찾기
                    </button>
                    <button v-if="this.$store.state.authUser == null"
                      class="yys-course-select-btn"
                      @click="
                        loginAlert
                      "
                    >
                      즐겨찾기
                    </button>
                  </div>

                  
                  <div id="yys-searchbox">
                    <input
                      type="text"
                      id="yys-search-input"
                      placeholder="코스 제목, 지역, 난이도 검색"
                      @input="searchGroup($event)"
                    />
                    <!-- 
                    <button id="yys-search-btn">
                      <img src="@/assets/img/icon/search_3031293.png" alt="" />
                    </button>
                     -->
                  </div>

                  <div id="yys-filterbox">

                     <!-- 
                    <div class="yys-filter-btn" @click="openModal2">
                      <img
                        src="@/assets/img/icon/funnel_15104382.png"
                        alt="filter"
                      />필터
                    </div>
                    -->
                    <!-- 
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
                              value="매우 쉬움"
                            />
                            <label for="yys-very-easy">매우 쉬움</label>
                            <input
                              type="checkbox"
                              name="yys-filter-checkbox"
                              id="yys-easy"
                              class="yys-filter-course-difficulty"
                              value="쉬움"
                            />
                            <label for="yys-easy">쉬움</label>
                            <input
                              type="checkbox"
                              name="yys-filter-checkbox"
                              id="yys-commonly"
                              class="yys-filter-course-difficulty"
                              value="보통"
                            />
                            <label for="yys-commonly">보통</label>
                            <input
                              type="checkbox"
                              name="yys-filter-checkbox"
                              id="yys-difficult"
                              class="yys-filter-course-difficulty"
                              value="어려움"
                            />
                            <label for="yys-difficult">어려움</label>
                            <input
                              type="checkbox"
                              name="yys-filter-checkbox"
                              id="yys-very-difficult"
                              class="yys-filter-course-difficulty"
                              value="매우 어려움"
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
                    -->
                    <div class="yys-filter-btn">
                      <button class="yys-filter-btn1" @click="view_order()">
                        <img
                          src="@/assets/img/icon/list_12672199.png"
                          alt="filter"
                        />조회수 순
                      </button>
                      <button class="yys-filter-btn2" @click="like_order()">
                        <img
                          src="@/assets/img/icon/heart_9131541.png"
                          alt="filter"
                        />좋아요 순
                      </button>
                    </div>
                  </div>

                  <ul id="yys-list">
                    <li
                      class="yys-list-info"
                      :style="{ backgroundColor: listcolor }"
                      v-bind:key="i"
                      v-for="(coursebookVo, i) in coursebookList"
                    >
                      <div class="yys-list-contentbox">
                        <p id="yys-course-title">
                          <span>{{ coursebookVo.course_name }}</span>
                        </p>
                        
                        <div>
                          <div class="yys-writing">
                            <p id="yys-course-icon-img">
                              <span v-if="this.$store.state.authUser != null">
                                <button
                                  v-if="coursebookVo.course_like_no != 0"
                                  @click="
                                    likeDelete(
                                      this.$store.state.authUser.users_no,
                                      coursebookVo.course_no
                                    )
                                  "
                                >
                                  <img
                                    src="@/assets/img/icon/heart_9131541.png"
                                    alt=""
                                  />
                                </button>

                                <button
                                  v-else-if="coursebookVo.course_like_no == 0"
                                  @click="
                                    likeUpdate(
                                      this.$store.state.authUser.users_no,
                                      coursebookVo.course_no
                                    )
                                  "
                                >
                                  <img
                                    src="@/assets/img/icon/love_2961957.png"
                                    alt=""
                                  />
                                </button>
                              </span>
                              <span v-else-if="this.$store.state.authUser == null">
                                <button @click="loginAlert">
                                  <img
                                    src="@/assets/img/icon/love_2961957.png"
                                    alt=""
                                  />
                                </button>
                              </span>
                              <span class="ds-likesCount">{{
                                coursebookVo.like_count
                              }}</span>
                              <button>
                                <img
                                  src="@/assets/img/icon/view_709612.png"
                                  alt=""
                                />
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
                                  <span>
                                    {{ coursebookVo.course_difficulty }}</span
                                  >
                                </p>
                                <p>
                                  <label for="">코스길이 :</label>
                                  <span>
                                    {{ coursebookVo.course_length }} m</span
                                  >
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>


                      <div class="yys-list-info-arrow" v-if="this.$store.state.authUser != null">
                        <img
                          src="@/assets/img/icon/right-arrow_3031716.png"
                          alt="#"
                          @click="
                            openModal();
                            getreviewList(coursebookVo.course_no);
                            getOneFavoritesInfo(
                              this.$store.state.authUser.users_no,
                              coursebookVo.course_no
                            );
                            listviewModify(coursebookVo.course_no);
                            this.reviewVo.course_no = coursebookVo.course_no;
                            this.coursebookVo = coursebookVo;
                            this.kakaocourse_no= coursebookVo.course_no;
                            getCouse_info(coursebookVo.course_no);
                            callChildMethod(coursebookVo.course_no);
                            refreshChild;
                            //this.kakaocourse_no = coursebookVo.course_no;
                          "
                        />
                      </div>

                      <div class="yys-list-info-arrow" v-else-if="this.$store.state.authUser == null">
                        <img
                          src="@/assets/img/icon/right-arrow_3031716.png"
                          alt="#"
                          @click="
                            openModal();
                            getreviewList(coursebookVo.course_no);
                            listviewModify(coursebookVo.course_no);
                            getCouse_info(coursebookVo.course_no);
                            this.reviewVo.course_no = coursebookVo.course_no;
                            this.coursebookVo = coursebookVo;
                            this.kakaocourse_no= coursebookVo.course_no;
                            refreshChild
                          "
                        />
                      </div>




                    </li>
                  </ul>
                </div>

                <div class="yys-reviewlist-content" v-if="dataReceived || isModalViewed">



                  
                  <div id="yys-course-name-box">
                    <span v-if="this.$store.state.authUser != null">
                      {{ this.coursebookinfoVo.course_name }}
                      <button
                        type="button"
                        v-if="this.favoritestypeVo == null"
                        @click="favoritesUpdate()"
                      >
                        <img src="@/assets/img/icon/star_empty.png" alt="" />
                      </button>
                      <button
                        type="button"
                        v-else-if="this.favoritestypeVo != null"
                        @click="favoritesDelete()"
                      >
                        <img src="@/assets/img/icon/star_full.png" alt="" />
                      </button>
                    </span>
                    <span v-else-if="this.$store.state.authUser == null">
                      {{ this.coursebookinfoVo.course_name }}
                      <button type="button" @click="loginAlert">
                        <img src="@/assets/img/icon/star_empty.png" alt="" />
                      </button>
                      
                    </span>
                    <p @click="closeModal()">X</p>
                  </div>

                  <div id="yys-course-explanation">
                    <span>{{ this.coursebookinfoVo.course_introduce }}</span>
                  </div>

                  <div id="yys-content-link-box">
                    <router-link class="yys-link-btn" :to="`/walking/gallery/${this.coursebookinfoVo.course_no}`">
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
                      v-model="reviewVo.review_content"
                    />
                    <button v-if="this.$store.state.authUser != null"
                      id="yys-review-btn"
                      @click="
                        reviewUpdate();
                        updateAlert();
                      "
                    >
                      <img src="@/assets/img/icon/upload_3097412.png" alt="#" />
                    </button>
                    <button v-else-if="this.$store.state.authUser == null"
                      id="yys-review-btn"
                      @click="
                        loginAlert
                      "
                    >
                      <img src="@/assets/img/icon/upload_3097412.png" alt="#" />
                    </button>
                  </div>

                  <ul id="yys-reviewlist">
                    <li
                      class="yys-reviewlist-info"
                      v-bind:key="i"
                      v-for="(coursebookVo, i) in coursereviewList"
                    >
                      <div>
                        <img
                          src="@/assets/img/icon/people_11081625.png"
                          alt="#"
                        />
                      </div>
                      <div class="yys-explanation">
                        <p style="">
                          <span>내용: {{ coursebookVo.review_content }}</span>
                        </p>
                        <p>
                          <span>등록일: {{ coursebookVo.review_date }}</span>
                        </p>
                        <p>
                          <span>글쓴이: {{ coursebookVo.users_nickname }}</span>
                        </p>
                      </div>
                    </li>
                  </ul>















                </div>

                
                <div class="yys-coursemap">
                  <KakaoMap ref="childRef" id="yys-map" v-bind:childVaule="this.kakaocourse_no"  />
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
</script>


<script>
import KakaoMap from "@/components/YysKakaoMap/CoursebookKakaoMap";
import axios from "axios";
import "@/assets/css/YysCss/CourseBookView.css";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";

export default {
  name: "CourseBookView",
  components: {
    AppFooter,
    AppHeader,
    KakaoMap
  },
  data() {
    return {
      coursebookinfoVo: {
        course_no: "",
        course_name: "",
        course_introduce: "",
      },
      dataCourse_no: "",
      childKey: 0,
      kakaocourse_no: "",
      isModalViewed: false,
      isModalViewed2: false,
      favorites: false,
      favorites2: "",
      coursebookList: [],
      coursereviewList: [],
      reviewupdateList: [],
      lList: [],
      listviewModifyVo: {
        course_no: "",
      },
      login_write_Vo: {
        login_users_no: "",
        write_users_no: "",
      },
      loginVo: {
        users_no: "",
      },
      favoritestypeVo: {
        course_favorites_no: "",
        course_no: "",
        users_no: "",
      },
      liketypeVo: {
        course_like_no: "",
        course_no: "",
        users_no: "",
      },
      favoritesUDVo: {
        course_no: "",
        users_no: "",
      },
      likeUDVo: {
        course_no: "",
        users_no: "",
      },
      onefavoritesinfoVo: {
        course_favorites_no: "",
        course_no: "",
        users_no: "",
      },
      onelikeinfoVo: {
        course_like_no: "",
        course_no: "",
        users_no: "",
      },
      coursebookVo: {
        course_no: "",
        course_introduce: "",
        course_name: "",
        users_no: "",
      },
      reviewVo: {
        review_no: "",
        course_no: "",
        users_no: "",
        review_content: "",
        review_date: "",
      },
    };
  },
  computed: {
    dataReceived() {
      // 두 번째 페이지로부터 데이터를 확인
      //this.isModalViewed= true;
      return this.$store.state.dataToSend !== null
      }
  },
  mounted() {
    if (this.dataReceived) {
      // 데이터를 기반으로 메소드 실행 등의 동작 수행
      this.someMethod();
    }
  },
  methods: {
    someMethod() {
      //console.log('Some method executed with data:', this.$store.state.dataToSend.someData)
      this.dataCourse_no = this.$store.state.dataToSend.someData;
      //console.log(this.dataCourse_no);
      this.getreviewList(this.dataCourse_no);
      this.getOneFavoritesInfo(this.$store.state.authUser.users_no, this.dataCourse_no);
      this.listviewModify(this.dataCourse_no);
      this.getCouse_info(this.dataCourse_no);
      this.callChildMethod(this.dataCourse_no);
      this.refreshChild();
    },
    // 해당 코스 정보 가져오기
    getCouse_info(course_no) {
      console.log("데이터 가져오기");
      //console.log(course_no);

      axios({
        method: "post", // put, post, delete
        url: `${this.$store.state.apiBaseUrl}/api/walking/coursebookinfo`,
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        //params: course_category_no, //get방식 파라미터로 값이 전달
        data: course_no, //put, post, delete 방식 자동으로 JSON으로 변환 전달

        responseType: "json", //수신타입
      })
        .then((response) => {
          console.log(response); //수신데이타
          this.coursebookinfoVo = response.data.apiData;

          //this.coursebookList = response.data.apiData;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    
    callChildMethod(course_no) {
      //console.log(course_no);
      // $refs를 사용하여 자식 컴포넌트의 함수 호출
      //this.$refs.childRef.getpointList(course_no);
      this.$refs.childRef.initMap(course_no);
    },
    refreshChild() {
      this.childKey += 1;
    },
    updateAlert() {
      alert("후기 등록 완료!");
    },
    loginAlert() {
      alert("로그인 후 사용 가능!");
    },
    like_order(){
      this.coursebookList.sort(function(a,b){
        return b.like_count - a.like_count;
      });
    },
    view_order(){
      this.coursebookList.sort(function(a,b){
        return b.course_hit - a.course_hit;
      });
    },
    searchGroup(event) {
      const len = this.coursebookList.length;

      for (let i = 0; i < len; i++) {
        if (
          this.coursebookList[i].course_name.includes(event.target.value) === false &&
          this.coursebookList[i].course_difficulty.includes(event.target.value) === false &&
          this.coursebookList[i].course_region.includes(event.target.value) === false
        ) {
          document.querySelectorAll(".yys-list-info")[i].style.display = "none";
        } else {
          document.querySelectorAll(".yys-list-info")[i].style.display = "flex";
        }
      }



    },
    gettotalList(){
            console.log("데이터 가져오기");

            axios({
                method: 'get', // put, post, delete 
                url: `${this.$store.state.apiBaseUrl}/api/walking/coursebooktotallist`,
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                // params: guestbookVo, //get방식 파라미터로 값이 전달
                //data: guestbookVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response); //수신데이타
                this.coursebookList = response.data;

            }).catch(error => {
                console.log(error);

            });
        },
    // 나의 리스트
    getList(login_users_no, category) {
      console.log("데이터 가져오기");
      //console.log(category);
      this.login_write_Vo.login_users_no = login_users_no;
      this.login_write_Vo.write_users_no = category;
      this.$store.commit(
        "setLogin_users_no",
        this.login_write_Vo.login_users_no
      );
      this.$store.commit("setCategory", category);

      axios({
        method: "post", // put, post, delete
        url: `${this.$store.state.apiBaseUrl}/api/walking/coursebooklist`,
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        //params: course_category_no, //get방식 파라미터로 값이 전달
        data: this.login_write_Vo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

        responseType: "json", //수신타입
      })
        .then((response) => {
          //console.log(response); //수신데이타
          this.coursebookList = response.data;
          //console.log(this.coursebookList);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 즐겨찾기 리스트
    getfavoritesList(category) {
      console.log("데이터 가져오기");
      this.$store.commit("setFcategory", category);
      //console.log(category);

      axios({
        method: "post", // put, post, delete
        url: `${this.$store.state.apiBaseUrl}/api/walking/coursebookflist`,
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        //params: course_category_no, //get방식 파라미터로 값이 전달
        data: category, //put, post, delete 방식 자동으로 JSON으로 변환 전달

        responseType: "json", //수신타입
      })
        .then((response) => {
          //console.log(response); //수신데이타
          this.coursebookList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 좋아요 리스트
    getlikeList() {
      console.log("좋아요 리스트 가져오기");
      this.loginVo.users_no = this.$store.state.authUser.users_no;
      //console.log(this.loginVo);

      axios({
        method: "post", // put, post, delete
        url: `${this.$store.state.apiBaseUrl}/api/walking/courselikelist`,
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        //params: guestbookVo, //get방식 파라미터로 값이 전달
        data: this.loginVo, //put, post, de    lete 방식 자동으로 JSON으로 변환 전달

        responseType: "json", //수신타입
      })
        .then((response) => {
          //console.log(response.data.apiData); //수신데이타
          this.lList = response.data.apiData;

          // for (let index = 0; index < this.lList.length; index++) {
          //   console.log(this.lList[index]);
          //   if(this.lList[index].course_like_no == 0) {
          //     console.log("우엑");
          //   }else {
          //     console.log("우엑2");
          //   }

          // }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 후기리스트
    getreviewList(course_no) {
      //console.log("데이터 가져오기");
      //console.log(this.kakaocourse_no);
      //this.reviewVo.users_no = this.$store.state.authUser.users_no;
      


      //this.coursebookVo.course_no = course_no;
      //console.log(this.coursebookVo);

      axios({
        method: "get", // put, post, delete
        url:
          `${this.$store.state.apiBaseUrl}/api/walking/coursebookreviewlist/` +
          course_no,
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        //params: course_category_no, //get방식 파라미터로 값이 전달
        // data: this.coursebookVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

        responseType: "json", //수신타입
      })
        .then((response) => {
          //console.log(response); //수신데이타
          this.coursereviewList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 후기 등록
    reviewUpdate() {
      console.log("저장");
      this.reviewVo.users_no = this.$store.state.authUser.users_no;
      //console.log(this.reviewVo.course_no);
      //console.log("저장");
      //console.log(this.reviewVo.users_no);
      axios({
        method: "post", // put, post, delete
        url: `${this.$store.state.apiBaseUrl}/api/walking/coursebookreviewupdate`,
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        // params: guestbookVo, //get방식 파라미터로 값이 전달
        data: this.reviewVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

        responseType: "json", //수신타입
      })
        .then((response) => {
          console.log(response); //수신데이타
          //this.reviewupdateList.unshift(response.data);
          this.getreviewList(this.reviewVo.course_no);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // 해당 유저 즐겨찾기 검색
    getOneFavoritesInfo(users_no, course_no) {
      console.log("즐겨찾기 한개 데이터 가져오기");
      //console.log(course_no);
      //console.log(users_no);
      this.onefavoritesinfoVo.course_no = course_no;
      this.onefavoritesinfoVo.users_no = users_no;
      //console.log();
      //console.log(this.onefavoritesinfoVo);

      axios({
        method: "get", // put, post, delete
        url:
          `${this.$store.state.apiBaseUrl}/api/walking/onefavoritesinfo/` +
          users_no +
          `/` +
          course_no,
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        //params: course_category_no, //get방식 파라미터로 값이 전달
        //data: this.onefavoritesinfoVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

        responseType: "json", //수신타입
      })
        .then((response) => {
          //console.log(response.data.apiData); //수신데이타
          this.favoritestypeVo = response.data.apiData;
          //console.log(this.favoritestypeList);
          //console.log(this.favoritestypeVo);
          //console.log(this.favoritestypeList);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 즐겨찾기 등록
    favoritesUpdate() {
      console.log("저장");
      this.favoritesUDVo.users_no = this.$store.state.authUser.users_no;
      this.favoritesUDVo.course_no = this.onefavoritesinfoVo.course_no;
      console.log(this.favoritesUDVo);
      //this.onefavoritesinfoVo.users_no= this.$store.state.authUser.users_no;
      //console.log(this.onefavoritesinfoVo);

      axios({
        method: "post", // put, post, delete
        url: `${this.$store.state.apiBaseUrl}/api/walking/favoritesupdatedelete`,
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        // params: guestbookVo, //get방식 파라미터로 값이 전달
        data: this.favoritesUDVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

        responseType: "json", //수신타입
      })
        .then((response) => {
          console.log(response.data); //수신데이타
          //this.reviewupdateList.unshift(response.data);
          //this.getreviewList(this.reviewVo.course_no);
          //this.favorites = false;
          //this.favorites2 = true;
          this.getOneFavoritesInfo(
            this.favoritesUDVo.users_no,
            this.favoritesUDVo.course_no
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 즐겨찾기 삭제
    favoritesDelete() {
      console.log("삭제");
      this.favoritesUDVo.users_no = this.$store.state.authUser.users_no;
      this.favoritesUDVo.course_no = this.onefavoritesinfoVo.course_no;
      console.log(this.favoritesUDVo);
      //this.coursebookVo.users_no= this.$store.state.authUser.users_no;
      //console.log(this.onefavoritesinfoVo);

      axios({
        method: "delete", // put, post, delete
        url: `${this.$store.state.apiBaseUrl}/api/walking/favoritesupdatedelete`,
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        // params: guestbookVo, //get방식 파라미터로 값이 전달
        data: this.favoritesUDVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

        responseType: "json", //수신타입
      })
        .then((response) => {
          console.log(response.data); //수신데이타
          //this.reviewupdateList.unshift(response.data);
          //this.getreviewList(this.reviewVo.course_no);
          //this.favorites = true;
          //this.favorites2 = false;
          this.getOneFavoritesInfo(
            this.favoritesUDVo.users_no,
            this.favoritesUDVo.course_no
          );
          // this.getfavoritesList(
          //   this.$store.state.login_users_no,
          //   this.$store.state.category
          // );
          //this.coursebookList.unshift(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // 좋아요 등록
    likeUpdate(users_no, course_no) {
      console.log("좋아요저장");
      this.likeUDVo.users_no = users_no;
      this.likeUDVo.course_no = course_no;
      //console.log(this.likeUDVo);

      axios({
        method: "post", // put, post, delete
        url: `${this.$store.state.apiBaseUrl}/api/walking/likeupdatedelete`,
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        // params: guestbookVo, //get방식 파라미터로 값이 전달
        data: this.likeUDVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

        responseType: "json", //수신타입
      })
        .then((response) => {
          console.log(response.data); //수신데이타
          
          this.getList(
            this.$store.state.login_users_no,
            this.$store.state.category
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 좋아요 삭제
    likeDelete(users_no, course_no) {
      console.log("좋아요삭제");
      this.likeUDVo.users_no = users_no;
      this.likeUDVo.course_no = course_no;
      //console.log(this.likeUDVo);

      axios({
        method: "delete", // put, post, delete
        url: `${this.$store.state.apiBaseUrl}/api/walking/likeupdatedelete`,
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        // params: guestbookVo, //get방식 파라미터로 값이 전달
        data: this.likeUDVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

        responseType: "json", //수신타입
      })
        .then((response) => {
          console.log(response); //수신데이타
          
          this.getList(
            this.$store.state.login_users_no,
            this.$store.state.fcategory
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openModal() {
      this.isModalViewed = true; // 모달 창을 열기 위해 true로 설정
      this.listcolor = "white";
    },
    openModal2() {
      this.isModalViewed2 = true; // 모달 창을 열기 위해 true로 설정
    },
    closeModal() {
      this.isModalViewed = false;
      this.listcolor = "white";
    },

    // 조회수 수정
    listviewModify(course_no) {
      console.log("수정");
      //console.log(course_no);
      this.listviewModifyVo.course_no = course_no;
      

      axios({
        method: "put", // put, post, delete
        url: `${this.$store.state.apiBaseUrl}/api/walking/coursebook_list_view_modify`,
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        // params: guestbookVo, //get방식 파라미터로 값이 전달
        data: this.listviewModifyVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

        responseType: "json", //수신타입
      })
        .then((response) => {
          console.log(response); //수신데이타
          // this.getList(
          //   this.$store.state.login_users_no,
          //   this.$store.state.category
          // );
          
          
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    //this.KakaoMap;
    //this.getlikeList();
    if(this.$store.state.authUser == null) {
      this.gettotalList();
    }else if(this.$store.state.authUser != null) {
      this.getList(this.$store.state.authUser.users_no);

    }
  },
};
</script>
