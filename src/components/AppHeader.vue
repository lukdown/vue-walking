<template>
  <div>
    <div class="ksb-header">
      <div class="ksb-header-All">
        <div class="title"></div>
        <div class="title">
          <router-link to="/">
            <h1>
              걸음걸음
              <img class="footprint" src="@/assets/img/발자국.png" alt="걸음걸음" />
            </h1>
          </router-link>
        </div>

        <div class="title">
          <div id="ksb-btn-box">
            <ul v-if="this.$store.state.authUser != null">
              <span>{{ this.$store.state.authUser.users_nickname }} 님</span>
              <button v-on:click="logout" type="button" class="btn_s" id="logout-btn">
                <router-link id="logout-btn-go-mainpage" to="/">로그아웃</router-link>
              </button>
            </ul>

            <ul v-if="this.$store.state.authUser == null" id="header-ul2">
              <router-link to="/walking/loginpage">로그인</router-link>
              <router-link to="/walking/joinpage">회원가입</router-link>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <nav class="ksb-nav">
      <div class="ksb-nav_menuAll">
        <ul class="ksb-nav_menu">
          <li>
            <router-link to="/walking/coursebook/list">코스북</router-link>
          </li>
          <li>
            <router-link to="/walking/coursedraw" v-if="this.$store.state.authUser != null">코스 그리기</router-link>
            <router-link to="/walking/loginpage" @click="courseAlert" v-else-if="this.$store.state.authUser == null">코스
              그리기</router-link>
          </li>
          <li>
            <router-link :to="{ path: '/walking/amenity' }" @click="Refresh('/walking/amenity')">편의시설</router-link>
          </li>
          <li><router-link to="/walking/gallery">갤러리</router-link></li>
          <li>
            <router-link to="/walking/smallgatheringpage">소모임</router-link>
          </li>
          <li>
            <router-link to="/walking/mypage" v-if="this.$store.state.authUser != null">마이페이지</router-link>
            <router-link to="/walking/loginpage" @click="courseAlert"
              v-else-if="this.$store.state.authUser == null">마이페이지</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
import "@/assets/css/AppHeader.css";
import axios from "axios";

export default {
  name: "AppHeader",
  components: {},
  data() {
    return {
      users_InfoVo: {
        users_no: '',
        users_kcal: '',
        users_length: '',
      },
    };
  },
  methods: {
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
    courseAlert() {
      alert("로그인을 해주세요");
    },
    Refresh(url) {
      window.location.href = url;
    },
    async logout() {
      console.log("로그아웃이다 임마!!!");
      
      if (this.$store.state.authUser.users_login_type == 0) {
        console.log("일반 로그아웃");
        this.$store.commit("setAuthUser", null);
        this.$store.commit("setToken", null);
      } else if (this.$store.state.authUser.users_login_type == 1) {
        // 카카오 로그아웃 API 호출
        if (this.$store.state.kakaoToken != null) {
          try {
            const kakaoToken = this.$store.state.kakaoToken;

            await axios({
              method: "post",
              url: "https://kapi.kakao.com/v1/user/logout",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${kakaoToken}`,
              },
            });

            await axios({
              method: "get",
              url: `${this.$store.state.apiBaseUrl}/api/walking/kakaologout`,
              params: { "Content-Type": "application/json; charset=utf-8" },
            })
              .then((response) => {
                console.log(response.data);
                console.warn("warn : " + response);
                // 로컬 로그아웃 처리
                this.$store.commit("setAuthUser", null);
                this.$store.commit("setToken", null);
                this.$store.commit("setKakaoToken", null);
                window.location.href = response.data;
              })
              .catch((error) => {
                console.log(error);
              });
          } catch (error) {
            console.error("카카오 로그아웃 실패:", error);
          }
        } else {
          this.$store.commit("setAuthUser", null);
          this.$store.commit("setToken", null);
        }

      } else if (this.$store.state.authUser.users_login_type == 2) {
        console.log("네이버 로그아웃");

        // 네이버 로그아웃 API 호출
        // 로컬 로그아웃 처리: 네이버는 로그아웃 리다렉트를 지원하지 않는다고 하네요?하하
        this.$store.commit("setAuthUser", null);
        this.$store.commit("setToken", null);
        this.$store.commit("setNaverToken", null);

        window.location.href = "/";
      } else if (this.$store.state.authUser.users_login_type == 3) {
        console.log("구글 로그아웃");
        console.log(this.$store.state.googleToken);
        try {
          const googleToken = this.$store.state.googleToken;
          //console.log(googleToken);
          await axios({
            method: "post",
            url: "https://accounts.google.com/o/oauth2/revoke",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            data: `token=${googleToken}`,
          });
          //console.log("dmadadadadadad");

          this.$store.commit("setAuthUser", null);
          this.$store.commit("setToken", null);
          this.$store.commit("setGoogleToken", null);
          window.location.href = "/";
        } catch (error) {
          console.error("구글 로그아웃 실패:", error);
        }
      }

      // 로그아웃 후 메인 페이지로 리다이렉트
      this.$router.push("/");
    },
  },

  created() { 
    this.getUsers_Info();
    this.getChallenge_Complete();
  },
};
</script>
