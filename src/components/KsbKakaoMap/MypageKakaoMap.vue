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
  props: ["recordCourseNo"],
  data() {
    return {
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
    initMap(recordCourseNo) {
      console.log("코스번호 가져오기");
      console.log(recordCourseNo);
      this.course_point_Vo.course_no = recordCourseNo;

      var mapContainer = document.getElementById("map"), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(37.498457376358886, 127.02681299738605), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };

      var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다


      axios({
        method: "post", // put, post, delete
        url: `${this.$store.state.apiBaseUrl}/api/walking/mapCoursePoint`,
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        // params: guestbookVo, //get방식 파라미터로 값이 전달
        data: this.course_point_Vo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

        responseType: "json", //수신타입
      })
        .then((response) => {
          console.log(response.data);
          this.course_point_List = response.data.apiData;
          console.log(this.course_point_List);

          var markers = [];
          var linePath = [];

          var mapTypeControl = new kakao.maps.MapTypeControl();

          map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

          var zoomControl = new kakao.maps.ZoomControl();
          map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

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

    }, RecordClick() {
      this.initMap(this.course_no);
    },
  },
  created() {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  width: 100%;
  height: 300px;
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
