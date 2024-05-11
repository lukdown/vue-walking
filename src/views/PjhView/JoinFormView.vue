<template>
  <div>
    <AppHeader />

    <div class="">
      <form action="">
        <div id="pjh-joinform-id" class="pjh-joinform">

          <div id="pjh-joinformLogo" class="pjh-joinform">
            <p>회원가입</p>
          </div>

          <div class="pjh-joinformLabalID">
            <label id="pjh-joinformIdLogo" for="pjh-joinformIdinput">아이디</label>
            <input id="pjh-joinformIdinput" class="pjh-joinforminput-class" type="text">
            <button id="pjh-joinformDuplicateButton" type="button">중복체크</button>
          </div>

          <div class="pjh-joinformLabalPW">
            <label class="pjh-joinformLabal" for="">비밀번호</label>
            <input class="pjh-joinforminput-class" type="password">
          </div>

          <div class="pjh-joinformLabalName">
            <label class="pjh-joinformLabal" for="">이름</label>
            <input class="pjh-joinforminput-class" type="text">
          </div>

          <div class="pjh-joinformLabalNickName">
            <label class="pjh-joinformLabal" for="">닉네임</label>
            <input class="pjh-joinforminput-class" type="text">
          </div>

          <div class="pjh-joinformLabalHp">
            <label class="pjh-joinformLabal" for="">핸드폰</label>
            <input class="pjh-joinforminput-class" type="text">
          </div>

          <div class="pjh-joinformLabalBirthDate">
            <label class="pjh-joinformLabal" for="">생년월일</label>
            <select class="pjh-joinformSelectBox" name="" id="">
              <option value="일단">1999</option>
              <option value="일단">1999</option>
              <option value="일단">1999</option>
              <option value="일단">1999</option>
            </select>

            <select class="pjh-joinformSelectBox" name="" id="">
              <option value="아무거나">09</option>
              <option value="아무거나">09</option>
              <option value="아무거나">09</option>
              <option value="아무거나">09</option>
            </select>

            <select class="pjh-joinformSelectBox" name="" id="">
              <option value="넣어">09</option>
              <option value="넣어">09</option>
              <option value="넣어">09</option>
              <option value="넣어">09</option>
            </select>
          </div>

          <div class="pjh-joinformLabalGender">
            <label class="pjh-joinformLabal" for="">성별</label>

            <label class="pjh-joinformGenderLabal" for="">남</label>
            <input class="pjh-joinformGenderRadio" type="radio" name="gender">

            <label class="pjh-joinformGenderLabal" for="">여</label>
            <input class="pjh-joinformGenderRadio" type="radio" name="gender">

          </div>

          <div class="pjh-joinformLabalRegion">
            <label class="pjh-joinformLabal" for="">지역</label>
            <select class="pjh-joinformSelectBox" name="" id="">
              <option value="일단">일단</option>
              <option value="일단">일단</option>
              <option value="일단">일단</option>
              <option value="일단">일단</option>
            </select>

            <select class="pjh-joinformSelectBox" name="" id="">
              <option value="아무거나">아무거나</option>
              <option value="아무거나">아무거나</option>
              <option value="아무거나">아무거나</option>
              <option value="아무거나">아무거나</option>
            </select>

            <select class="pjh-joinformSelectBox" name="" id="">
              <option value="넣어">넣어</option>
              <option value="넣어">넣어</option>
              <option value="넣어">넣어</option>
              <option value="넣어">넣어</option>
            </select>
          </div>

          <div class="pjh-joinformLabalagreement">
            <input id="pjh-joinformLabalagreementcheckbox" type="checkbox">
            <span id="pjh-joinformLabalagreementContents">회원가입을 위해 개인정보 수집 및 이용에 동의합니다.</span>
          </div>

          <div id="pjh-joinformDoneButton">
            <button id="pjh-joinformJoinMembershipButton" type="submit">회원가입</button>
          </div>


        </div>
      </form>
    </div>

    <AppFooter />
  </div>
</template>

<script>
import "@/assets/css/PjhCss/JoinFormView.css";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";

export default {
  name: 'JoinFormView',
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
