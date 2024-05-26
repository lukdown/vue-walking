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
        <div id="pjhmap">
          <div class="category">
            <ul>
              <li id="coffeeMenu" onclick="changeMarker('coffee')">
                <span class="ico_toilet"></span>
                <span class="ico_font">화장실</span>
              </li>
              <li id="storeMenu" onclick="changeMarker('store')">
                <span class="ico_store"></span>
                <span class="ico_font">장애복지관</span>
              </li>
              <li id="carparkMenu" onclick="changeMarker('carpark')">
                <span class="ico_carpark"></span>
                <span class="ico_font">주차장</span>
              </li>
            </ul>
          </div>
        </div>
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
      convenient_facilities_list: [],
      Facilities_For_The_Disabled_List: [],
      map: null,
    }
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.loadMapScript();

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
    async list() {
      console.log("리스트 나와랑");
      await axios({
        method: "get", // put, post, delete
        url: `${this.$store.state.apiBaseUrl}/api/walking/convenientlist`,
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        //params: course_category_no, //get방식 파라미터로 값이 전달
        //data: course_category_no, //put, post, delete 방식 자동으로 JSON으로 변환 전달

        responseType: "json", //수신타입
      })
        .then((response) => {
          console.log(response); //수신데이타
          this.convenient_facilities_list = response.data.apiData;
          this.initMap();
          console.log(this.convenient_facilities_list);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    
    FacilitiesForTheDisabledList() {
      const self = this;
      console.log("장애인리스트 나와랑");
      axios({
        method: "get", // put, post, delete
        url: `https://api.odcloud.kr/api/15075529/v1/uddi:ed5cbc13-b65a-49ac-b83d-cefcf9806fd3?page=1&perPage=254&returnType=json&serviceKey=I7auO7GQYlyZTrhZho8s6cvevXCz8AmynuTV9vPjdaqlO%2B3dkXjc1Hu1ABDhgXPULJW2GGwQmg74YlbG85MsZQ%3D%3D`,
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        //params: course_category_no, //get방식 파라미터로 값이 전달
        //data: course_category_no, //put, post, delete 방식 자동으로 JSON으로 변환 전달

        responseType: "json", //수신타입
      })
        .then((response) => {
          console.log(response); //수신데이타
          this.Facilities_For_The_Disabled_List = response.data.data;
          console.log(this.Facilities_For_The_Disabled_List);

          for (let i = 1; i <= self.Facilities_For_The_Disabled_List.length; i++) {
            axios.get(`${self.$store.state.apiBaseUrl}/api/walking/facilitieslistcomparison/` + self.Facilities_For_The_Disabled_List[i].시설명)
              .then(function (res) {
                console.log(res);
                if (res.status == 200) {
                  console.log(res.data.apiData);
                  if (res.data.apiData == false) {
                    console.log("등록");
                    //self.FacilitiesForTheDisabledListInsert();
                    console.log(self.Facilities_For_The_Disabled_List[i]["와이(Y)좌표"]);
                    console.log(self.Facilities_For_The_Disabled_List[i]["엑스(X)좌표"]);
                    console.log(self.Facilities_For_The_Disabled_List[i].시설명);

                    axios({
                      method: "post", // put, post, delete
                      url: `${self.$store.state.apiBaseUrl}/api/walking/facilitieslistcomparisoninsert/` + self.Facilities_For_The_Disabled_List[i].시설명 + "/" + self.Facilities_For_The_Disabled_List[i]["와이(Y)좌표"] + "/" + self.Facilities_For_The_Disabled_List[i]["엑스(X)좌표"] + "/" + self.Facilities_For_The_Disabled_List[i].전화번호,
                      headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                      //params: course_category_no, //get방식 파라미터로 값이 전달
                      //data: self.Facilities_For_The_Disabled_List[i], //put, post, delete 방식 자동으로 JSON으로 변환 전달

                      responseType: "json", //수신타입
                    })
                      .then((response) => {
                        console.log(response); //수신데이타

                      })
                      .catch((error) => {
                        console.log(error);
                      });


                  } else {
                    console.log("스타워킹");
                  }
                }

              })
          }

        })
        .catch((error) => {
          console.log(error);
        });

    },

    loadMapScript() {
      this.list();
    },
    initMap() {
      if (this.convenient_facilities_list.length === 0) return;

      const mapContainer = document.getElementById('pjhmap'); // 지도를 표시할 div  
      const mapOption = {
        center: new kakao.maps.LatLng(37.5286, 127.1264), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
      };

      var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

      // 마커를 표시할 위치와 내용을 가지고 있는 객체 배열입니다 
      this.convenient_facilities_list.forEach((facility) => {
        const position = new kakao.maps.LatLng(facility.facilities_latitude, facility.facilities_longitude);

        // 마커 이미지 설정
        const imageSrc = facility.convenient_facilities_type_no == 1 ? require('@/assets/img/toiletmarker.png') :
          facility.convenient_facilities_type_no == 2 ? require('@/assets/img/Disabledmarker.png') :
            '@/assets/img/yellowping.png';

        const imageSize = new kakao.maps.Size(38, 38);
        const imageOption = { offset: new kakao.maps.Point(38, 38) };

        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);


        const marker = new kakao.maps.Marker({
          map: map,
          position,
          image: markerImage
        });

        const infowindow = new kakao.maps.InfoWindow({
          content: facility.facilities_name,
        });

        kakao.maps.event.addListener(marker, 'mouseover', () => infowindow.open(map, marker));
        kakao.maps.event.addListener(marker, 'mouseout', () => infowindow.close());
      });




    },

  },
  created() {
    this.list();
    this.FacilitiesForTheDisabledList();
  }


}
</script>

<style scoped>
#pjhmap {
  width: 1180px;
  height: 703px;
}


</style>