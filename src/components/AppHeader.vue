<template>
  <div>
    <div class="ksb-header">
      <div class="ksb-header-All">
        <div class="title"></div>
        <div class="title">
          <router-link to="/">
            <h1>
              걸음걸음
              <img
                class="footprint"
                src="@/assets/img/발자국.png"
                alt="걸음걸음"
              />
            </h1>
          </router-link>
        </div>

        <div class="title">
          <div id="ksb-btn-box">
            <ul v-if="this.$store.state.authUser != null">
              <span>{{ this.$store.state.authUser.users_nickname }} 님</span>
              <button
                v-on:click="logout"
                type="button"
                class="btn_s"
                id="logout-btn"
              >
                <router-link id="logout-btn-go-mainpage" to="/"
                  >로그아웃</router-link
                >
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
            <router-link
              to="/walking/coursedraw"
              v-if="this.$store.state.authUser != null"
              >코스 그리기</router-link
            >
            <router-link
              to="/walking/loginpage"
              @click="courseAlert"
              v-else-if="this.$store.state.authUser == null"
              >코스 그리기</router-link
            >
          </li>
          <li>
            <router-link
              :to="{ path: '/walking/amenity' }"
              @click="Refresh('/walking/amenity')"
              >편의시설</router-link
            >
          </li>
          <li><router-link to="/walking/gallery">갤러리</router-link></li>
          <li>
            <router-link to="/walking/smallgatheringpage">소모임</router-link>
          </li>
          <li>
            <router-link
              to="/walking/mypage"
              v-if="this.$store.state.authUser != null"
              >마이페이지</router-link
            >
            <router-link
              to="/walking/loginpage"
              @click="courseAlert"
              v-else-if="this.$store.state.authUser == null"
              >마이페이지</router-link
            >
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
    return {};
  },
  methods: {
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
        this.$store.commit("setToken", null);
      } else if (this.$store.state.authUser.users_login_type == 1) {
        // 카카오 로그아웃 API 호출
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
      } else if (this.$store.state.authUser.users_login_type == 2) {
        console.log("네이버 로그아웃");

        // 네이버 로그아웃 API 호출
        // 로컬 로그아웃 처리: 네이버는 로그아웃 리다렉트를 지원하지 않는다고 하네요?하하
        this.$store.commit("setAuthUser", null);
        this.$store.commit("setToken", null);
        this.$store.commit("setNaverToken", null);

        window.location.href = "http://localhost:8080/";
      } else if (this.$store.state.authUser.users_login_type == 3) {
        console.log("구글 로그아웃");
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
          window.location.href = "http://localhost:8080/";
        } catch (error) {
          console.error("구글 로그아웃 실패:", error);
        }
      }

      // 로그아웃 후 메인 페이지로 리다이렉트
      this.$router.push("/");
    },
  },

  created() {},
};
</script>
