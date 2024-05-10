<template>
  <div>
    <AppHeader/>
    <div class="clearfix">
      <div id="ksb-img-area">
        <img src="../../assets/img/pexels-daniel-trylski-4216839.jpg" alt="산책하는 사진">
      </div>
      <div id="ksb-mainUl">
        <ul>
          <li><img id="ksb-google-img" src="../../assets/img/Google_Play_2022_icon.svg.png" alt=""></li>
          <li><img id="ksb-apple-img" src="../../assets/img/icon_appstore__ev0z770zyxoy_large_2x.png" alt=""></li>
          <li id="ksb-p1" >걸음걸음</li>
          <li id="ksb-p2">걸음걸음 앱은 앱스토어나 Google Play에서 <br> 다운로드하실 수 있습니다.</li>
        </ul>
      </div>
    </div>
    <AppFooter/>
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
