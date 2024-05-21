<template>
  <div>
    <AppHeader />

    <div class="">
      <form @submit.prevent="modify" action="">
        <div id="pjh-modifyform-id" class="pjh-modifyform">

          <div id="pjh-modifyformLogo" class="pjh-modifyform">
            <p class="pjh-modifyform-p-margin-delete">회원수정하기</p>
          </div>

          <div class="pjh-modifyformLabalID">
            <label id="pjh-modifyformIdLogo" for="pjh-modifyformIdinput">아이디</label>
            <p id="pjh-modifyformId">{{ userslistVo.users_id }}</p>
          </div>

          <div class="pjh-modifyformLabalPW">
            <label class="pjh-modifyformLabal" for="">비밀번호</label>
            <input class="pjh-modifyforminput-class" type="password" v-model="userslistVo.users_pw">
          </div>

          <div class="pjh-modifyformLabalName">
            <label class="pjh-modifyformLabal" for="">이름</label>
            <input class="pjh-modifyforminput-class" type="text" v-model="userslistVo.users_name">
          </div>

          <div class="pjh-modifyformLabalNickName">
            <label class="pjh-modifyformLabal" for="">닉네임</label>
            <input class="pjh-modifyforminput-class" type="text" v-model="userslistVo.users_nickname">
          </div>

          <div class="pjh-modifyformLabalHp">
            <label class="pjh-modifyformLabal" for="">핸드폰</label>
            <select name="HpFirstNum" id="" class="pjh-modifyformSelectBox" v-model="HpFirstNum">
              <option value="010">010</option>
            </select>
            <span class="pjh-modifyHpminus">-</span>
            <input class="pjh-modifyHpNumber" type="text" maxlength="4" v-model="HpmiddleNum"
              oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" />
            <span class="pjh-modifyHpminus">-</span>
            <input class="pjh-modifyHpNumber" type="text" maxlength="4" v-model="HpLastNum"
              oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" />
          </div>

          <div class="pjh-modifyformLabalBirthDate">
            <label class="pjh-modifyformLabal" for="">생년월일</label>
            <select class="pjh-modifyformSelectBox" name="selectedYear" v-model="selectedYear">
              <option value="">년도</option>
              <option v-for="(i, index) in yyyyList" v-bind:key="index" :value="i.value">
                {{ i.text }}년
              </option>
            </select>

            <select class="pjh-modifyformSelectBox" name="selectedMonth" v-model="selectedMonth">
              <option value="">월</option>
              <option v-for="(i, index) in mmlist" v-bind:key="index" :value="i.value">
                {{ i.text }}월
              </option>

            </select>

            <select class="pjh-modifyformSelectBox" name="selectedDay" v-model="selectedDay">
              <option value="">일</option>
              <option v-for="(i, index) in ddlist" v-bind:key="index" :value="i.value">
                {{ i.text }}일
              </option>
            </select>
          </div>

          <div class="pjh-modifyformLabalGender">
            <label class="pjh-modifyformLabal" for="">성별</label>

            <label class="pjh-modifyformGenderLabal" for="">남</label>
            <input class="pjh-modifyformGenderRadio" type="radio" name="gender" value="male"
              v-model="userslistVo.users_gender">

            <label class="pjh-modifyformGenderLabal" for="">여</label>
            <input class="pjh-modifyformGenderRadio" type="radio" name="gender" value="female"
              v-model="userslistVo.users_gender">

          </div>

          <div class="pjh-modifyformLabalRegion">
            <label class="pjh-modifyformLabal" for="">거주지역</label>
            <input class="pjh-modifyforminput-class" type="text" placeholder="주소" v-model="userslistVo.users_residence"
              readonly />
            <button id="pjh-modifyaddressSearchbtn" @click="openPost" type="button">검색</button>
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
import axios from 'axios';

