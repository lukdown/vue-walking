<template>
    <div class="home">
      <AppHeader/>
        <div id="leb-amenity">
          <!--왼쪽 창-->
          <div id="leb-amenity-left">
            <h2 id="leb-amenity-left-title">편의시설</h2>
            <div id="leb-amenity-left-search">
                <div id="leb-amenity-left-search-text">지도에서 위치 찾기</div>
                <input type="search" id="leb-amenity-left-map-search-box" value="" placeholder="지역을 입력해주세요">
                <button type="submit" id="leb-amenity-left-map-search-button"><img src="@/assets/img/searchimage.png"></button>
            </div>

            <!--그리기-->
            <div id="leb-amenity-left-draw-toilet">
                <img src="@/assets/img/mintping.png" class="leb-amenity-left-ping">
                <span class="leb-amenity-left-amenityp-type">화장실</span>
                <button class="leb-amenity-left-map-draw-button">그리기</button>
            </div>
            <div id="leb-amenity-left-draw-machine">
                <img src="@/assets/img/purpleping.png" class="leb-amenity-left-ping">
                <span class="leb-amenity-left-amenityp-type">자판기</span>
                <button class="leb-amenity-left-map-draw-button">그리기</button>
            </div>
            <div id="leb-amenity-left-draw-smoke">
                <img src="@/assets/img/yellowping.png" class="leb-amenity-left-ping">
                <span class="leb-amenity-left-amenityp-type">흡연장</span>
                <button class="leb-amenity-left-map-draw-button">그리기</button>
            </div>
          </div>
          <!--오른쪽 지도-->
          <div id="leb-amenity-right-map">
            <img src="@/assets/img/map.png">
          </div>
        </div>
      <AppFooter/>
    </div>
  </template>
  
  <script>
  import "@/assets/css/LebCss/Amenity.css";
  import AppFooter from "@/components/AppFooter.vue";
  import AppHeader from "@/components/AppHeader.vue";
  export default {
    name: 'AmenityView',
    components: {
      AppFooter,
      AppHeader,
    }
  }
  </script>
  