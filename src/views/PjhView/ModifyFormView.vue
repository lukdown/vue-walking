<template>
  <div>
    <AppHeader />

    <div class="">
      <form action="">
        <div id="pjh-modifyform-id" class="pjh-modifyform">

          <div id="pjh-modifyformLogo" class="pjh-modifyform">
            <p>회원수정하기</p>
          </div>

          <div class="pjh-modifyformLabalID">
            <label id="pjh-modifyformIdLogo" for="pjh-modifyformIdinput">아이디</label>
            <p id="pjh-modifyformId">silverprincess0319</p>
          </div>

          <div class="pjh-modifyformLabalPW">
            <label class="pjh-modifyformLabal" for="">비밀번호</label>
            <input class="pjh-modifyforminput-class" type="password">
          </div>

          <div class="pjh-modifyformLabalName">
            <label class="pjh-modifyformLabal" for="">이름</label>
            <input class="pjh-modifyforminput-class" type="text">
          </div>

          <div class="pjh-modifyformLabalNickName">
            <label class="pjh-modifyformLabal" for="">닉네임</label>
            <input class="pjh-modifyforminput-class" type="text">
          </div>

          <div class="pjh-modifyformLabalHp">
            <label class="pjh-modifyformLabal" for="">핸드폰</label>
            <input class="pjh-modifyforminput-class" type="text">
          </div>

          <div class="pjh-modifyformLabalBirthDate">
            <label class="pjh-modifyformLabal" for="">생년월일</label>
            <select class="pjh-modifyformSelectBox" name="" id="">
              <option value="일단">1999</option>
              <option value="일단">1999</option>
              <option value="일단">1999</option>
              <option value="일단">1999</option>
            </select>

            <select class="pjh-modifyformSelectBox" name="" id="">
              <option value="아무거나">09</option>
              <option value="아무거나">09</option>
              <option value="아무거나">09</option>
              <option value="아무거나">09</option>
            </select>

            <select class="pjh-modifyformSelectBox" name="" id="">
              <option value="넣어">09</option>
              <option value="넣어">09</option>
              <option value="넣어">09</option>
              <option value="넣어">09</option>
            </select>
          </div>

          <div class="pjh-modifyformLabalGender">
            <label class="pjh-modifyformLabal" for="">성별</label>

            <label class="pjh-modifyformGenderLabal" for="">남</label>
            <input class="pjh-modifyformGenderRadio" type="radio" name="gender">

            <label class="pjh-modifyformGenderLabal" for="">여</label>
            <input class="pjh-modifyformGenderRadio" type="radio" name="gender">

          </div>

          <div class="pjh-modifyformLabalRegion">
            <label class="pjh-modifyformLabal" for="">지역</label>
            <select class="pjh-modifyformSelectBox" name="" id="">
              <option value="일단">일단</option>
              <option value="일단">일단</option>
              <option value="일단">일단</option>
              <option value="일단">일단</option>
            </select>

            <select class="pjh-modifyformSelectBox" name="" id="">
              <option value="아무거나">아무거나</option>
              <option value="아무거나">아무거나</option>
              <option value="아무거나">아무거나</option>
              <option value="아무거나">아무거나</option>
            </select>

            <select class="pjh-modifyformSelectBox" name="" id="">
              <option value="넣어">넣어</option>
              <option value="넣어">넣어</option>
              <option value="넣어">넣어</option>
              <option value="넣어">넣어</option>
            </select>
          </div>

          <div id="pjh-modifyButton">
            <button id="pjh-modifyformCompleteButton" type="submit">수정하기</button>
          </div>


        </div>
      </form>
    </div>

    <AppFooter />
  </div>
</template>

<script>
import "@/assets/css/PjhCss/ModifyFormView.css";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";

export default {
  name: 'ModifyFormView',
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
