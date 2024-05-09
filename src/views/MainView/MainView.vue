<template>
  <div>
    <AppHeader />


    <div id="wrap">
      <div id="container" class="clearfix">
        <!-- aside 없음 -->
        <div id="full-content">
          <!-- content-head 없음 -->

          <div id="index">


            <div id="greetings">

              <div id="Slider-text">
                <p id="Slider-p1">영수하다 -,</p>
                <p id="Slider-p2">영수하다 란? <br> 타락천사 닝수 대장공주 2세의 <br> 패션을 알아보세요.</p>
              </div>

              <div id="Main-Slider">
             
              </div>

            </div>



            <!-- //greetings -->
            <div class="clear"></div>
          </div>
          <!-- //index -->
        </div>
        <!-- //full-content -->
      </div>
      <!-- //container -->

      <!-- //footer -->
    </div>
    <!-- //wrap -->

    
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
