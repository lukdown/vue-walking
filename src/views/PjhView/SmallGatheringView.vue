<template>
  <div>
    <AppHeader />

    <div class="yys-smallgathering-content">

      <div class="pjh-smallgathering">

        <div id="pjh-smallgatheringhead">

          <div id="pjh-smallgatheringLogo">
            <h2>소모임</h2>
          </div>



          <div>

            <button id="pjh-smallgatheringCreatebtn" type="button">
              <router-link id="pjh-smallgatheringCreatebtnFont" to="/walking/smallgatheringwrite">모임 개설하기</router-link>
            </button>

          </div>

        </div>
        <!-- pjh-smallgatheringhead -->


        <div class="pjh-smallgatheringsearch">

          <label id="pjh-smallgatheringsearchLogo" for="">지역검색</label>

          <input id="pjh-smallgatheringsearchBox" type="search">

          <button id="pjh-smallgatheringsearcBtn" type="button">
            <img id="pjh-smallgatheringsearchBtnImage" src="@/assets/img/searchimage.png" alt="">
          </button>

        </div>
        <!-- pjh-smallgatheringsearch -->


        <router-link to="/walking/smallgatheringdetail">
          <div class="pjh-smallgatheringList">

            <div class="pjh-smallgatheringListimageAll">
              <p class="pjh-smallgatheringListimageRecruitmentSign">모집중</p>
              <img class="pjh-smallgatheringListimage" src="@/assets/img/구름.png" alt="">
            </div>

            <div v-bind:key="i" v-for="(gatheringVo, i) in gatheringList" class="pjh-smallgatheringExplanationAll">

              <div class="pjh-smallgatheringExplanationTitle">
                <span>{{ gatheringVo.small_gathering_name }}</span>
              </div>

              <div class="pjh-smallgatheringExplanation">
                <label for="">코스:</label>
                <span>{{gatheringVo.course_name}}</span>
              </div>

              <div class="pjh-smallgatheringExplanation">
                <label for="">신청일:</label>
                <span>2024-05-11~{{ gatheringVo.small_gathering_deadline }}</span>
              </div>

              <div class="pjh-smallgatheringExplanation">
                <label for="">모집인원:</label>
                <span>0/{{ gatheringVo.small_gathering_total_personnel }}</span>
              </div>

              <input type="hidden" v-model="gatheringVo.small_gathering_no">
              <input type="hidden" v-model="gatheringVo.small_gathering_region">

            </div>

          </div>
        </router-link>
        <!-- pjh-smallgatheringList -->

        <div class="pjh-smallgatheringList">

          <div class="pjh-smallgatheringListimageAll">
            <p class="pjh-smallgatheringListimageRecruitmentSign">모집중</p>
            <img class="pjh-smallgatheringListimage" src="@/assets/img/구름.png" alt="">
          </div>

          <div class="pjh-smallgatheringExplanationAll">

            <div class="pjh-smallgatheringExplanationTitle">
              <span>영수파티</span>
            </div>

            <div class="pjh-smallgatheringExplanation">
              <label for="">코스:</label>
              <span>영리한수호자코스</span>
            </div>

            <div class="pjh-smallgatheringExplanation">
              <label for="">신청일:</label>
              <span>2024-05-11~2024-05-18</span>
            </div>

            <div class="pjh-smallgatheringExplanation">
              <label for="">모집인원:</label>
              <span>8/10</span>
            </div>

          </div>

        </div>
        <!-- pjh-smallgatheringList -->
        <div class="pjh-smallgatheringList">

          <div class="pjh-smallgatheringListimageAll">
            <p class="pjh-smallgatheringListimageRecruitmentSign">모집중</p>
            <img class="pjh-smallgatheringListimage" src="@/assets/img/구름.png" alt="">
          </div>

          <div class="pjh-smallgatheringExplanationAll">

            <div class="pjh-smallgatheringExplanationTitle">
              <span>영수파티</span>
            </div>

            <div class="pjh-smallgatheringExplanation">
              <label for="">코스:</label>
              <span>영리한수호자코스</span>
            </div>

            <div class="pjh-smallgatheringExplanation">
              <label for="">신청일:</label>
              <span>2024-05-11~2024-05-18</span>
            </div>

            <div class="pjh-smallgatheringExplanation">
              <label for="">모집인원:</label>
              <span>8/10</span>
            </div>

          </div>

        </div>
        <!-- pjh-smallgatheringList -->
        <div class="pjh-smallgatheringList">

          <div class="pjh-smallgatheringListimageAll">
            <p class="pjh-smallgatheringListimageRecruitmentSign">모집중</p>
            <img class="pjh-smallgatheringListimage" src="@/assets/img/구름.png" alt="">
          </div>

          <div class="pjh-smallgatheringExplanationAll">

            <div class="pjh-smallgatheringExplanationTitle">
              <span>영수파티</span>
            </div>

            <div class="pjh-smallgatheringExplanation">
              <label for="">코스:</label>
              <span>영리한수호자코스</span>
            </div>

            <div class="pjh-smallgatheringExplanation">
              <label for="">신청일:</label>
              <span>2024-05-11~2024-05-18</span>
            </div>

            <div class="pjh-smallgatheringExplanation">
              <label for="">모집인원:</label>
              <span>8/10</span>
            </div>

          </div>

        </div>
        <!-- pjh-smallgatheringList -->
      </div>
      <!--pjh-smallgathering-->
    </div>

    <AppFooter />
  </div>
</template>

<script>
import "@/assets/css/PjhCss/SmallGatheringView.css";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
import axios from "axios";

export default {
  name: 'SmallGatheringView',
  components: {
    AppFooter,
    AppHeader,
  },
  data() {
    return {
      gatheringList: [],
      gatheringVo: {
        small_gathering_no: "",
        users_no: "",
        course_no: "",
        course_name:"",
        small_gathering_name: "",
        small_gathering_host_name: "",
        small_gathering_hp: "",
        small_gathering_deadline: "",
        small_gathering_information: "",
        small_gathering_region: "",
        small_gathering_total_personnel: "",
        small_gathering_saveName: "",
      },

    };
  },
  methods: {
    getGatheringList() {
      console.log("데이터 가져오기");
      //console.log(category);

      axios({
        method: "get", // put, post, delete
        url: `${this.$store.state.apiBaseUrl}/api/walking/gatheringlist`,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        }, //전송타입
        //params: course_category_no, //get방식 파라미터로 값이 전달

        responseType: "json", //수신타입
      })
        .then((response) => {
          console.log(response.data.apiData);
          this.gatheringList = response.data.apiData;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  created() { 
    this.getGatheringList();
  }
};
</script>
