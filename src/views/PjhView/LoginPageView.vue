<template>
  <div>
    <AppHeader />

    <div class="">

      <div id="pjh-LoginPageBox" class="pjh-LoginPage">
        <div id="pjh-LoginPageLogo" class="pjh-LoginPage">
          <p>로그인</p>
        </div>
        <form @submit.prevent="login" action="" method="">
          <div class="pjh-LoginPageIdPw">
            <div class="pjh-LoginPageId">
              <label id="pjh-LoginPageIdLogo" for="pjh-LoginPageInput-id">아이디</label>
              <input id="pjh-LoginPageInput-id" class="pjh-LoginPageInput-class" type="text" v-model="userslistVo.users_id">
            </div>

            <div class="pjh-LoginPagePw">
              <label id="pjh-LoginPagePwLogo" for="pjh-LoginPageInput-pw">비밀번호</label>
              <input id="pjh-LoginPageInput-pw" name="password" class="pjh-LoginPageInput-class" type="password" v-model="userslistVo.users_pw">
              <span class="toggle-password" @click="togglePasswordVisibility">
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </span>
            </div>
          </div>

          <div id="pjh-pjh-LoginpagejoinloginBtn" class="pjh-LoginPage">
            <div id="pjh-LoginpagejoinButtonSize">
              <button id="pjh-LoginpagejoinButton" type="button">
                <router-link id="pjh-LoginpagejoinButtonFont" to="/walking/joinpage">회원가입</router-link>
              </button>
            </div>

            <div id="pjh-LoginpageLoginButtonSize">
              <button id="pjh-LoginpageLoginButton" type="submit">로그인</button>
            </div>
          </div>
        </form>
        <div id="pjh-APILogin">

          <div class="pjh-apiLoginButton">
            <button id="pjh-apikakaoButton" type="button" @click="onClickLogin()"></button>
          </div>

          <div class="pjh-apiLoginButton">
            <button id="pjh-apinaverButton" type="button"></button>
          </div>

          <div class="pjh-apiLoginButton">
            <button id="pjh-apigoogleButton" type="button"></button>
          </div>

          <div class="pjh-apiLoginButton">
            <button id="pjh-apifacebookButton" type="button"></button>
          </div>
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
import axois from 'axios';



export default {
  name: 'LoginPageView',
  components: {
    AppFooter,
    AppHeader,
  },
  data() {
    return {
      userslistVo:{
        users_id: "",
        users_pw: "",
      },
      showPassword: false // 초기에는 비밀번호 감춤
    };
  },
  methods: {
    login() {
      console.log("로그인");

      axois({
        method: 'post', // put, post, delete                   
        url: 'http://localhost:9020/api/walking/loginpage',
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        //params: guestbookVo, //get방식 파라미터로 값이 전달
        data: this.userslistVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

        responseType: 'json' //수신타입
      }).then(response => {
        console.log(response); //수신데이터

        if (response.data.result == "success") {
          let authUser = response.data.apiData;

          const token = response.headers.authorization.split(" ")[1];

          this.$store.commit("setAuthUser", authUser);
          this.$store.commit("setToken", token);

          this.$store.commit("setAuthUser", authUser);
          this.$store.commit("setToken", token);

          console.log(authUser);
          console.log(token);

          this.$router.push({ path: '/' });

        } else {
          console.log(response.data.message);
          alert("아이디 패스워드를 확인하세요");
        }

      }).catch(error => {
        console.log(error);
      });

    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword; // 비밀번호 보이기/감추기 전환
      const passwordInput = document.getElementById('pjh-LoginPageInput-pw');
      if (this.showPassword) {
        passwordInput.type = 'text'; // 비밀번호 보이기
      } else {
        passwordInput.type = 'password'; // 비밀번호 감추기
      }
    },
    onClickLogin() {
      window.Kakao.Auth.authorize({
        scope: "profile_nickname, profile_image, account_email, name, gender, age_range, birthday, birthyear, phone_number",
        success: this.getKakaoAccount,

      })
    },
    getKakaoAccount() {
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: (res) => {
          const kakao_account = res.kakao_account;
          const ninkname = kakao_account.profile.ninkname;
          const image = kakao_account.profile.image;
          const email = kakao_account.email;
          const name = kakao_account.name;
          const gender = kakao_account.gender;
          const age_range = kakao_account.age_range;
          const birthday = kakao_account.birthday;
          const birthyear = kakao_account.birthyear;
          const phone_number = kakao_account.phone_number;
          console.log("ninkname", ninkname);
          console.log("image", image);
          console.log("email", email);
          console.log("name", name);
          console.log("gender", gender);
          console.log("age_range", age_range);
          console.log("birthday", birthday);
          console.log("birthyear", birthyear);
          console.log("phone_number", phone_number);



          //로그인처리구현

          alert("로그인 성공!");
        },
        fail: (error) => {
          console.log(error);
        },

      });
    },
  },

  created() { }
};

</script>
