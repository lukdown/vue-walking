<template>
  <div>
    <AppHeader />

    <div class="">

      <div id="pjh-LoginPageBox" class="pjh-LoginPage">
        <div id="pjh-LoginPageLogo" class="pjh-LoginPage">
          <p>로그인</p>
        </div>

        <div class="pjh-LoginPageIdPw">
          <div class="pjh-LoginPageIdAndPw">
            <label id="pjh-LoginPageIdLogo" for="pjh-LoginPageInput-id">ID</label>
            <input id="pjh-LoginPageInput-id" class="pjh-LoginPageInput-class" type="text">
          </div>

          <div class="pjh-LoginPageIdAndPw">
            <label id="pjh-LoginPagePwLogo" for="pjh-LoginPageInput-pw">PW</label>
            <input id="pjh-LoginPageInput-pw" class="pjh-LoginPageInput-class" type="password">
          </div>
        </div>

        <div id="pjh-LoginButtonSize" class="pjh-LoginPage">
          <button id="pjh-LoginButton" type="button">로그인</button>
        </div>

        <div id="pjh-kakaoLoginButton" class="pjh-LoginPage">
          <button id="pjh-kakaoButton" type="button"></button>
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
  methods: {},
  created() { }
};
</script>
