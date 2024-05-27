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
          <button type="submit" id="leb-amenity-left-map-search-button" ><img
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
              <li id="coffeeMenu" @click="changeMarker('toilet')">
                <span class="ico_toilet"></span>
                <span class="ico_font">화장실</span>
              </li>
              <li id="storeMenu" @click="changeMarker('disabled')">
                <span class="ico_WelfareCenterForTheDisabled"></span>
                <span class="ico_font">장애복지관</span>
              </li>
              <li id="carparkMenu" @click="changeMarker('outdoorExercise')">
                <span class="ico_OutdoorExerciseEquipment"></span>
                <span class="ico_font">야외운동시설</span>
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

/* global kakao */

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
      Facilities_Outdoor_Exercise_EquipmentList: [],
      map: null,
      markers: [],
    }
  },
  mounted() {
    const script = document.createElement("script");
    script.onload = () => this.initMap();
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=df6af04d0c7740cc52da078913f38627";
    document.head.appendChild(script);
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
    FacilitiesOutdoorExerciseEquipmentList() {
      const self = this;
      console.log("야외운동시설리스트 나와랑");
      axios({
        method: "get", // put, post, delete
        url: `http://api.odcloud.kr/api/15067626/v1/uddi:8be7ba5b-9e6d-4398-a2ce-f08292f157c6?page=1&perPage=29&returnType=json&serviceKey=I7auO7GQYlyZTrhZho8s6cvevXCz8AmynuTV9vPjdaqlO%2B3dkXjc1Hu1ABDhgXPULJW2GGwQmg74YlbG85MsZQ%3D%3D`,
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        //params: course_category_no, //get방식 파라미터로 값이 전달
        //data: course_category_no, //put, post, delete 방식 자동으로 JSON으로 변환 전달

        responseType: "json", //수신타입
      })
        .then((response) => {
          console.log(response.data); //수신데이

          this.Facilities_Outdoor_Exercise_EquipmentList = response.data.data;
          console.log(this.Facilities_Outdoor_Exercise_EquipmentList);

          for (let i = 1; i <= self.Facilities_Outdoor_Exercise_EquipmentList.length; i++) {
            axios.get(`${self.$store.state.apiBaseUrl}/api/walking/facilitieslistoutdoorexercise/` + self.Facilities_Outdoor_Exercise_EquipmentList[i].시설지명)
              .then(function (res) {
                console.log(res);
                if (res.status == 200) {
                  console.log(res.data.apiData);
                  if (res.data.apiData == false) {
                    console.log("등록1");


                    axios({
                      method: "post", // put, post, delete
                      url: `${self.$store.state.apiBaseUrl}/api/walking/facilitieslistoutdoorexerciseinsert/` + self.Facilities_Outdoor_Exercise_EquipmentList[i].시설지명 + "/" + self.Facilities_Outdoor_Exercise_EquipmentList[i].위도 + "/" + self.Facilities_Outdoor_Exercise_EquipmentList[i].경도 + "/" + self.Facilities_Outdoor_Exercise_EquipmentList[i].시설물현황,
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
                    console.log("등록된 야외운동시설1");
                  }

                }

              })

          }

        })
        .catch((error) => {
          console.log(error);
        });
      axios({
        method: "get", // put, post, delete
        url: `http://api.odcloud.kr/api/15080291/v1/uddi:bccd5f92-c82d-480e-bfd5-9c407c9cef38?page=1&perPage=36&returnType=json&serviceKey=I7auO7GQYlyZTrhZho8s6cvevXCz8AmynuTV9vPjdaqlO%2B3dkXjc1Hu1ABDhgXPULJW2GGwQmg74YlbG85MsZQ%3D%3D`,
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        //params: course_category_no, //get방식 파라미터로 값이 전달
        //data: course_category_no, //put, post, delete 방식 자동으로 JSON으로 변환 전달

        responseType: "json", //수신타입
      })
        .then((response) => {
          console.log(response.data); //수신데이

          this.Facilities_Outdoor_Exercise_EquipmentList = response.data.data;
          console.log(this.Facilities_Outdoor_Exercise_EquipmentList);

          for (let i = 1; i <= self.Facilities_Outdoor_Exercise_EquipmentList.length; i++) {
            axios.get(`${self.$store.state.apiBaseUrl}/api/walking/facilitieslistoutdoorexercise/` + self.Facilities_Outdoor_Exercise_EquipmentList[i].공원명)
              .then(function (res) {
                console.log(res);
                if (res.status == 200) {
                  console.log(res.data.apiData);
                  if (res.data.apiData == false) {
                    console.log("등록2");

                    axios({
                      method: "post", // put, post, delete
                      url: `${self.$store.state.apiBaseUrl}/api/walking/facilitieslistoutdoorexerciseinsert/` + self.Facilities_Outdoor_Exercise_EquipmentList[i].공원명 + "/" + self.Facilities_Outdoor_Exercise_EquipmentList[i].위도 + "/" + self.Facilities_Outdoor_Exercise_EquipmentList[i].경도 + "/" + self.Facilities_Outdoor_Exercise_EquipmentList[i].설치운동기구종류,
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
                    console.log("등록된 야외운동시설2");
                  }

                }

              })

          }

        })
        .catch((error) => {
          console.log(error);
        });
      axios({
        method: "get", // put, post, delete
        url: `http://api.odcloud.kr/api/15037929/v1/uddi:4302b579-6efd-4c38-9c39-bd04bc752435?page=1&perPage=161&returnType=json&serviceKey=I7auO7GQYlyZTrhZho8s6cvevXCz8AmynuTV9vPjdaqlO%2B3dkXjc1Hu1ABDhgXPULJW2GGwQmg74YlbG85MsZQ%3D%3D`,
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        //params: course_category_no, //get방식 파라미터로 값이 전달
        //data: course_category_no, //put, post, delete 방식 자동으로 JSON으로 변환 전달

        responseType: "json", //수신타입
      })
        .then((response) => {
          console.log(response.data); //수신데이

          this.Facilities_Outdoor_Exercise_EquipmentList = response.data.data;
          console.log(this.Facilities_Outdoor_Exercise_EquipmentList);

          for (let i = 1; i <= self.Facilities_Outdoor_Exercise_EquipmentList.length; i++) {
            axios.get(`${self.$store.state.apiBaseUrl}/api/walking/facilitieslistoutdoorexercise/` + self.Facilities_Outdoor_Exercise_EquipmentList[i].공원명)
              .then(function (res) {
                console.log(res);
                if (res.status == 200) {
                  console.log(res.data.apiData);
                  if (res.data.apiData == false) {
                    console.log("등록3");

                    axios({
                      method: "post", // put, post, delete
                      url: `${self.$store.state.apiBaseUrl}/api/walking/facilitieslistoutdoorexerciseinsert/` + self.Facilities_Outdoor_Exercise_EquipmentList[i].공원명 + "/" + self.Facilities_Outdoor_Exercise_EquipmentList[i].위도 + "/" + self.Facilities_Outdoor_Exercise_EquipmentList[i].경도 + "/" + self.Facilities_Outdoor_Exercise_EquipmentList[i].설치운동기구종류,
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
                    console.log("등록된 야외운동시설3");
                  }

                }

              })

          }

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

                  if (res.data.apiData == false) {
                    console.log("등록");
                    //self.FacilitiesForTheDisabledListInsert();

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
                    console.log("등록된 복지관");
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
    initMap(facilitiesList = this.convenient_facilities_list) {
      if (facilitiesList.length === 0) return;

      const mapContainer = document.getElementById('pjhmap');
      const mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3
      };

      // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
      if (navigator.geolocation) {
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function (position) {
          var lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도

          var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다

          map.setCenter(locPosition);
        });
      } else {
        // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

        var locPosition = new kakao.maps.LatLng(33.450701, 126.570667);

        map.setCenter(locPosition);
      }

      
      var ps = new kakao.maps.services.Places(); 

      ps.keywordSearch('이태원 맛집', placesSearchCB); 

      function placesSearchCB(status) {
        if (status === kakao.maps.services.Status.OK) {

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          var bounds = new kakao.maps.LatLngBounds();

          

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          map.setBounds(bounds);
        }
      }
      

      var map
      // 맵이 이미 초기화된 경우, 기존 맵을 사용
      if (!map) {
        map = new kakao.maps.Map(mapContainer, mapOption);
      }

      this.removeMarkers()




      // 새로운 마커 추가
      facilitiesList.forEach((facility) => {
        const position = new kakao.maps.LatLng(facility.facilities_latitude, facility.facilities_longitude);

        const imageSrc = facility.convenient_facilities_type_no == 1 ? require('@/assets/img/toiletmarker.png') :
          facility.convenient_facilities_type_no == 2 ? require('@/assets/img/Disabledmarker.png') :
            facility.convenient_facilities_type_no == 3 ? require('@/assets/img/outdoorexercise.png') :
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

        this.markers.push(marker);
      });
    },
    changeMarker(category) {
      let filteredFacilities = [];
      if (category === 'toilet') {
        filteredFacilities = this.convenient_facilities_list.filter(facility => facility.convenient_facilities_type_no === 1);
      } else if (category === 'disabled') {
        filteredFacilities = this.convenient_facilities_list.filter(facility => facility.convenient_facilities_type_no === 2);
      } else if (category === 'outdoorExercise') {
        filteredFacilities = this.convenient_facilities_list.filter(facility => facility.convenient_facilities_type_no === 3);
      }
      this.initMap(filteredFacilities);
    },
    removeMarkers() {
      // 기존 마커 제거
      if (this.markers) {
        this.markers.forEach(marker => marker.setMap(null));

      }
    },
  },
  created() {
    this.FacilitiesForTheDisabledList();
    this.FacilitiesOutdoorExerciseEquipmentList();
    this.list();
  }


}
</script>

<style scoped>
#pjhmap {
  width: 1180px;
  height: 703px;
}
</style>