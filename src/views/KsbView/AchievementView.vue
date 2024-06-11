<template>
  <div>
    <AppHeader />
    <div id="ksb-achieve-All">
      <div id="yys-box">
        <div id="ksb-achieve-subTitle">
          <h2>도전과제</h2>
          <span>{{ currentPage }} / {{ totalPages }}</span>
          <span>달성완료 {{ challenge_complete.challenge_complete_count }}/{{ challenge_complete.challenge_count }} 개</span>
        </div>
        <div id="yys-box2">
          <div id="ksb-achieve-bookArea">
            
            <div id="yys-achieve-List-box">
                <ul class="ksb-achieve-List">
                  <li id="ksb-achieve-imgArea" v-for="item in leftColumn" :key="item.id">
                      
                      <div class="yys-img-bg">
                        <img :src="`${this.$store.state.apiBaseUrl}/upload/${item.saveName}`" alt="" class="ksb-achieve-Img" v-if="item.is_challenge_t_f == 1"/>
                      </div>
                      
                    <div class="ksb-achieve-text">
                      <p>{{ item.challenge_name }}</p>
                      <span>{{ item.challenge_explanation }}</span>
                    </div>
                  </li>
                </ul>
                <ul class="ksb-achieve-List">
                  <li id="ksb-achieve-imgArea" v-for="item in rightColumn" :key="item.id">

                      
                      <div class="yys-img-bg">
                        <img :src="`${this.$store.state.apiBaseUrl}/upload/${item.saveName}`" alt="" class="ksb-achieve-Img" v-if="item.is_challenge_t_f == 1" />
                      </div>

                    <div class="ksb-achieve-text">
                      <p>{{ item.challenge_name }}</p>
                      <span>{{ item.challenge_explanation }}</span>
                    </div>
                  </li>
                </ul>
              </div>

                <div id="yys-paging-btn">
                  <div class="yys-btn">
                    <button class="yys-arrow-img" v-if="currentPage > 1" @click="currentPage--">이전</button>
                  </div>
                  <span id="yys-btn-center"></span>
                  <div class="yys-btn">
                    <button class="yys-arrow-img" v-if="currentPage < totalPages" @click="currentPage++">다음</button>
                  </div>
                </div>
              </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>


<script>
import axios from "axios";
import "@/assets/css/KsbCss/Achievement.css";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";

