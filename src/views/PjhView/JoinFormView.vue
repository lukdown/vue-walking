<template>
  <div>
    <AppHeader />

    <div class="">
      <form @submit.prevent="join" action="">
        <div id="pjh-joinform-id" class="pjh-joinform">

          <div id="pjh-joinformLogo" class="pjh-joinform">
            <p class="pjh-join-p-margin-delete">회원가입</p>
          </div>

          <div class="pjh-joinformLabalID">
            <label id="pjh-joinformIdLogo" for="pjh-joinformIdinput">아이디</label>
            <input id="pjh-joinformIdinput" class="pjh-joinforminput-class" type="text" v-model="userslistVo.users_id"
            @input="removeSpecialCharacters">
            <button id="pjh-joinformDuplicateButton" type="button"  @click="idCheck">중복체크</button>
          </div>

          <div class="pjh-duplicate-check-div">
            <p class="pjh-duplicate" v-if="isDuplicated">중복된 아이디입니다.</p>
            <p class="pjh-duplicate" v-if="isNotDuplicated">사용 가능한 아이디입니다.</p>

          </div>

          <div class="pjh-joinformLabalPW">
            <label class="pjh-joinformLabal" for="">비밀번호</label>
            <input class="pjh-joinforminput-class" type="password" v-model="userslistVo.users_pw">
          </div>

          <div class="pjh-joinformLabalName">
            <label class="pjh-joinformLabal" for="">이름</label>
            <input class="pjh-joinforminput-class" type="text" v-model="userslistVo.users_name">
          </div>

          <div class="pjh-joinformLabalNickName">
            <label class="pjh-joinformLabal" for="">닉네임</label>
            <input class="pjh-joinforminput-class" type="text" v-model="userslistVo.users_nickname">
          </div>

          <div class="pjh-joinformLabalHp">
            <label class="pjh-joinformLabal" for="">핸드폰</label>
            <select name="" class="pjh-joinformSelectBox" v-model="HpFirstNum">
              <option value="010">010</option>
            </select>
            <span class="pjh-Hpminus">-</span>
            <input class="pjh-HpNumber" type="text" maxlength="4" v-model="HpmiddleNum" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" />
            <span class="pjh-Hpminus">-</span>
            <input class="pjh-HpNumber" type="text"  maxlength="4" v-model="HpLastNum" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" />
          </div>

          <div class="pjh-joinformLabalBirthDate">
            <label class="pjh-joinformLabal" for="">생년월일</label>
            <select class="pjh-joinformSelectBox" name="" v-model="selectedYear">
              <option value="">년도</option>
              <option v-for="(i, index) in yyyyList" v-bind:key="index" :value="i.value">
                {{ i.text }}년
              </option>
            </select>

            <select class="pjh-joinformSelectBox" name="" v-model="selectedMonth">
              <option value="">월</option>
              <option v-for="(i, index) in mmlist" v-bind:key="index" :value="i.value">
                {{ i.text }}월
              </option>

            </select>

            <select class="pjh-joinformSelectBox" name="" v-model="selectedDay">
              <option value="">일</option>
              <option v-for="(i, index) in ddlist" v-bind:key="index" :value="i.value">
                {{ i.text }}일
              </option>
            </select>
          </div>

          <div class="pjh-joinformLabalGender">
            <label class="pjh-joinformLabal" for="">성별</label>

            <label class="pjh-joinformGenderLabal" for="">남</label>
            <input class="pjh-joinformGenderRadio" type="radio" name="gender" value="male" v-model="userslistVo.users_gender">

            <label class="pjh-joinformGenderLabal" for="">여</label>
            <input class="pjh-joinformGenderRadio" type="radio" name="gender" value="female" v-model="userslistVo.users_gender">

          </div>

          <div class="pjh-joinformLabalRegion">
            <label class="pjh-joinformLabal" for="">거주지역</label>
            <input class="pjh-joinforminput-class" type="text" placeholder="주소" v-model="userslistVo.users_residence"
              readonly />
            <button id="pjh-addressSearchbtn" @click="openPost" type="button">검색</button>
          </div>

          <div class="pjh-joinformLabalagreement">
            <input id="pjh-joinformLabalagreementcheckbox" type="checkbox" v-model="agreement">
            <span id="pjh-joinformLabalagreementContents">회원가입을 위해 개인정보 수집 및 이용에 동의합니다.</span>
          </div>

          <div id="pjh-joinformDoneButton">
            <button id="pjh-joinformJoinMembershipButton" type="submit">회원가입</button>
          </div>

          <div class="pjh-modal-wrap" v-show="JoinmodalPage">
            <div class="pjh-modal-container">
              <div class="pjh-modal-content">
                <p>회원가입에</p>
                <p>성공하였습니다!</p>
              </div>
              <!--  모달창 content  -->

              <div class="pjh-modal-btn">

                <button class="pjh-modalclearbtn" @click="JoinTheMembership" type="button"><router-link id="pjh-JoinEnd" to="/walking/loginpage">확인</router-link></button>
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
import axios from 'axios';


