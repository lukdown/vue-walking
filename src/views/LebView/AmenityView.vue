<template>
  <div class="home">
    <AppHeader />
    <div id="leb-amenity">
      <!--왼쪽 창-->
      <div id="leb-amenity-left">
        <h2 id="leb-amenity-left-title">편의시설</h2>
        <div id="leb-amenity-left-search">
          <div id="leb-amenity-left-search-text">지도에서 위치 찾기</div>
          <input type="search" id="leb-amenity-left-map-search-box" value="" placeholder="지역을 입력해주세요">
          <button type="submit" id="leb-amenity-left-map-search-button"><img
              src="@/assets/img/searchimage.png"></button>
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
        <div id="pjhmap"></div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>


<script>
import "@/assets/css/LebCss/Amenity.css";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
import axios from 'axios';

export default {
  name: 'AmenityView',
  components: {
    AppFooter,
    AppHeader,
  },
  data() {
    return {
      convenient_facilities_list:[],
      map: null,
    }
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=df6af04d0c7740cc52da078913f38627";
      document.head.appendChild(script);
    }

  },
  methods: {
    list(){
      console.log("리스트 나와랑");
      axios({
        method: "get", // put, post, delete
        url: `${this.$store.state.apiBaseUrl}/api/walking/convenientlist`,
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        //params: course_category_no, //get방식 파라미터로 값이 전달
        //data: course_category_no, //put, post, delete 방식 자동으로 JSON으로 변환 전달

        responseType: "json", //수신타입
      })
        .then((response) => {
          console.log(response); //수신데이타
          this.coursebookList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    initMap() {
      var mapContainer = document.getElementById('pjhmap'), // 지도를 표시할 div  
        mapOption = {
          center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3 // 지도의 확대 레벨
        };

      var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

      // 마커를 표시할 위치와 내용을 가지고 있는 객체 배열입니다 
      var positions = [
        {
          content: '<div>카카오</div>',
          latlng: new kakao.maps.LatLng(33.450705, 126.570677)
        },
        {
          content: '<div>생태연못</div>',
          latlng: new kakao.maps.LatLng(33.450936, 126.569477)
        },
        {
          content: '<div>텃밭</div>',
          latlng: new kakao.maps.LatLng(33.450879, 126.569940)
        },
        {
          content: '<div>근린공원</div>',
          latlng: new kakao.maps.LatLng(33.451393, 126.570738)
        }
      ];

      for (var i = 0; i < positions.length; i++) {
        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: positions[i].latlng // 마커의 위치
        });

        // 마커에 표시할 인포윈도우를 생성합니다 
        var infowindow = new kakao.maps.InfoWindow({
          content: positions[i].content // 인포윈도우에 표시할 내용
        });

        // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
        // 이벤트 리스너로는 클로저를 만들어 등록합니다 
        // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
        kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
        kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
      }

      // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
      function makeOverListener(map, marker, infowindow) {
        return function () {
          infowindow.open(map, marker);
        };
      }

      // 인포윈도우를 닫는 클로저를 만드는 함수입니다 
      function makeOutListener(infowindow) {
        return function () {
          infowindow.close();
        };
      }
    },
    
  }


}
</script>

<style scoped>
#pjhmap {
  width: 1180px;
  height: 703px;
}
</style>