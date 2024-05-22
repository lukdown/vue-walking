<template>
  <div class="home">
    <AppHeader />
    <div id="leb-draw">
      <form action="">
        <!--왼쪽 창-->
        <div id="leb-course-left">
          <h2 id="leb-course-top">코스그리기</h2>

          <!--공개여부-->
          <div id="leb-course-left-whether">
            <span class="leb-course-left-maintext">공개여부</span>
            <label for="rdo-Public" id="leb-course-left-whether-public"
              >공개</label
            >
            <input type="radio" id="rdo-Public" name="whether" value="public" />
            <label
              for="rdo-nondisclosure"
              id="leb-course-left-whether-nondisclosure"
              >비공개</label
            >
            <input
              type="radio"
              id="rdo-nondisclosure"
              name="whether"
              value="nondisclosure"
            />
          </div>

          <!--제목 입력-->
          <div id="leb-course-left-title">
            <label for="ctitle" class="leb-course-left-maintext">제목</label>
            <input
              type="text"
              id="ctitle"
              value=""
              placeholder="제목을 입력해주세요"
            />
          </div>

          <!--코스소개-->
          <div id="leb-course-left-introduction">
            <span class="leb-course-left-maintext">코스소개</span>
            <textarea
              name="courseIntro"
              id=""
              cols="40"
              rows="2"
              placeholder="100자 이내로 입력해주세요"
            ></textarea>
          </div>

          <!--난이도-->
          <div id="leb-course-left-clevel">
            <span class="leb-course-left-maintext">난이도</span>
            <select name="clevel">
              <option value="" selected disabled hidden>난이도</option>
              <option value="veryeasy">매우쉬움</option>
              <option value="easy">쉬움</option>
              <option value="general">보통</option>
              <option value="hard">어려움</option>
              <option value="veryhard">매우어려움</option>
            </select>
          </div>

          <!--예상시간-->
          <div id="leb-course-left-predictive-time">
            <span
              class="leb-course-left-maintext"
              id="leb-course-left-predictive-time-maintext"
              >예상소요시간</span
            >
            <span id="leb-course-left-predictive-time-time">{{
              this.walkTime
            }}</span>
          </div>

          <!--예상거리-->
          <div id="leb-course-left-predictive-distance">
            <span
              class="leb-course-left-maintext"
              id="leb-course-left-predictive-distance-maintext"
              >예상거리</span
            >
            <span id="leb-course-left-predictive-distance-distance"
              >{{ this.distance }}
            </span>
          </div>
          <div id="leb-course-left-button">
            <button id="leb-course-left-button-back">취소</button>
            <button id="leb-course-left-button-draw">그리기</button>
          </div>
        </div>
      </form>

      <!--오른쪽 지도-->
      <div id="leb-course-right-map">
        <div id="map"></div>
      </div>

      <!--오른쪽 아래 그리기도구-->
      <div id="leb-course-bottom-map">
        <div id="leb-course-bottom-map-search">
          <div id="leb-course-bottom-map-search-text">지도에서 위치찾기</div>
          <div id="leb-course-bottom-map-search-row">
            <input
              v-on:keyup.enter.prevent="addressSearch()"
              type="text"
              id="leb-course-bottom-map-search-box"
              v-model="searchLocation"
              placeholder="지역을 입력해주세요"
            />
            <button
              v-on:click.prevent="addressSearch()"
              id="leb-course-bottom-map-search-button"
            >
              <img src="@/assets/img/searchimage.png" />
            </button>
          </div>
        </div>
        <div id="leb-course-bottom-map-search-point">
          <div id="leb-course-bottom-map-search-start-point">
            <img src="@/assets/img/blueping.png" />
            <input
              type="text"
              id="leb-course-bottom-map-start-point"
              value=""
              placeholder="시작점"
            />
          </div>
          <div id="leb-course-bottom-map-search-end-point">
            <img src="@/assets/img/pinkping.png" />
            <input
              type="text"
              id="leb-course-bottom-map-end-point"
              value=""
              placeholder="도착점"
            />
          </div>
        </div>
        <div id="leb-course-bottom-map-auto-draw">
          <button id="leb-course-bottom-map-draw-button">그리기</button>
          <button id="leb-course-bottom-map-restart-button">초기화</button>
        </div>
        <div id="leb-course-bottom-map-direct-draw">
          <button
            v-on:click="directDraw()"
            id="leb-course-bottom-map-direct-draw-button"
          >
            <img
              src="@/assets/img/pencil.png"
              id="leb-course-bottom-map-direct-draw-button-img"
            />직접그리기
          </button>
          <button id="leb-course-bottom-map-direct-draw-return-button">
            <img src="@/assets/img/return.png" />되돌리기
          </button>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import "@/assets/css/LebCss/CourseDarwing.css";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";

