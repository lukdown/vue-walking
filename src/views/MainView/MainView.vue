<template>
  <div>
    <AppHeader />
    <div class="ksb-content">
      <div>
        <div id="ksb-img-area">
          <vueper-slides autoplay>
            <vueper-slide
              v-for="(slide, i) in slides"
              :key="i"
              :title="slide.title"
              :content="slide.content"
              :image="slide.image"
            />

            <template #pause>
              <i class="icon pause_circle_outline"></i>
            </template>
          </vueper-slides>
        </div>

        <div id="ksb-mainUl">
          <ul>
            <li>
              <img
                id="ksb-google-img"
                src="../../assets/img/Google_Play_2022_icon.svg.png"
                alt=""
              />
            </li>
            <li>
              <img
                id="ksb-apple-img"
                src="../../assets/img/icon_appstore__ev0z770zyxoy_large_2x.png"
                alt=""
              />
            </li>
            <li id="ksb-p1">걸음걸음</li>
            <li id="ksb-p2">
              걸음걸음 앱은 앱스토어나 Google Play에서 <br />
              다운로드하실 수 있습니다.
            </li>
          </ul>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import "@/assets/css/MainCss/MainView.css";
import axios from "axios";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

export default {
  name: "MainView",
  components: {
    AppFooter,
    AppHeader,
    VueperSlides,
    VueperSlide,
  },
  data() {
    return {
      challengeList: [],
      users_InfoVo: {
        users_no: "",
        users_kcal: "",
        users_length: "",
      },
      challengeVo: {
        users_no: "",
        challenge_no: "",
      },
      challenge_complete: {
        challenge_complete_count: "",
        challenge_count: "",
      },
      pauseOnHover: true,
      autoPlaying: true,
      internalAutoPlaying: true,
      slides: [
        {
          image: require("../../assets/img/메인도심속.gif"),
        },
        {
          image: require("../../assets/img/배경테스트.gif"),
        },
        {
          image: require("../../assets/img/메인도심속.png"),
        },
        {
          image: require("../../assets/img/메인분포.png"),
        },
        // Other slides...
      ],
    };
  },
  methods: {
    // 로그인 유저 정보
    getUsers_Info() {
      console.log("데이터 가져오기");

      axios({
        method: "get",
        url: `${this.$store.state.apiBaseUrl}/api/walking/mypage_users_info`,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + this.$store.state.token,
        },
        responseType: "json",
      })
        .then((response) => {
          //console.log(response.data.apiData);
          this.users_InfoVo = response.data.apiData;
          console.log(this.users_InfoVo);

          if (
            this.users_InfoVo.users_length >= 30000 &&
            this.users_InfoVo.users_length < 50000
          ) {
            for (let index = 0; index < this.challengeList.length; index++) {
              this.getchallengeList();
              if (
                this.challengeList[index].is_challenge_t_f == 0 &&
                this.challengeList[index].challenge_no == 1
              ) {
                this.challengeUpdate(1);
              }
            }
          }
          if (
            this.users_InfoVo.users_length < 30000 &&
            this.users_InfoVo.users_length >= 20000
          ) {
            for (let index = 0; index < this.challengeList.length; index++) {
              this.getchallengeList();
              if (
                this.challengeList[index].is_challenge_t_f == 0 &&
                this.challengeList[index].challenge_no == 2
              ) {
                this.challengeUpdate(2);
              }
            }
          }
          if (this.users_InfoVo.users_no != null) {
            for (let index = 0; index < this.challengeList.length; index++) {
              this.getchallengeList();
              if (
                this.challengeList[index].is_challenge_t_f == 0 &&
                this.challengeList[index].challenge_no == 3
              ) {
                this.challengeUpdate(3);
              }
            }
          }
          if (this.users_InfoVo.small_group_count >= 100) {
            for (let index = 0; index < this.challengeList.length; index++) {
              this.getchallengeList();
              if (
                this.challengeList[index].is_challenge_t_f == 0 &&
                this.challengeList[index].challenge_no == 4
              ) {
                this.challengeUpdate(4);
              }
            }
          }
          if (this.users_InfoVo.course_users_count >= 15) {
            for (let index = 0; index < this.challengeList.length; index++) {
              this.getchallengeList();
              if (
                this.challengeList[index].is_challenge_t_f == 0 &&
                this.challengeList[index].challenge_no == 5
              ) {
                this.challengeUpdate(5);
              }
            }
          }
          if (this.users_InfoVo.course_users_sum_hit >= 100000) {
            for (let index = 0; index < this.challengeList.length; index++) {
              this.getchallengeList();
              if (
                this.challengeList[index].is_challenge_t_f == 0 &&
                this.challengeList[index].challenge_no == 6
              ) {
                this.challengeUpdate(6);
              }
            }
          }
          if (this.users_InfoVo.review_users_count >= 100) {
            for (let index = 0; index < this.challengeList.length; index++) {
              this.getchallengeList();
              if (
                this.challengeList[index].is_challenge_t_f == 0 &&
                this.challengeList[index].challenge_no == 7
              ) {
                this.challengeUpdate(7);
              }
            }
          }
          if (this.users_InfoVo.gallery_users_count >= 100) {
            for (let index = 0; index < this.challengeList.length; index++) {
              this.getchallengeList();
              if (
                this.challengeList[index].is_challenge_t_f == 0 &&
                this.challengeList[index].challenge_no == 8
              ) {
                this.challengeUpdate(8);
              }
            }
          }
          if (this.users_InfoVo.users_length >= 50000) {
            for (let index = 0; index < this.challengeList.length; index++) {
              this.getchallengeList();
              if (
                this.challengeList[index].is_challenge_t_f == 0 &&
                this.challengeList[index].challenge_no == 9
              ) {
                this.challengeUpdate(9);
              }
            }
          }
          if (this.users_InfoVo.users_kcal >= 30000) {
            for (let index = 0; index < this.challengeList.length; index++) {
              this.getchallengeList();
              if (
                this.challengeList[index].is_challenge_t_f == 0 &&
                this.challengeList[index].challenge_no == 10
              ) {
                this.challengeUpdate(10);
              }
            }
          }

          this.getChallenge_Complete();
        })
        .catch((error) => {
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
      })
        .then((response) => {
          console.log(response.data); //수신데이타
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // 과제 달성 정보
    getChallenge_Complete() {
      console.log("데이터 가져오기");

      axios({
        method: "get",
        url: `${this.$store.state.apiBaseUrl}/api/walking/mypage_challenge_complete`,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + this.$store.state.token,
        },
        responseType: "json",
      })
        .then((response) => {
          //console.log(response.data.apiData);
          this.challenge_complete = response.data.apiData;
          console.log(this.challenge_complete);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getchallengeList() {
      //console.log("도전과제 리스트 가져오기");

      axios({
        method: "get",
        url: `${this.$store.state.apiBaseUrl}/api/walking/mypage_challenge_list`,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + this.$store.state.token,
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
  },
  created() {
    this.getchallengeList();
    this.getUsers_Info();
    this.getChallenge_Complete();
  },
};
</script>
