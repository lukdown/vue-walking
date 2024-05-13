<template>
    <div class="home">
      <AppHeader/>
        <div id="leb-smallgathering-detail">
          안녕하세요~~~~상세페이지입니다?
        </div>
      <AppFooter/>
    </div>
  </template>
  
  <script>
  import "@/assets/css/LebCss/SmallGatheringDetail.css";
  import AppFooter from "@/components/AppFooter.vue";
  import AppHeader from "@/components/AppHeader.vue";
  export default {
    name: 'SmallGatheringDetailView',
    components: {
      AppFooter,
      AppHeader,
    }
  }
  </script>