export default {
  name: "AchievementView",
  components: {
    AppFooter,
    AppHeader,
  },
  data() {
    return {
      challengeList: [],
      currentPage: 1, // 현재 페이지 번호
      postsPerPage: 6, // 한 페이지에 보여줄 게시글의 개수
      users_InfoVo: {
        users_no: '',
        users_kcal: '',
        users_length: '',
      },
      challengeVo: {
        users_no: '',
        challenge_no: '',
      },
      challenge_complete: {
        challenge_complete_count: '',
        challenge_count: '',
      },
    };
  },
  computed: {
    displayedPosts() {
      const startIndex = (this.currentPage - 1) * this.postsPerPage;
      const endIndex = startIndex + this.postsPerPage;
      return this.challengeList.slice(startIndex, endIndex);
    },
    leftColumn() {
      return this.displayedPosts.slice(0, 3);
    },
    rightColumn() {
      return this.displayedPosts.slice(3);
    },
    totalPages() {
      return Math.ceil(this.challengeList.length / this.postsPerPage);
    },
  },
  methods: {
    getchallengeList() {
      //console.log("도전과제 리스트 가져오기");

      axios({
        method: "get", 
        url: `${this.$store.state.apiBaseUrl}/api/walking/mypage_challenge_list`,
        headers: { "Content-Type": "application/json; charset=utf-8",
                    Authorization: "Bearer " + this.$store.state.token
         }, 
        responseType: "json", 
      })
        .then((response) => {
          this.challengeList = response.data.apiData;
          //console.log(this.challengeList);

        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 로그인 유저 정보
    getUsers_Info() {
      console.log("데이터 가져오기");

      axios({
        method: "get", 
        url: `${this.$store.state.apiBaseUrl}/api/walking/mypage_users_info`,
        headers: { "Content-Type": "application/json; charset=utf-8",
                    Authorization: "Bearer " + this.$store.state.token
         }, 
        responseType: "json", 
      }).then((response) => {
          //console.log(response.data.apiData); 
          this.users_InfoVo = response.data.apiData;
          console.log(this.users_InfoVo);

          
          if(this.users_InfoVo.users_length >= 30000 && this.users_InfoVo.users_length < 50000) {
            for (let index = 0; index < this.challengeList.length; index++) {
              this.getchallengeList();
              if(this.challengeList[index].is_challenge_t_f == 0 && this.challengeList[index].challenge_no == 1) {
                this.challengeUpdate(1);
              }
            }
          } 
          if(this.users_InfoVo.users_length < 30000 && this.users_InfoVo.users_length >= 20000) {
            for (let index = 0; index < this.challengeList.length; index++) {
              this.getchallengeList();
              if(this.challengeList[index].is_challenge_t_f == 0 && this.challengeList[index].challenge_no == 2) {
                this.challengeUpdate(2);
              }
            }
          }
          if(this.users_InfoVo.users_no != null) {
            for (let index = 0; index < this.challengeList.length; index++) {
              this.getchallengeList();
              if(this.challengeList[index].is_challenge_t_f == 0 && this.challengeList[index].challenge_no == 3) {
                this.challengeUpdate(3);
              }
            }
          }
          if(this.users_InfoVo.small_group_count >= 100) {
            for (let index = 0; index < this.challengeList.length; index++) {
              this.getchallengeList();
              if(this.challengeList[index].is_challenge_t_f == 0 && this.challengeList[index].challenge_no == 4) {
                this.challengeUpdate(4);
              }
            }
          }
          if(this.users_InfoVo.course_users_count >= 15) {
            for (let index = 0; index < this.challengeList.length; index++) {
              this.getchallengeList();
              if(this.challengeList[index].is_challenge_t_f == 0 && this.challengeList[index].challenge_no == 5) {
                this.challengeUpdate(5);
              }
            }
          }
          if(this.users_InfoVo.course_users_sum_hit >= 100000) {
            for (let index = 0; index < this.challengeList.length; index++) {
              this.getchallengeList();
              if(this.challengeList[index].is_challenge_t_f == 0 && this.challengeList[index].challenge_no == 6) {
                this.challengeUpdate(6);
              }
            }
          }
          if(this.users_InfoVo.review_users_count >= 100) {
            for (let index = 0; index < this.challengeList.length; index++) {
              this.getchallengeList();
              if(this.challengeList[index].is_challenge_t_f == 0 && this.challengeList[index].challenge_no == 7) {
                this.challengeUpdate(7);
              }
            }
          }
          if(this.users_InfoVo.gallery_users_count >= 100) {
            for (let index = 0; index < this.challengeList.length; index++) {
              this.getchallengeList();
              if(this.challengeList[index].is_challenge_t_f == 0 && this.challengeList[index].challenge_no == 8) {
                this.challengeUpdate(8);
              }
            }
          }
          if(this.users_InfoVo.users_length >= 50000) {
            for (let index = 0; index < this.challengeList.length; index++) {
              this.getchallengeList();
              if(this.challengeList[index].is_challenge_t_f == 0 && this.challengeList[index].challenge_no == 9) {
                this.challengeUpdate(9);
              }
            }
          } 
          if(this.users_InfoVo.users_kcal >= 30000) {
            for (let index = 0; index < this.challengeList.length; index++) {
              this.getchallengeList();
              if(this.challengeList[index].is_challenge_t_f == 0 && this.challengeList[index].challenge_no == 10) {
                this.challengeUpdate(10);
              }
            }
          }

          this.getChallenge_Complete();
          
         

        }).catch((error) => {
              console.log(error);
          });
    },
    // 개인 도전 과제 등록
    challengeUpdate(challenge_no) {
          console.log("개인 도전 과제 저장");
          this.challengeVo.users_no = this.$store.state.authUser.users_no;
          this.challengeVo.challenge_no = challenge_no;
          //console.log(this.challengeVo);
          axios({
            method: "post", // put, post, delete
            url: `${this.$store.state.apiBaseUrl}/api/walking/challengeupdate`,
            headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
            // params: guestbookVo, //get방식 파라미터로 값이 전달
            data: this.challengeVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

            responseType: "json", //수신타입
          }).then((response) => {
              console.log(response.data); //수신데이타
              
          }).catch((error) => {
              console.log(error);
          });
        },

        // 과제 달성 정보
        getChallenge_Complete() {
          console.log("데이터 가져오기");

          axios({
            method: "get", 
            url: `${this.$store.state.apiBaseUrl}/api/walking/mypage_challenge_complete`,
            headers: { "Content-Type": "application/json; charset=utf-8",
                        Authorization: "Bearer " + this.$store.state.token
            }, 
            responseType: "json", 
          }).then((response) => {
              //console.log(response.data.apiData); 
              this.challenge_complete = response.data.apiData;
              console.log(this.challenge_complete);

            }).catch((error) => {
                  console.log(error);
              });
        },


  },
  created() {
    this.getchallengeList();
    this.getUsers_Info();
    this.getChallenge_Complete();
  },
};
</script>

