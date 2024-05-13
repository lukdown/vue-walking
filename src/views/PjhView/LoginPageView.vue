<template>
  <div>
    <AppHeader />

    <div class="">

      <div id="pjh-LoginPageBox" class="pjh-LoginPage">
        <div id="pjh-LoginPageLogo" class="pjh-LoginPage">
          <p>로그인</p>
        </div>

        <div class="pjh-LoginPageIdPw">
          <div class="pjh-LoginPageId">
            <label id="pjh-LoginPageIdLogo" for="pjh-LoginPageInput-id">아이디</label>
            <input id="pjh-LoginPageInput-id" class="pjh-LoginPageInput-class" type="text">
          </div>

          <div class="pjh-LoginPagePw">
            <label id="pjh-LoginPagePwLogo" for="pjh-LoginPageInput-pw">비밀번호</label>
            <input id="pjh-LoginPageInput-pw" class="pjh-LoginPageInput-class" type="password">
          </div>
        </div>

        <div id="pjh-pjh-LoginpagejoinloginBtn" class="pjh-LoginPage">
          <div id="pjh-LoginpagejoinButtonSize">
            <button id="pjh-LoginpagejoinButton" type="button">
              <router-link id="pjh-LoginpagejoinButtonFont" to="/walking/joinpage">회원가입</router-link>
            </button>
          </div>

          <div id="pjh-LoginpageLoginButtonSize">
            <button id="pjh-LoginpageLoginButton" type="button">로그인</button>
          </div>
        </div>

        <div id="pjh-kakaoLoginButton" class="pjh-LoginPage">
          <button id="pjh-kakaoButton" type="button" @click="onClickLogin()"></button>
        </div>

      </div>

    </div>

    <AppFooter />
  </div>
</template>


<script>
import "@/assets/css/PjhCss/LoginPageView.css";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";


export default {
  name: 'LoginPageView',
  components: {
    AppFooter,
    AppHeader,
  },
  data() {
    return {};
  },
  methods: {
    onClickLogin() {
      window.Kakao.Auth.authorize({
        redirectUri:'http://localhost:8080/'
      })
    },
    
  },
 
  created() { }
};

</script>
