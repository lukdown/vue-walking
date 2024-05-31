<template>
  <div>
    <div id="map">
      <div style="display: none">
        course번호 TEST : {{ (this.course_no = childVaule) }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CoursebookKakaoMap",
  props: ["childVaule"],
  data() {
    return {
      course_no: "",
      course_point_Vo: {
        course_point_no: "",
        course_no: "",
        course_latitude: "",
        course_longitude: "",
        course_order: "",
        course_division: "",
        group_num: "",
      },
      course_point_List: [],
      facilities_List: [],
    };
  },
  mounted() {
    //this.course_no = this.childVaule;
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
    initMap(course_no) {
      console.log("코스 번호 가져오기");
      console.log(course_no);
      this.course_point_Vo.course_no = course_no;
      //console.log(this.course_point_Vo.course_no);

      var mapContainer = document.getElementById("map"), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(37.498457376358886, 127.02681299738605), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };

      var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

      axios({
        method: "post", // put, post, delete
        url: `${this.$store.state.apiBaseUrl}/api/walking/coursebook_map_info`,
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        // params: guestbookVo, //get방식 파라미터로 값이 전달
        data: this.course_point_Vo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

        responseType: "json", //수신타입
      })
        .then((response) => {
          //console.log(response); //수신데이타
          this.course_point_List = response.data.apiData;
          console.log(this.course_point_List);

          // 지도에 표시된 마커 객체를 가지고 있을 배열입니다
          var markers = [];
          var linePath = [];

          // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
          var mapTypeControl = new kakao.maps.MapTypeControl();

          // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
          // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
          map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

          // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
          var zoomControl = new kakao.maps.ZoomControl();
          map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

          // 마커 하나를 지도위에 표시합니다

          for (let index = 0; index < this.course_point_List.length; index++) {
            addMarker(
              new kakao.maps.LatLng(
                this.course_point_List[0].course_latitude,
                this.course_point_List[0].course_longitude
              )
            );

            addMarker(
              new kakao.maps.LatLng(
                this.course_point_List[
                  this.course_point_List.length - 1
                ].course_latitude,
                this.course_point_List[
                  this.course_point_List.length - 1
                ].course_longitude
              )
            );

            linePath.push(
              new kakao.maps.LatLng(
                this.course_point_List[index].course_latitude,
                this.course_point_List[index].course_longitude
              )
            );

            var moveLatLon = new kakao.maps.LatLng(
              this.course_point_List[0].course_latitude,
              this.course_point_List[0].course_longitude
            );

            map.setCenter(moveLatLon);
          }

          // 지도에 표시할 선을 생성합니다
          var polyline = new kakao.maps.Polyline({
            path: linePath, // 선을 구성하는 좌표배열 입니다
            strokeWeight: 5, // 선의 두께 입니다
            strokeColor: "blue", // 선의 색깔입니다
            strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: "solid", // 선의 스타일입니다
          });

          // 지도에 선을 표시합니다
          polyline.setMap(map);

          //console.log(this.course_point_Vo.course);
          // 마커를 생성하고 지도위에 표시하는 함수입니다
          function addMarker(position) {
            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
              position: position,
            });

            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(map);

            // 생성된 마커를 배열에 추가합니다
            markers.push(marker);
          }
        })
        .catch((error) => {
          console.log(error);
        });

      axios({
        method: "get", // put, post, delete
        url: `${this.$store.state.apiBaseUrl}/api/walking/course_facilities_map`,
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        //params: course_category_no, //get방식 파라미터로 값이 전달
        // data: this.coursebookVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

        responseType: "json", //수신타입
      })
        .then((response) => {
          //console.log(response.data.apiData); //수신데이타
          this.facilities_List = response.data;
          console.log(this.facilities_List);
          
          // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
          var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

          for (let i = 0; i < this.facilities_List.length; i++) {
            var imageSrc = this.facilities_List[i].convenient_facilities_type_no == 1 ? require('@/assets/img/toiletmarker.png') :
            this.facilities_List[i].convenient_facilities_type_no == 2 ? require('@/assets/img/Disabledmarker.png') :
            this.facilities_List[i].convenient_facilities_type_no == 3 ? require('@/assets/img/outdoorexercise.png') :
            '@/assets/img/yellowping.png'
            , // 마커이미지의 주소입니다    
              imageSize = new kakao.maps.Size(38, 38), // 마커이미지의 크기입니다
              imageOption = {offset: new kakao.maps.Point(38, 38)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
              // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
          var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
            //console.log(this.facilities_List[i].facilities_latitude);
            displayMarker(this.facilities_List[i]);
          }
         
          // 지도에 마커를 표시하는 함수입니다
          function displayMarker(place) {
            // 마커를 생성하고 지도에 표시합니다
            var marker = new kakao.maps.Marker({
              map: map,
              position: new kakao.maps.LatLng(place.facilities_latitude, place.facilities_longitude),
              image: markerImage,
            });
            marker.setMap(map);

            // 마커에 클릭이벤트를 등록합니다
            kakao.maps.event.addListener(marker, "click", function () {
              // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
              infowindow.setContent(
                '<div style="padding:5px;font-size:12px;">' +
                  place.facilities_memo +
                  "</div>"
              );
              infowindow.open(map, marker);
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    //console.log(this.course_no);
    //this.getpointList()
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  width: 100%;
  height: 600px;
}
</style>

<style>
.dot {
  overflow: hidden;
  float: left;
  width: 12px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/mini_circle.png");
}
.dotOverlay {
  position: relative;
  bottom: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  float: left;
  font-size: 12px;
  padding: 5px;
  background: #fff;
}
.dotOverlay:nth-of-type(n) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.number {
  font-weight: bold;
  color: #ee6152;
}
.dotOverlay:after {
  content: "";
  position: absolute;
  margin-left: -6px;
  left: 50%;
  bottom: -8px;
  width: 11px;
  height: 8px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white_small.png");
}
.distanceInfo {
  position: relative;
  top: 5px;
  left: 5px;
  list-style: none;
  margin: 0;
}
.distanceInfo .label {
  display: inline-block;
  width: 50px;
}
.distanceInfo:after {
  content: none;
}
</style>
