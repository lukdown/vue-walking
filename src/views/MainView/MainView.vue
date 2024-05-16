<template>
  <div>
    <AppHeader/>
    <div class="ksb-content">

      <div>
        <div id="ksb-img-area">
          <vueper-slides autoplay>
                    <vueper-slide v-for="(slide, i) in slides"
                      :key="i"
                      :title="slide.title"
                      :content="slide.content"
                      :image="slide.image" />
                      
                    <template #pause>
                      <i class="icon pause_circle_outline"></i>
                    </template>
                  </vueper-slides>
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


    </div>
    <AppFooter/>
  </div>
</template>

<script>

import "@/assets/css/MainCss/MainView.css";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

export default {
  name: 'MainView',
  components: {
    AppFooter,
    AppHeader,
    VueperSlides,
    VueperSlide,
  },
  data() {
    return {
      pauseOnHover: true,
      autoPlaying: true,
      internalAutoPlaying: true,
      slides: [
        {
          image: require('../../assets/img/pexels-daniel-trylski-4216839.jpg')
        },
        {
          image: require('../../assets/img/배경이미지.jpg')
        },
        {
          image: require('../../assets/img/벚꽃.jpg')
        },
        {
          image: require('../../assets/img/워킹화광고.png')
        }
        // Other slides...
      ]
    };
  },
}
</script>
