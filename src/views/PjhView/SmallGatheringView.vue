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
            <img id="pjh-smallgatheringLogoimage" src="@/assets/img/구름.png" alt="">
          </div>

          <div>
            <button id="pjh-smallgatheringCreatebtn" type="button">모임 개설하기</button>
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