export default {
  name: 'JoinFormView',
  components: {
    AppFooter,
    AppHeader,
  },
  data() {
    return {
      userslistVo: {
        users_id: "",
        users_pw: "",
        users_name: "",
        users_nickname: "",
        users_hp: "",
        users_birth_date: "",
        users_gender: "",
        users_residence: ""
      },
      yyyyList: [],
      mmlist: [],
      ddlist: [],
      check: 0,
      JoinmodalPage: false,
      isDuplicated: false,
      isNotDuplicated: false,
      HpFirstNum: "",
      HpmiddleNum: "",
      HpLastNum: "",
      selectedMonth: "",
      selectedYear: "",
      selectedDay: "",
      agreement: ""
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
    },
    openPost() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
            this.userslistVo.users_residence = data.roadAddress;
          } else { // 사용자가 지번 주소를 선택했을 경우(J)
            this.userslistVo.users_residence = data.jibunAddress;
          }
        }
      }).open();
    },
    idCheck() {
      //console.log(this.userslistVo.users_id);
      if (this.userslistVo.users_id == "") {
        alert("아이디를 입력해주세요");

      } else {
        axios({
          method: 'get', // put, post, delete                   
          url: 'http://localhost:9020/api/walking/joinpageidcheck/'+ this.userslistVo.users_id ,
          headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
          //params: this.userslistVo.users_id, //get방식 파라미터로 값이 전달
          //data: this.userslistVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

          responseType: 'json' //수신타입
        }).then(response => {
          console.log(response.data.apiData); //수신데이타

          if (response.data.apiData == 0) {
            this.isNotDuplicated = true;
            this.isDuplicated = false;
          } else {
            this.isDuplicated = true;
            this.isNotDuplicated = false;
          }

        }).catch(error => {
          console.log(error);
        });

      }

    },
    join(event) {

      this.userslistVo.users_birth_date = `${this.selectedYear}-${this.selectedMonth}-${this.selectedDay}`

      this.userslistVo.users_hp = `${this.HpFirstNum}-${this.HpmiddleNum}-${this.HpLastNum}`

      //console.log(this.userslistVo.users_birth_date);
      //console.log(this.userslistVo.users_hp);
      
      //console.log("등록");
      
      if (this.userslistVo.users_id == "") {
        event.preventDefault();//폼기능 제한
        window.alert("아이디를 입력해주세요");//경고장
        return false;//이벤트 전파를 막는다
      } else if (this.isDuplicated == true) {
        event.preventDefault();//폼기능 제한
        window.alert("아이디를 다시 확인해주세요");//경고장
        return false;//이벤트 전파를 막는다
      } else if (this.isDuplicated == false && this.isNotDuplicated == false) {
        event.preventDefault();//폼기능 제한
        window.alert("아이디 중복체크를 해주세요");//경고장
        return false;//이벤트 전파를 막는다
      } else if (this.userslistVo.users_pw == "") {
        event.preventDefault();//폼기능 제한
        window.alert("비밀번호를 입력해주세요");//경고장
        return false;//이벤트 전파를 막는다
      } else if (this.userslistVo.users_name == "") {
        event.preventDefault();//폼기능 제한
        window.alert("이름을 입력해주세요");//경고장
        return false;//이벤트 전파를 막는다
      } else if (this.userslistVo.users_nickname == "") {
        event.preventDefault();//폼기능 제한
        window.alert("닉네임을 입력해주세요");//경고장
        return false;//이벤트 전파를 막는다
      } else if (this.userslistVo.users_hp == "") {
        event.preventDefault();//폼기능 제한
        window.alert("전화번호를 입력해주세요");//경고장
        return false;//이벤트 전파를 막는다
      } else if (this.HpFirstNum == "") {
        event.preventDefault();//폼기능 제한
        window.alert("전화번호를 전부 입력해주세요");//경고장
        return false;//이벤트 전파를 막는다
      } else if (this.HpmiddleNum == "") {
        event.preventDefault();//폼기능 제한
        window.alert("전화번호를 전부 입력해주세요");//경고장
        return false;//이벤트 전파를 막는다
      } else if (this.HpmiddleNum.length != 4) {
        event.preventDefault();//폼기능 제한
        window.alert("전화번호를 4자리 전부 입력해주세요");//경고장
        return false;//이벤트 전파를 막는다
      }else if (this.HpLastNum == "") {
        event.preventDefault();//폼기능 제한
        window.alert("전화번호를 전부 입력해주세요");//경고장
        return false;//이벤트 전파를 막는다
      } else if (this.HpLastNum.length != 4) {
        event.preventDefault();//폼기능 제한
        window.alert("전화번호를 4자리 전부 입력해주세요");//경고장
        return false;//이벤트 전파를 막는다
      }else if (this.selectedYear == ""){
        event.preventDefault();//폼기능 제한
        window.alert("생년월일을 전부 입력해주세요");//경고장
        return false;//이벤트 전파를 막는다
      } else if (this.selectedMonth == ""){
        event.preventDefault();//폼기능 제한
        window.alert("생년월일을 전부 입력해주세요");//경고장
        return false;//이벤트 전파를 막는다
      } else if (this.selectedDay == "") {
        event.preventDefault();//폼기능 제한
        window.alert("생년월일을 전부 입력해주세요");//경고장
        return false;//이벤트 전파를 막는다
      } else if (this.userslistVo.users_gender == "") {
        event.preventDefault();//폼기능 제한
        window.alert("성별을 입력해주세요");//경고장
        return false;//이벤트 전파를 막는다
      } else if (this.userslistVo.users_residence == "") {
        event.preventDefault();//폼기능 제한
        window.alert("거주지역을 입력해주세요");//경고장
        return false;//이벤트 전파를 막는다
      } else if (this.agreement == "") {
        event.preventDefault();//폼기능 제한
        window.alert("개인정보 수짐 및 이용에 동의해주세요");//경고장
        return false;//이벤트 전파를 막는다
      } else {
        axios({
          method: 'post', // put, post, delete                   
          url: 'http://localhost:9020/api/walking/joinpage',
          headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
          //params: guestbookVo, //get방식 파라미터로 값이 전달
          data: this.userslistVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

          responseType: 'json' //수신타입
        }).then(response => {
          console.log(response.data.apiData); //수신데이타

          this.JoinTheMembership();
          //this.$router.push({ path: '/user/joinok' });
        }).catch(error => {
          console.log(error);
        });
      }


    },
    removeSpecialCharacters() {
      this.userslistVo.users_id = this.userslistVo.users_id.replace(/[_]|[^.@\wㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
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