export default {
  name: 'ModifyFormView',
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
      selectedYear: "",
      selectedMonth: "",
      selectedDay: "",
      HpFirstNum: "",
      HpmiddleNum: "",
      HpLastNum: "",
    };
  },
  methods: {
    updateDaysInMonth(selectedYear, selectedMonth) {
      console.log("updateDaysInMonth called with year:", selectedYear, "and month:", selectedMonth);
      if (!selectedYear || !selectedMonth) return;
      const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
      this.ddlist = [];
      for (let i = 1; i <= daysInMonth; i++) {
        this.ddlist.push({ value: i, text: i });
      }
    },
    updateMonthsInYear(selectedYear) {
      console.log("updateMonthsInYear called with year:", selectedYear);
      if (!selectedYear) return;
      this.mmlist = [];
      for (let i = 1; i <= 12; i++) {
        this.mmlist.push({ value: i, text: i });
      }
    },
    resetMonthAndDay() {
      this.selectedMonth = "";
      this.ddlist = [];
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
    getAuthUser() {
      axios({
        method: 'get', // put, post, delete                   
        url: 'http://localhost:9020/api/walking/modify',
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization": "Bearer " + this.$store.state.token
        },//전송타입+토큰

        //params: guestbookVo, //get방식 파라미터로 값이 전달
        //data: guestbookVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

        responseType: 'json' //수신타입
      }).then(response => {
        console.log(response.data.apiData);
        console.log(response.data.apiData.users_hp); //수신데이타
        if (response.data.result == "success") {
          this.userslistVo = response.data.apiData;
          const Hporder = this.userslistVo.users_hp.split("-");
          const birthday = this.userslistVo.users_birth_date.split("-");

          this.HpFirstNum = Hporder[0];
          this.HpmiddleNum = Hporder[1];
          this.HpLastNum = Hporder[2];

          const birthNum1 = Number(birthday[0]);
          const birthNum2 = Number(birthday[1]);
          const birthNum3 = Number(birthday[2]);

          this.selectedYear = birthNum1;
          this.selectedMonth = birthNum2;
          this.selectedDay = birthNum3;

          console.log(this.selectedMonth);
          console.log(this.selectedDay);
        } else {
          console.log(response.data.message);
          alert("로그인상태에서 이용해주세요.");
          this.$router.push({ path: '/walking/loginform' });
        }


      }).catch(error => {
        console.log(error);
      });

    },
    modify(event) {

      this.userslistVo.users_birth_date = `${this.selectedYear}-${this.selectedMonth}-${this.selectedDay}`

      this.userslistVo.users_hp = `${this.HpFirstNum}-${this.HpmiddleNum}-${this.HpLastNum}`

      //console.log(this.userslistVo.users_birth_date);
      //console.log(this.userslistVo.users_hp);

      //console.log("등록");

      if (this.userslistVo.users_pw == "") {
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
      } else if (this.HpLastNum == "") {
        event.preventDefault();//폼기능 제한
        window.alert("전화번호를 전부 입력해주세요");//경고장
        return false;//이벤트 전파를 막는다
      } else if (this.HpLastNum.length != 4) {
        event.preventDefault();//폼기능 제한
        window.alert("전화번호를 4자리 전부 입력해주세요");//경고장
        return false;//이벤트 전파를 막는다
      } else if (this.selectedYear == "") {
        event.preventDefault();//폼기능 제한
        window.alert("생년월일을 전부 입력해주세요");//경고장
        return false;//이벤트 전파를 막는다
      } else if (this.selectedMonth == "") {
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
      } else {
        axios({
          method: 'put', // put, post, delete                   
          url: 'http://localhost:9020/api/walking/modify',
          headers: {
              "Content-Type": "application/json; charset=utf-8",
              "Authorization": "Bearer " + this.$store.state.token
          }, //전송타입
          //params: guestbookVo, //get방식 파라미터로 값이 전달
          data: this.userslistVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

          responseType: 'json' //수신타입
        }).then(response => {
          console.log(response.data.apiData); //수신데이타

          if (response.data.result == "success") {
            let setAuthNickName = response.data.apiData

            this.$store.commit("setAuthNickName", setAuthNickName);

            this.$router.push({ path: '/' });
          } else {
            console.log("result=fail");
            console.log(response.data.massage);
            alert("로그인후 이용해주세요");
            this.$router.push({ path: '/walking/loginform' });
          }
          //this.$router.push({ path: '/user/joinok' });
        }).catch(error => {
          console.log(error);
        });
      }


    }
  },
  watch: {
    selectedYear(newVal, oldVal) {
      if (newVal !== oldVal) {
        if (oldVal == "") {
          this.updateMonthsInYear(newVal);
        } else {
          this.updateMonthsInYear(newVal);
          this.resetMonthAndDay();
        }

      }
    },
    selectedMonth(newVal, oldVal) {
      if (newVal !== oldVal) {
        if (oldVal == "") {
          this.updateDaysInMonth(this.selectedYear, newVal);
        } else {
          this.updateDaysInMonth(this.selectedYear, newVal);
          this.resetDay();
        }

      }
    }
  },
  created() {
    const nowYear = new Date().getFullYear();
    for (let i = 0; i < 130; i++) {
      let date = nowYear - i;
      this.yyyyList.push({ value: date, text: date });
    }

    this.getAuthUser();
  }
};
</script>
