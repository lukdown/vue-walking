<template>
  <div>
    <AppHeader />

    <div class="">

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

export default {
  name: 'SmallGatheringView',
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
