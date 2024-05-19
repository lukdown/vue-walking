<template>
  <div>
    <AppHeader />

    <div class="">
      <form action="">
        <div id="pjh-joinform-id" class="pjh-joinform">

          <div id="pjh-joinformLogo" class="pjh-joinform">
            <p class="pjh-join-p-margin-delete">회원가입</p>
          </div>

          <div class="pjh-joinformLabalID">
            <label id="pjh-joinformIdLogo" for="pjh-joinformIdinput">아이디</label>
            <input id="pjh-joinformIdinput" class="pjh-joinforminput-class" type="text">
            <button id="pjh-joinformDuplicateButton" type="button">중복체크</button>
          </div>

          <div class="pjh-duplicate-check-div">
            <p class="pjh-duplicate" v-if="isDuplicated">중복된 아이디입니다.</p>
            <p class="pjh-duplicate" v-if="isNotDuplicated">사용 가능한 아이디입니다.</p>
            <p class="pjh-duplicate" v-else>아이디를 입력해주세요</p>
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
            <select class="pjh-joinformSelectBox" name="" id="" v-model="selectedYear">
              <option value="">년도</option>
              <option v-for="(i, index) in yyyyList" v-bind:key="index" :value="i.value">
                {{ i.text }}년
              </option>
            </select>

            <select class="pjh-joinformSelectBox" name="" id="" v-model="selectedMonth">
              <option value="">월</option>
              <option v-for="(i, index) in mmlist" v-bind:key="index" :value="i.value">
                {{ i.text }}월
              </option>

            </select>

            <select class="pjh-joinformSelectBox" name="" id="" v-model="selectedDay">
              <option value="">일</option>
              <option v-for="(i, index) in ddlist" v-bind:key="index" :value="i.value">
                {{ i.text }}일
              </option>
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
            <button id="pjh-joinformJoinMembershipButton" type="button" @click="JoinTheMembership">회원가입</button>
          </div>

          <div class="pjh-modal-wrap" v-show="JoinmodalPage">
            <div class="pjh-modal-container">
              <div class="pjh-modal-content">
                <p>회원가입에</p>
                <p>성공하였습니다!</p>
              </div>
              <!--  모달창 content  -->

              <div class="pjh-modal-btn">

                <button class="pjh-modalclearbtn" @click="JoinTheMembership" type="submit">확인</button>
              </div>
            </div>
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
    return {
      yyyyList: [],
      mmlist: [],
      ddlist: [],
      check: 0,
      JoinmodalPage: false,
      isDuplicated: false,
      isNotDuplicated: false,
      selectedMonth: "",
      selectedYear: "",
      selectedDay:""
    };
  },
  methods: {
    JoinTheMembership() {
      this.JoinmodalPage = !this.JoinmodalPage
    },
    updateDaysInMonth(selectedYear, selectedMonth) {
      if (!selectedYear) return;
      const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
      this.ddlist = [];
      for (let i = 1; i <= daysInMonth; i++) {
        this.ddlist.push({ value: i, text: i });
      }
    },
    updateMonthsInYear(selectedYear) {
      if (!selectedYear) return;
      this.mmlist = [];
      for (let i = 1; i <= 12; i++) {
        this.mmlist.push({ value: i, text: i });
      }
    },
    resetMonthAndDay() {
      this.selectedMonth = "";
      this.selectedDay = "";
    },
    resetDay() {
      this.selectedDay = "";
    }
  },
  watch: {
    selectedYear(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.updateMonthsInYear(newVal);
        this.resetMonthAndDay();
      }
    },
    selectedMonth(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.updateDaysInMonth(newVal, this.selectedMonth);
        this.resetDay();
      }
    }
  },
  created() {
    const nowYear = new Date().getFullYear();
    for (let i = 0; i < 130; i++) {
      let date = nowYear - i;
      this.yyyyList.push({ value: date, text: date });
    }

    this.updateMonthsInYear(nowYear);

  },

};
</script>