export default {
  name: "CourseDrawingView",
  data() {
    return {
      searchLocation: "",
      map: null,
      overlays: [],
      distance: "",
      walkTime: "",
      clickPosition: [],
    };
  },
  components: {
    AppFooter,
    AppHeader,
  },
  watch: {},
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
    this.addressSearch(this.location);
  },
  methods: {
    initMap() {
      var mapContainer = document.getElementById("map"), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };

      // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
      this.map = new kakao.maps.Map(mapContainer, mapOption);

      console.log(this.map);
      // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
      var zoomControl = new kakao.maps.ZoomControl();
      this.map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    },

    addressSearch(searchLocation) {
      this.$emit("clicked", searchLocation);
      console.log(this.searchLocation);

      // 기존에 선언된 searchLocation 변수에 값을 할당합니다.
      searchLocation = document
        .getElementById("leb-course-bottom-map-search-box")
        .value.trim();

      if (!searchLocation) {
        console.error("검색 위치가 비어 있습니다. 유효한 주소를 입력하세요.");
        return;
      }

      console.log("검색 중:", searchLocation);
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(searchLocation, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          console.log("result", result);
          console.log(result[0].y, result[0].x);
          var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          console.log("coords", coords);
          this.map.setCenter(coords);
        } else {
          console.error("주소 검색 실패:", status);
        }
      });

      /* 키워드 검색
      var places = new kakao.maps.services.Places();
      places.keywordSearch(searchLocation, placesSearchCB);
      // 키워드 검색 완료 시 호출되는 콜백함수 입니다
      function placesSearchCB(data, status) {
        if (status === kakao.maps.services.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          var bounds = new kakao.maps.LatLngBounds();

          for (var i = 0; i < data.length; i++) {
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          this.map.setBounds(bounds);
        } else {
          console.error("주소 검색 실패:", status);
        }
      }
      */
    },
    directDraw() {
      console.log("클릭클릭");

      var drawingFlag = false; // 선이 그려지고 있는 상태를 가지고 있을 변수입니다
      var clickLine; // 마우스로 클릭한 좌표로 그려질 선 객체입니다
      var moveLine; // 선이 그려지고 있을때 마우스 움직임에 따라 그려질 선 객체 입니다
      var distanceOverlay; // 선의 거리정보를 표시할 커스텀오버레이 입니다
      var dots = {}; // 선이 그려지고 있을때 클릭할 때마다 클릭 지점과 거리를 표시하는 커스텀 오버레이 배열입니다.

      var content;

      var self = this;

      console.log("directDraw()--this.map", this.map);
      // 위에 작성한 옵션으로 Drawing Manager를 생성합니다
      //var manager = new kakao.maps.drawing.DrawingManager(options);
      //console.log(manager);
      kakao.maps.event.addListener(this.map, "click", function (mouseEvent) {
        // 마우스로 클릭한 위치입니다
        self.clickPosition = mouseEvent.latLng;
        console.log("chlickPosition", self.clickPosition);

        // 지도 클릭이벤트가 발생했는데 선을 그리고있는 상태가 아니면
        if (!drawingFlag) {
          // 상태를 true로, 선이 그리고있는 상태로 변경합니다
          drawingFlag = true;
          // 지도 위에 선이 표시되고 있다면 지도에서 제거합니다
          deleteClickLine();
          // 지도 위에 커스텀오버레이가 표시되고 있다면 지도에서 제거합니다
          deleteDistnce();
          // 지도 위에 선을 그리기 위해 클릭한 지점과 해당 지점의 거리정보가 표시되고 있다면 지도에서 제거합니다
          deleteCircleDot();
          // 클릭한 위치를 기준으로 선을 생성하고 지도위에 표시합니다
          clickLine = new kakao.maps.Polyline({
            map: self.map, // 선을 표시할 지도입니다
            path: [self.clickPosition], // 선을 구성하는 좌표 배열입니다 클릭한 위치를 넣어줍니다
            draggable: true, //그래그 가능한 선
            removable: true, //삭제 가능한 선(true로 설정하면 마우스 오버 시 삭제할 수 있는 X버튼이 표시 )
            editable: true, //수정 가능한 선( (true로 설정하면 마우스 오버 시 수정할 수 있는 작은 사각형이 표시된다)
            strokeWeight: 3, // 선의 두께입니다
            strokeColor: "#068CD2", // 선의 색깔입니다
            strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
            strokeStyle: "solid", // 선의 스타일입니다
            zIndex: 4,
          });
          // 선이 그려지고 있을 때 마우스 움직임에 따라 선이 그려질 위치를 표시할 선을 생성합니다
          moveLine = new kakao.maps.Polyline({
            strokeWeight: 3, // 선의 두께입니다
            strokeColor: "#db4040", // 선의 색깔입니다
            strokeOpacity: 0.5, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
            strokeStyle: "solid", // 선의 스타일입니다
            zIndex: 4,
          });
          // 클릭한 지점에 대한 정보를 지도에 표시합니다
          displayCircleDot(self.clickPosition, 0);
        } else {
          // 선이 그려지고 있는 상태이면

          // 그려지고 있는 선의 좌표 배열을 얻어옵니다
          var path = clickLine.getPath();

          // 좌표 배열에 클릭한 위치를 추가합니다
          path.push(self.clickPosition);

          // 다시 선에 좌표 배열을 설정하여 클릭 위치까지 선을 그리도록 설정합니다
          clickLine.setPath(path);

          self.distance = Math.round(clickLine.getLength());
          displayCircleDot(self.clickPosition, self.distance);
        }
      }); //kakao.maps.event.addListener(this.map, "click", function(mouseEvent)

      // 지도에 마우스무브 이벤트를 등록합니다
      // 선을 그리고있는 상태에서 마우스무브 이벤트가 발생하면 그려질 선의 위치를 동적으로 보여주도록 합니다
      kakao.maps.event.addListener(
        this.map,
        "mousemove",
        function (mouseEvent) {
          // 지도 마우스무브 이벤트가 발생했는데 선을 그리고있는 상태이면
          if (drawingFlag) {
            // 마우스 커서의 현재 위치를 얻어옵니다
            var mousePosition = mouseEvent.latLng;

            // 마우스 클릭으로 그려진 선의 좌표 배열을 얻어옵니다
            var path = clickLine.getPath();

            // 마우스 클릭으로 그려진 마지막 좌표와 마우스 커서 위치의 좌표로 선을 표시합니다
            var movepath = [path[path.length - 1], mousePosition];
            moveLine.setPath(movepath);
            moveLine.setMap(this.map);

            (self.distance = Math.round(
              clickLine.getLength() + moveLine.getLength()
            )), // 선의 총 거리를 계산합니다
              (content =
                '<div class="dotOverlay distanceInfo">총거리 <span class="number">' +
                self.distance +
                "</span>m</div>"); // 커스텀오버레이에 추가될 내용입니다

            // 거리정보를 지도에 표시합니다
            showDistance(content, mousePosition);
          }
        }
      ); //kakao.maps.event.addListener

      // 지도에 마우스 오른쪽 클릭 이벤트를 등록합니다
      // 선을 그리고있는 상태에서 마우스 오른쪽 클릭 이벤트가 발생하면 선 그리기를 종료합니다
      kakao.maps.event.addListener(this.map, "rightclick", function () {
        // 지도 오른쪽 클릭 이벤트가 발생했는데 선을 그리고있는 상태이면
        if (drawingFlag) {
          // 마우스무브로 그려진 선은 지도에서 제거합니다
          moveLine.setMap(null);
          moveLine = null;

          // 마우스 클릭으로 그린 선의 좌표 배열을 얻어옵니다
          var path = clickLine.getPath();

          // 선을 구성하는 좌표의 개수가 2개 이상이면
          if (path.length > 1) {
            // 마지막 클릭 지점에 대한 거리 정보 커스텀 오버레이를 지웁니다
            if (dots[dots.length - 1].distance) {
              dots[dots.length - 1].distance.setMap(null);
              dots[dots.length - 1].distance = null;
            }

            (self.distance = Math.round(clickLine.getLength())), // 선의 총 거리를 계산합니다
              (content = getTimeHTML(self.distance)); // 커스텀오버레이에 추가될 내용입니다

            // 그려진 선의 거리정보를 지도에 표시합니다
            showDistance(content, path[path.length - 1]);
          } else {
            // 선을 구성하는 좌표의 개수가 1개 이하이면
            // 지도에 표시되고 있는 선과 정보들을 지도에서 제거합니다.
            deleteClickLine();
            deleteCircleDot();
            deleteDistnce();
          }

          // 상태를 false로, 그리지 않고 있는 상태로 변경합니다
          drawingFlag = false;
        }
      });

      // 클릭으로 그려진 선을 지도에서 제거하는 함수입니다
      function deleteClickLine() {
        if (clickLine) {
          clickLine.setMap(null);
          clickLine = null;
        }
      }

      const displayCircleDot = (position, distance) => {
        // 클릭 지점을 표시할 빨간 동그라미 커스텀오버레이를 생성합니다
        var circleOverlay = new kakao.maps.CustomOverlay({
          content: '<span class="dot"></span>',
          position: position,
          zIndex: 1,
        });
        console.log("displayCircleDot: ", this.map);
        // 지도에 표시합니다
        circleOverlay.setMap(this.map);
        if (distance > 0) {
          // 클릭한 지점까지의 그려진 선의 총 거리를 표시할 커스텀 오버레이를 생성합니다
          var distanceOverlay = new kakao.maps.CustomOverlay({
            content:
              '<div class="dotOverlay">거리 <span class="number">' +
              distance +
              "</span>m</div>",
            position: position,
            yAnchor: 1,
            zIndex: 2,
          });

          // 지도에 표시합니다
          distanceOverlay.setMap(this.map);
        }

        // 배열에 추가합니다
        dots.push({ circle: circleOverlay, distance: distanceOverlay });
      };

      // 마우스 드래그로 그려지고 있는 선의 총거리 정보를 표시하거
      // 마우스 오른쪽 클릭으로 선 그리가 종료됐을 때 선의 정보를 표시하는 커스텀 오버레이를 생성하고 지도에 표시하는 함수입니다
      const showDistance = (content, position) => {
        if (distanceOverlay) {
          // 커스텀오버레이가 생성된 상태이면

          // 커스텀 오버레이의 위치와 표시할 내용을 설정합니다
          distanceOverlay.setPosition(position);
          distanceOverlay.setContent(content);
        } else {
          // 커스텀 오버레이가 생성되지 않은 상태이면

          // 커스텀 오버레이를 생성하고 지도에 표시합니다
          distanceOverlay = new kakao.maps.CustomOverlay({
            map: this.map, // 커스텀오버레이를 표시할 지도입니다
            content: content, // 커스텀오버레이에 표시할 내용입니다
            position: position, // 커스텀오버레이를 표시할 위치입니다.
            xAnchor: 0,
            yAnchor: 0,
            zIndex: 3,
          });
        }
      };

      // 클릭 지점에 대한 정보 (동그라미와 클릭 지점까지의 총거리)를 지도에서 모두 제거하는 함수입니다
      function deleteCircleDot() {
        var i;

        for (i = 0; i < dots.length; i++) {
          if (dots[i].circle) {
            dots[i].circle.setMap(null);
          }

          if (dots[i].distance) {
            dots[i].distance.setMap(null);
          }
        }

        dots = [];
      }

      // 그려지고 있는 선의 총거리 정보와
      // 선 그리가 종료됐을 때 선의 정보를 표시하는 커스텀 오버레이를 삭제하는 함수입니다
      function deleteDistnce() {
        if (distanceOverlay) {
          distanceOverlay.setMap(null);
          distanceOverlay = null;
        }
      }

      // 마우스 우클릭 하여 선 그리기가 종료됐을 때 호출하여
      // 그려진 선의 총거리 정보와 거리에 대한 도보, 자전거 시간을 계산하여
      // HTML Content를 만들어 리턴하는 함수입니다
      function getTimeHTML(distance) {
        // 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
        self.walkTime = (distance / 67) | 0;
        console.log(self.walkTime);
        var walkHour = "",
          walkMin = "";

        // 계산한 도보 시간이 60분 보다 크면 시간으로 표시합니다
        if (self.walkTime > 60) {
          walkHour =
            '<span class="number">' +
            Math.floor(self.walkTime / 60) +
            "</span>시간 ";
        }
        walkMin = '<span class="number">' + (self.walkTime % 60) + "</span>분";

        // 거리와 도보 시간, 자전거 시간을 가지고 HTML Content를 만들어 리턴합니다
        var content = '<ul class="dotOverlay distanceInfo">';
        content += "    <li>";
        content +=
          '        <span class="label">총거리</span><span class="number">' +
          distance +
          "</span>m";
        content += "    </li>";
        content += "    <li>";
        content +=
          '        <span class="label">도보</span>' + walkHour + walkMin;
        content += "    </li>";
        content += "    <li>";

        return content;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  width: 1180px;
  height: 703px;
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
