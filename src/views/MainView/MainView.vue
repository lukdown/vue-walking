<template>
  <div>
    <AppHeader />
    
      

    
    <AppFooter />
  </div>
</template>

<script>

import "@/assets/css/MainCss/MainView.css";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";

export default {
  name: 'MainView',
  components: {
    AppFooter,
    AppHeader,
  }
}
</script>
