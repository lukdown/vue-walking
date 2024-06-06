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
                <router-link id="pjh-smallgatheringCreatebtnFont" to="/walking/smallgatheringwrite">모임
                  개설하기</router-link>
              </button>

            </div>

          </div>
          <!-- pjh-smallgatheringhead -->


          <div class="pjh-smallgatheringsearch">

            <label id="pjh-smallgatheringsearchLogo" for="">지역검색</label>

            <input id="pjh-smallgatheringsearchBox" type="search" v-model="gatheringVo.keyword"
              v-on:keyup.enter="search">

            <button id="pjh-smallgatheringsearcBtn" type="button">
              <img id="pjh-smallgatheringsearchBtnImage" src="@/assets/img/searchimage.png" alt="">
            </button>

          </div>
          <!-- pjh-smallgatheringsearch -->



          <div class="pjh-smallgatheringList" v-bind:key="i" v-for="(gatheringVo, i) in gatheringList">
            <router-link :to="`/walking/smallgatheringdetail/${gatheringVo.small_gathering_no}/${gatheringVo.course_no}`">

              <div class="pjh-smallgatheringListimageAll">
                <p class="pjh-smallgatheringListimageRecruitmentSign">모집중</p>
                <img class="pjh-smallgatheringListimage"
                  v-bind:src="`${this.$store.state.apiBaseUrl}/upload/${gatheringVo.small_gathering_saveName}`" alt="">
              </div>

              <div class="pjh-smallgatheringExplanationAll">

                <div class="pjh-smallgatheringExplanationTitle">
                  <span>{{ gatheringVo.small_gathering_name }}</span>
                </div>

                <div class="pjh-smallgatheringExplanation">
                  <label for="">코스:</label>
                  <span>{{ gatheringVo.course_name }}</span>
                </div>

                <div class="pjh-smallgatheringExplanation">
                  <label for="">신청 마감일:</label>
                  <span>{{ gatheringVo.small_gathering_deadline }}</span>
                </div>

                <div class="pjh-smallgatheringExplanation">
                  <label for="">모집인원:</label>
                  <span>0/{{ gatheringVo.small_gathering_total_personnel }}</span>
                </div>

                <div class="pjh-smallgatheringExplanation">
                  <label for="">소모임 지역 :</label>
                  <span>{{ gatheringVo.small_gathering_region }}</span>
                </div>
              </div>
            </router-link>
          </div>

          <!-- pjh-smallgatheringList -->
          <div>
            <ol id="gatheringList" class="gathering-pagination">


              <li class="" v-if="prev != false" v-on:click="prevPage">이전</li>
              <li class="" v-else-if="prev == true" v-on:click="prevPage">이전</li>
              <li id="gatheringListPage" v-bind:key="index" v-for="(i, index) in endNo - startNo + 1">

                <div class="gathering-page-list">
                  <a v-on:click.prevent="list(startNo + i)" href="">{{ startNo + i - 1 }}</a>
                </div>


              </li>
              <li class="gathering-page-arrow" v-if="next == true" v-on:click="nextPage">다음</li>

            </ol>
          </div>
        </div>
      </div>
      <!--pjh-smallgathering-->
    </div>

    <AppFooter />
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
        crtPage: 1,
        keyword: ""
      },
      startNo: 0,
      endNo: 0,
      next: "",
      prev: ""
    };
  },
  methods: {
    getGatheringList(list) {
      console.log("데이터 가져오기");

      if (this.gatheringVo.crtPage == 1) {
        this.gatheringVo.crtPage = 1;
      } else if (this.gatheringVo.crtPage < 1) {
        this.gatheringVo.crtPage = 1;
      }
      else {
        this.gatheringVo.crtPage = list - 1;
      }

      console.log(this.gatheringVo.crtPage);
      axios({
        method: 'post', // put, post, delete 
        url: `${this.$store.state.apiBaseUrl}/api/gathering/list`,
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        // params: guestbookVo, //get방식 파라미터로 값이 전달
        data: this.gatheringVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

        responseType: 'json' //수신타입
      }).then(response => {
        console.log(response.data.apiData); //수신데이타
        this.gatheringList = response.data.apiData.gatheringList;
        this.endNo = response.data.apiData.endPageBtnNo;
        this.startNo = response.data.apiData.startPageBtnNo;
        this.next = response.data.apiData.next;
        this.prev = response.data.apiData.prev;
        console.log(this.gatheringList);
      }).catch(error => {
        console.log(error);

      });
    },
    list(page) {
      this.gatheringVo.crtPage = page;
      this.getGatheringList(this.gatheringVo.crtPage);
    },
    prevPage() {
      if (this.prev == false) {
        console.log(this.gatheringVo.crtPage);
        this.getGatheringList(this.gatheringVo.crtPage);
      }
    },
    nextPage() {
      if (this.next == true) {
        this.gatheringVo.crtPage = this.gatheringVo.crtPage + 6;
        this.getGatheringList(this.gatheringVo.crtPage);
      }
    },
    search() {
      this.gatheringVo.crtPage = 1;
      this.getGatheringList();
    }
  },
  created() {
    this.getGatheringList();
  }
};
</script>
