<template>
    <div class="home">
      <AppHeader/>
        <div id="leb-smallgathering-modify">
          수정입니덩
        </div>
      <AppFooter/>
    </div>
  </template>
  
  <script>
  import "@/assets/css/LebCss/SmallGatheringModify.css";
  import AppFooter from "@/components/AppFooter.vue";
  import AppHeader from "@/components/AppHeader.vue";
  export default {
    name: 'SmallGatheringModifyView',
    components: {
      AppFooter,
      AppHeader,
    }
  }
  </script>
  