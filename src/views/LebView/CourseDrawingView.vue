<template>
  <div class="home">
    <AppHeader />
    <div id="leb-draw">
      <form v-on:submit.prevent="courseDrawSend" action="">
        <!--왼쪽 창-->
        <div id="leb-course-left">
          <h2 id="leb-course-top">코스그리기</h2>

          <!--공개여부-->
          <div id="leb-course-left-whether">
            <span class="leb-course-left-maintext">공개여부</span>
            <label for="rdo-Public" id="leb-course-left-whether-public"
              >공개</label
            >
            <input
              type="radio"
              id="rdo-Public"
              name="whether"
              value="true"
              v-model="courseVo.course_open"
            />
            <label
              for="rdo-nondisclosure"
              id="leb-course-left-whether-nondisclosure"
              >비공개</label
            >
            <input
              type="radio"
              id="rdo-nondisclosure"
              name="whether"
              value="false"
              v-model="courseVo.course_open"
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
              v-model="courseVo.course_name"
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
              v-model="courseVo.course_introduce"
            ></textarea>
          </div>

          <!--난이도-->
          <div id="leb-course-left-clevel">
            <span class="leb-course-left-maintext">난이도</span>
            <select name="clevel" v-model="courseVo.course_difficulty">
              <option value="" selected disabled hidden>난이도</option>
              <option value="매우 쉬움">매우쉬움</option>
              <option value="쉬움">쉬움</option>
              <option value="보통">보통</option>
              <option value="어려움">어려움</option>
              <option value="매우 어려움">매우어려움</option>
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
              this.courseVo.course_time
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
              >{{ this.courseVo.course_length }}
            </span>
          </div>
          <div id="leb-course-left-button">
            <button
              type="button"
              v-on:click="reload()"
              id="leb-course-left-button-back"
            >
              취소
            </button>
            <button type="submit" id="leb-course-left-button-draw">등록</button>
          </div>
        </div>
        <input type="hidden" v-model="courseVo.course_region" />
      </form>

      <!--오른쪽 지도-->
      <div id="leb-course-right-map">
        <div class="map_wrap">
          <div id="map"></div>
          <div id="menu_wrap_start" class="bg_white menu_wrap">
            <div class="option">
              <div>
                <form @submit.prevent="searchDrawStart">
                  키워드 :
                  <input
                    type="text"
                    v-model="searchStart"
                    id="keyword_start"
                    size="15"
                  />
                  <button type="submit">검색하기</button>
                </form>
              </div>
            </div>
            <hr />
            <ul id="placesList_start" class="placesList"></ul>
            <div id="pagination_start" class="pagination"></div>
          </div>
          <div id="menu_wrap_end" class="bg_white menu_wrap">
            <div class="option">
              <div>
                <form @submit.prevent="searchDrawEnd">
                  키워드 :
                  <input
                    type="text"
                    v-model="searchEnd"
                    id="keyword_end"
                    size="15"
                  />
                  <button type="submit">검색하기</button>
                </form>
              </div>
            </div>
            <hr />
            <ul id="placesList_end" class="placesList"></ul>
            <div id="pagination_end" class="pagination"></div>
          </div>
        </div>
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
            <div>
              <img src="@/assets/img/blueping.png" />
              <input
                v-on:keyup.enter.prevent="searchDrawStart"
                v-on:click="searchPlacesListStart"
                type="text"
                id="leb-course-bottom-map-start-point"
                v-model="searchStart"
                placeholder="시작점"
              />
            </div>
          </div>
          <div id="leb-course-bottom-map-search-end-point">
            <img src="@/assets/img/pinkping.png" />
            <input
              v-on:keyup.enter.prevent="searchDrawEnd"
              v-on:click="searchPlacesListEnd"
              type="text"
              id="leb-course-bottom-map-end-point"
              v-model="searchEnd"
              placeholder="도착점"
            />
          </div>
        </div>
        <div id="leb-course-bottom-map-auto-draw">
          <button
            id="leb-course-bottom-map-draw-button"
            v-on:click="getCarDirection"
          >
            그리기
          </button>
          <button type="button" id="leb-course-bottom-map-restart-button">
            초기화
          </button>
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
import axios from "axios";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
import Swal from "sweetalert2";

export default {
  name: "CourseDrawingView",
  data() {
    return {
      searchLocation: "",
      map: null,
      overlays: [],
      clickPosition: [],
      path: [],
      markers: [],
      walkTime: "",
      courseVo: {
        course_name: "",
        course_difficulty: "",
        course_length: "",
        course_region: "",
        course_open: "",
        course_introduce: "",
        course_time: "",
      },
      course_no: "",
      searchStart: "",
      searchEnd: "",
      methodIsRunning: false,
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
  },
  methods: {
    //-------------처음 맵 그리기----------------//
    initMap() {
      var self = this;
      var mapContainer = document.getElementById("map"), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };

      // 지도를 표시할 div와 지도 옵션으로 지도를 생성합니다
      this.map = new kakao.maps.Map(mapContainer, mapOption);

      console.log(this.map);

      // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
      if (navigator.geolocation) {
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function (position) {
          var lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도

          var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다

          self.map.setCenter(locPosition);
        });
      } else {
        // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

        var locPosition = new kakao.maps.LatLng(33.450701, 126.570667);

        self.map.setCenter(locPosition);
      }
      // 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성합니다
      var zoomControl = new kakao.maps.ZoomControl();
      this.map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    },

    //-------------위치 검색--------------//
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
    //네비게이션 map을 이용해서 자동그리기
    async getCarDirection() {
      if (!this.searchStart) {
        alert("시작점을 입력해주세요");
        return;
      }
      if (!this.searchEnd) {
        alert("도착점을 입력해주세요");
        return;
      }
      var distanceOverlay;
      var startMarker;
      var arriveMarker;

      var self = this;
      console.log(this.searchStart);
      console.log(this.searchEnd);
      const REST_API_KEY = "200b872b5ed0a119807476055a282350";
      const url = "https://apis-navi.kakaomobility.com/v1/directions";

      const origin = `${this.searchStart.La},${this.searchStart.Ma}`;
      const destination = `${this.searchEnd.La},${this.searchEnd.Ma}`;

      const headers = {
        Authorization: `KakaoAK ${REST_API_KEY}`,
        "Content-Type": "application/json",
      };

      const queryParams = new URLSearchParams({
        origin: origin,
        destination: destination,
      });

      const requestUrl = `${url}?${queryParams}`;

      try {
        const response = await fetch(requestUrl, {
          method: "GET",
          headers: headers,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);

        data.routes[0].sections[0].roads.forEach((router) => {
          router.vertexes.forEach((vertex, index) => {
            if (index % 2 === 0) {
              self.path.push(
                new kakao.maps.LatLng(
                  router.vertexes[index + 1],
                  router.vertexes[index]
                )
              );
            }
          });
        });

        self.polyline = new kakao.maps.Polyline({
          path: self.path,
          strokeWeight: 5,
          strokeColor: "#068CD2",
          strokeOpacity: 0.7,
          strokeStyle: "solid",
        });

        self.polyline.setMap(this.map);

        console.log("linePahththththht", self.path);
        this.courseVo.course_length = Math.round(self.polyline.getLength());
        console.log("courseVo.course_length ", this.courseVo.course_length);
        var content = getTimeHTML(this.courseVo.course_length);
        showDistance(content, self.path[self.path.length - 1]);
        this.searchPlacesListOver();
        pointDraw(self.path[0], self.path[self.path.length - 1]);
      } catch (error) {
        console.error("Error:", error);
      }

      //초기화 버튼!!
      document
        .getElementById("leb-course-bottom-map-restart-button")
        .addEventListener("click", function () {
          searchReset(); // 검색그리기 리셋 함수 호출
        });

      function searchReset() {
        self.path = []; // 경로를 저장하는 배열 초기화
        if (self.polyline) {
          self.polyline.setMap(null); // 폴리라인 제거
        }
        if (self.markers) {
          self.markers.forEach((marker) => marker.setMap(null)); // 마커들 제거
        }
        if (startMarker) {
          startMarker.setMap(null);
          self.searchStart = null;
        }
        if (arriveMarker) {
          arriveMarker.setMap(null);
          self.searchEnd = null;
        }
        deleteDistnce();
        self.methodIsRunning = false;
      }

      function pointDraw(searchStart, searchEnd) {
        var startSrc =
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png",
          startSize = new kakao.maps.Size(50, 45),
          startOption = {
            offset: new kakao.maps.Point(15, 43),
          };
        var startImage = new kakao.maps.MarkerImage(
          startSrc,
          startSize,
          startOption
        );

        var startDragSrc =
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_drag.png",
          startDragSize = new kakao.maps.Size(50, 64),
          startDragOption = {
            offset: new kakao.maps.Point(15, 54),
          };

        var startDragImage = new kakao.maps.MarkerImage(
          startDragSrc,
          startDragSize,
          startDragOption
        );

        var startPosition = new kakao.maps.LatLng(
          searchStart.Ma,
          searchStart.La
        );

        startMarker = new kakao.maps.Marker({
          map: self.map,
          position: startPosition,
          draggable: true,
          image: startImage,
        });

        kakao.maps.event.addListener(startMarker, "dragstart", function () {
          startMarker.setImage(startDragImage);
        });

        kakao.maps.event.addListener(startMarker, "dragend", function () {
          startMarker.setImage(startImage);
          self.path[0] = startMarker.getPosition();
          if (self.polyline) {
            self.polyline.setPath(self.path);
            self.courseVo.course_length = Math.round(self.polyline.getLength());
            var content = getTimeHTML(self.courseVo.course_length);
            showDistance(content, self.path[self.path.length - 1]);
          }
        });

        var arriveSrc =
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_b.png",
          arriveSize = new kakao.maps.Size(50, 45),
          arriveOption = {
            offset: new kakao.maps.Point(15, 43),
          };

        var arriveImage = new kakao.maps.MarkerImage(
          arriveSrc,
          arriveSize,
          arriveOption
        );

        var arriveDragSrc =
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_drag.png",
          arriveDragSize = new kakao.maps.Size(50, 64),
          arriveDragOption = {
            offset: new kakao.maps.Point(15, 54),
          };

        var arriveDragImage = new kakao.maps.MarkerImage(
          arriveDragSrc,
          arriveDragSize,
          arriveDragOption
        );

        var arrivePosition = new kakao.maps.LatLng(searchEnd.Ma, searchEnd.La);

        arriveMarker = new kakao.maps.Marker({
          map: self.map,
          position: arrivePosition,
          draggable: true,
          image: arriveImage,
        });

        kakao.maps.event.addListener(arriveMarker, "dragstart", function () {
          arriveMarker.setImage(arriveDragImage);
        });

        kakao.maps.event.addListener(arriveMarker, "dragend", function () {
          arriveMarker.setImage(arriveImage);
          self.path[self.path.length - 1] = arriveMarker.getPosition();
          if (self.polyline) {
            self.polyline.setPath(self.path);
            self.courseVo.course_length = Math.round(self.polyline.getLength());
            var content = getTimeHTML(self.courseVo.course_length);
            showDistance(content, self.path[self.path.length - 1]);
          }
        });
      }

      function getTimeHTML(distance) {
        self.walkTime = distance / 67;
        console.log(self.walkTime);

        var walkHour = "",
          walkMin = "",
          walkSec = "";

        var hours = Math.floor(self.walkTime / 60);
        var totalMinutes = self.walkTime;
        var minutes = Math.floor(totalMinutes % 60);
        var seconds = Math.floor(
          (totalMinutes - Math.floor(totalMinutes)) * 60
        );

        var formattedHours = hours < 10 ? "0" + hours : hours;
        var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
        var formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

        walkHour = '<span class="number">' + formattedHours + "</span>시간 ";
        walkMin = '<span class="number">' + formattedMinutes + "</span>분 ";
        walkSec = '<span class="number">' + formattedSeconds + "</span>초";

        var content = '<ul class="dotOverlay distanceInfo">';
        content += "    <li>";
        content +=
          '        <span class="label">총거리</span><span class="number">' +
          distance +
          "</span>m";
        content += "    </li>";
        content += "    <li>";
        content +=
          '        <span class="label">도보</span>' +
          walkHour +
          walkMin +
          walkSec;
        content += "    </li>";
        content += "    <li>";

        self.courseVo.course_time =
          formattedHours + ":" + formattedMinutes + ":" + formattedSeconds;
        return content;
      }

      function showDistance(content, position) {
        if (distanceOverlay) {
          distanceOverlay.setPosition(position);
          distanceOverlay.setContent(content);
        } else {
          distanceOverlay = new kakao.maps.CustomOverlay({
            map: self.map,
            content: content,
            position: position,
            xAnchor: 0,
            yAnchor: 0,
            zIndex: 3,
          });
        }
      }

      // 그려지고 있는 선의 총거리 정보와
      // 선 그리가 종료됐을 때 선의 정보를 표시하는 커스텀 오버레이를 삭제하는 함수입니다
      function deleteDistnce() {
        if (distanceOverlay) {
          distanceOverlay.setMap(null);
          distanceOverlay = null;
        }
      }
    },

    //-------------검색 모달창-----------------//
    searchPlacesListStart() {
      var menu_wrap_start = document.getElementById("menu_wrap_start");
      var menu_wrap_end = document.getElementById("menu_wrap_end");
      menu_wrap_end.style.display = "none";
      menu_wrap_start.style.display = "block";
    },
    searchPlacesListEnd() {
      var menu_wrap_start = document.getElementById("menu_wrap_start");
      var menu_wrap_end = document.getElementById("menu_wrap_end");
      menu_wrap_start.style.display = "none";
      menu_wrap_end.style.display = "block";
    },
    searchPlacesListOver() {
      var menu_wrap_start = document.getElementById("menu_wrap_start");
      var menu_wrap_end = document.getElementById("menu_wrap_end");
      menu_wrap_start.style.display = "none";
      menu_wrap_end.style.display = "none";
      this.searchEnd = null;
      this.searchStart = null;
      this.removeMarker();
    },
    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    removeMarker() {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    },

    //-------------시작점 검색-----------------//
    searchDrawStart() {
      if (this.methodIsRunning) {
        alert("직접그리기 중 입니다.");
        return;
      }
      this.methodIsRunning = true;

      var self = this;
      console.log(this.searchStart);
      // 마커를 담을 배열입니다

      // 장소 검색 객체를 생성합니다
      var ps = new kakao.maps.services.Places();

      // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

      // 키워드로 장소를 검색합니다
      searchPlaces();

      // 키워드 검색을 요청하는 함수입니다
      function searchPlaces() {
        var keyword = document.getElementById("keyword_start").value;

        if (!keyword.replace(/^\s+|\s+$/g, "")) {
          alert("키워드를 입력해주세요!");
          return false;
        }

        // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
        ps.keywordSearch(keyword, placesSearchCB);
      }

      // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
      function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          // 정상적으로 검색이 완료됐으면
          // 검색 목록과 마커를 표출합니다
          displayPlaces(data);

          // 페이지 번호를 표출합니다
          displayPagination(pagination);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          alert("검색 결과가 존재하지 않습니다.");
          return;
        } else if (status === kakao.maps.services.Status.ERROR) {
          alert("검색 결과 중 오류가 발생했습니다.");
          return;
        }
      }

      // 검색 결과 목록과 마커를 표출하는 함수입니다
      function displayPlaces(places) {
        var listEl = document.getElementById("placesList_start"),
          menuEl = document.getElementById("menu_wrap_start"),
          fragment = document.createDocumentFragment(),
          bounds = new kakao.maps.LatLngBounds();

        // 검색 결과 목록에 추가된 항목들을 제거합니다
        removeAllChildNods(listEl);

        // 지도에 표시되고 있는 마커를 제거합니다
        self.removeMarker();

        for (var i = 0; i < places.length; i++) {
          // 마커를 생성하고 지도에 표시합니다
          var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
            marker = addMarker(placePosition, i),
            itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          bounds.extend(placePosition);

          // 마커와 검색결과 항목에 클릭 이벤트 추가
          (function (marker, title, position) {
            kakao.maps.event.addListener(marker, "click", function () {
              console.log("마커 클릭");
              displayInfowindow(marker, title);
              self.searchStart = position;
            });

            itemEl.onclick = function () {
              console.log("itemEl.onclick");
              self.map.setCenter(position);
              self.searchStart = position;
            };
          })(marker, places[i].place_name, placePosition);

          fragment.appendChild(itemEl);
        }

        // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
        listEl.appendChild(fragment);
        menuEl.scrollTop = 0;

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        self.map.setBounds(bounds);
      }

      // 검색결과 항목을 Element로 반환하는 함수입니다
      function getListItem(index, places, placePosition) {
        var el = document.createElement("li"),
          itemStr =
            '<span class="markerbg marker_' +
            (index + 1) +
            '"></span>' +
            '<div class="info">' +
            "   <h5>" +
            places.place_name +
            "</h5>";

        if (places.road_address_name) {
          itemStr +=
            "    <span>" +
            places.road_address_name +
            "</span>" +
            '   <span class="jibun gray">' +
            places.address_name +
            "</span>";
        } else {
          itemStr += "    <span>" + places.address_name + "</span>";
        }

        itemStr += '  <span class="tel">' + places.phone + "</span>" + "</div>";

        el.innerHTML = itemStr;
        el.className = "item";

        // 아이템 클릭 이벤트 추가
        el.onclick = function () {
          self.map.setCenter(placePosition);
        };

        return el;
      }

      // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
      function addMarker(position, idx) {
        var imageSrc =
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
          imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
          imgOptions = {
            spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
          },
          markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imgOptions
          ),
          marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage,
          });

        marker.setMap(self.map); // 지도 위에 마커를 표출합니다
        self.markers.push(marker); // 배열에 생성된 마커를 추가합니다

        return marker;
      }

      // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
      function displayPagination(pagination) {
        var paginationEl = document.getElementById("pagination_start"),
          fragment = document.createDocumentFragment(),
          i;

        // 기존에 추가된 페이지번호를 삭제합니다
        while (paginationEl.hasChildNodes()) {
          paginationEl.removeChild(paginationEl.lastChild);
        }

        for (i = 1; i <= pagination.last; i++) {
          var el = document.createElement("a");
          el.href = "#";
          el.innerHTML = i;

          if (i === pagination.current) {
            el.className = "on";
          } else {
            el.onclick = (function (i) {
              return function () {
                pagination.gotoPage(i);
              };
            })(i);
          }

          fragment.appendChild(el);
        }
        paginationEl.appendChild(fragment);
      }

      // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
      // 인포윈도우에 장소명을 표시합니다
      function displayInfowindow(marker, title) {
        var content = '<div style="padding:5px;z-index:1;">' + title + "</div>";

        infowindow.setContent(content);
        infowindow.open(self.map, marker);
      }

      // 검색결과 목록의 자식 Element를 제거하는 함수입니다
      function removeAllChildNods(el) {
        while (el.hasChildNodes()) {
          el.removeChild(el.lastChild);
        }
      }
    },

    //------------도착점 검색----------------//
    searchDrawEnd() {
      var self = this;
      //console.log(this.searchDrawEnd);
      // 마커를 담을 배열입니다
      // 장소 검색 객체를 생성합니다
      var ps = new kakao.maps.services.Places();

      // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

      // 키워드로 장소를 검색합니다
      searchPlaces();

      // 키워드 검색을 요청하는 함수입니다
      function searchPlaces() {
        var keyword = document.getElementById("keyword_end").value;

        if (!keyword.replace(/^\s+|\s+$/g, "")) {
          alert("키워드를 입력해주세요!");
          return false;
        }

        // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
        ps.keywordSearch(keyword, placesSearchCB);
      }

      // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
      function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          // 정상적으로 검색이 완료됐으면
          // 검색 목록과 마커를 표출합니다
          displayPlaces(data);

          // 페이지 번호를 표출합니다
          displayPagination(pagination);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          alert("검색 결과가 존재하지 않습니다.");
          return;
        } else if (status === kakao.maps.services.Status.ERROR) {
          alert("검색 결과 중 오류가 발생했습니다.");
          return;
        }
      }

      // 검색 결과 목록과 마커를 표출하는 함수입니다
      function displayPlaces(places) {
        var listEl = document.getElementById("placesList_end"),
          menuEl = document.getElementById("menu_wrap_start"),
          fragment = document.createDocumentFragment(),
          bounds = new kakao.maps.LatLngBounds();

        // 검색 결과 목록에 추가된 항목들을 제거합니다
        removeAllChildNods(listEl);

        // 지도에 표시되고 있는 마커를 제거합니다
        self.removeMarker();

        for (var i = 0; i < places.length; i++) {
          // 마커를 생성하고 지도에 표시합니다
          var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
            marker = addMarker(placePosition, i),
            itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          bounds.extend(placePosition);

          // 마커와 검색결과 항목에 클릭 이벤트 추가
          (function (marker, title, position) {
            kakao.maps.event.addListener(marker, "click", function () {
              console.log("마커 클릭");
              displayInfowindow(marker, title);
              self.searchEnd = position;
            });

            itemEl.onclick = function () {
              console.log("itemEl.onclick");
              self.map.setCenter(position);
              self.searchEnd = position;
            };
          })(marker, places[i].place_name, placePosition);

          fragment.appendChild(itemEl);
        }

        // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
        listEl.appendChild(fragment);
        menuEl.scrollTop = 0;

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        self.map.setBounds(bounds);
      }

      // 검색결과 항목을 Element로 반환하는 함수입니다
      function getListItem(index, places, placePosition) {
        var el = document.createElement("li"),
          itemStr =
            '<span class="markerbg marker_' +
            (index + 1) +
            '"></span>' +
            '<div class="info">' +
            "   <h5>" +
            places.place_name +
            "</h5>";

        if (places.road_address_name) {
          itemStr +=
            "    <span>" +
            places.road_address_name +
            "</span>" +
            '   <span class="jibun gray">' +
            places.address_name +
            "</span>";
        } else {
          itemStr += "    <span>" + places.address_name + "</span>";
        }

        itemStr += '  <span class="tel">' + places.phone + "</span>" + "</div>";

        el.innerHTML = itemStr;
        el.className = "item";

        // 아이템 클릭 이벤트 추가
        el.onclick = function () {
          self.map.setCenter(placePosition);
        };

        return el;
      }

      // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
      function addMarker(position, idx) {
        var imageSrc =
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
          imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
          imgOptions = {
            spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
          },
          markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imgOptions
          ),
          marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage,
          });

        marker.setMap(self.map); // 지도 위에 마커를 표출합니다
        self.markers.push(marker); // 배열에 생성된 마커를 추가합니다

        return marker;
      }

      // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
      function displayPagination(pagination) {
        var paginationEl = document.getElementById("pagination_end"),
          fragment = document.createDocumentFragment(),
          i;

        // 기존에 추가된 페이지번호를 삭제합니다
        while (paginationEl.hasChildNodes()) {
          paginationEl.removeChild(paginationEl.lastChild);
        }

        for (i = 1; i <= pagination.last; i++) {
          var el = document.createElement("a");
          el.href = "#";
          el.innerHTML = i;

          if (i === pagination.current) {
            el.className = "on";
          } else {
            el.onclick = (function (i) {
              return function () {
                pagination.gotoPage(i);
              };
            })(i);
          }

          fragment.appendChild(el);
        }
        paginationEl.appendChild(fragment);
      }

      // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
      // 인포윈도우에 장소명을 표시합니다
      function displayInfowindow(marker, title) {
        var content = '<div style="padding:5px;z-index:1;">' + title + "</div>";

        infowindow.setContent(content);
        infowindow.open(self.map, marker);
      }

      // 검색결과 목록의 자식 Element를 제거하는 함수입니다
      function removeAllChildNods(el) {
        while (el.hasChildNodes()) {
          el.removeChild(el.lastChild);
        }
      }
    },

    //---------코스그리기 등록----------------//
    courseDrawSend(event) {
      console.log("코그그리기 등록");
      // firstPointAddress()를 Promise로 호출하여 주소 정보를 가져옴

      // 코스 정보 검증
      if (this.courseVo.course_name == "") {
        event.preventDefault();
        window.alert("코스명을 입력해주세요");
        return false;
      } else if (this.courseVo.course_difficulty == "") {
        event.preventDefault();
        window.alert("코스난이도를 입력해주세요");
        return false;
      } else if (this.courseVo.course_length == "") {
        event.preventDefault();
        window.alert("지도 위에 코스를 그려주세요");
        return false;
      } else if (this.courseVo.course_open == "") {
        event.preventDefault();
        window.alert("공개여부을 입력해주세요");
        return false;
      } else if (this.courseVo.course_introduce == "") {
        event.preventDefault();
        window.alert("코스소개를 입력해주세요");
        return false;
      } else if (this.path.length == 0) {
        // Check if the path array is empty
        event.preventDefault();
        window.alert("지도 위에 코스를 그려주세요");
        return false;
      }
      this.firstPointAddress()
        .then(() => {
          // firstPointAddress()의 Promise가 완료된 후에 실행되는 부분
          console.log("firstPointAddress 이후", this.courseVo);
          console.log("주소", this.courseVo.course_region); // 이제 이 부분에서 course_region이 설정됨

          // 서버로 코스 정보 전송
          axios({
            method: "post",
            url: `${this.$store.state.apiBaseUrl}/api/walking/coursedraw`,
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              Authorization: "Bearer " + this.$store.state.token,
            },
            data: this.courseVo,
            responseType: "json",
          })
            .then((response) => {
              console.log(response.data.apiData);
              this.course_no = response.data.apiData;
              this.coursePointDraw();
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.error("Failed to get address:", error);
        });
    },

    //-------------점그리기------------------//
    coursePointDraw() {
      console.log("coursePointDraw()");
      console.log("coursePointDraw.path", this.path);

      // path 배열을 course_latitude와 course_longitude 필드를 가진 객체 배열로 변환
      const pointList = this.path.map((point, index) => ({
        course_no: this.course_no,
        course_latitude: point.Ma,
        course_longitude: point.La,
        course_order: index + 1, // 순서를 추가하고 싶다면, index를 기반으로 course_order를 설정
      }));

      axios({
        method: "post", // put, post, delete
        url: `${this.$store.state.apiBaseUrl}/api/walking/coursepointdraw`,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + this.$store.state.token,
        },
        data: pointList, // 변환된 pointList를 전송
        responseType: "json", //수신타입
      })
        .then((response) => {
          console.log(response.data.apiData); //수신데이타
          Swal.fire({
            title: "성공!",
            text: "코스 그리기에 성공하셨습니다",
            icon: "success",
            confirmButtonText:
              '<a href="/walking/coursebook/list">코스북으로 이동</a>',
          });
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            title: "실패",
            text: "코스 그리기에 실패하셨습니다",
            icon: "error",
            confirmButtonAriaLabel: "확인",
            confirmButtonText:
              '<a href="/walking/coursebook/list" class="swal2-confirm">코스북으로 이동</a>',
            cancelButtonAriaLabel: "취소",
            showCancelButton: true,
            cancelButtonText: "취소",
          });
        });
    },

    //-------------첫 번째 점 주소 가져오기--------------------//
    firstPointAddress() {
      if (this.path && this.path.length > 0) {
        var self = this;
        var geocoder = new kakao.maps.services.Geocoder();
        var lat = this.path[0].Ma;
        var lng = this.path[0].La;

        return new Promise((resolve, reject) => {
          var callback = function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
              self.courseVo.course_region = result[0].address_name;
              console.log("주소", self.courseVo.course_region); // Set course_region first, then log it
              console.log("firstPointAddress 이후", self.courseVo); // Log after setting course_region
              console.log("코스명", self.courseVo.course_name); // Log after setting course_region
              resolve(); // Resolve the Promise after setting the course_region
            } else {
              reject(new Error("Failed to retrieve address")); // Reject the Promise if unable to retrieve address
            }
          };

          geocoder.coord2RegionCode(lng, lat, callback);
        });
      } else {
        console.log("경로가 없습니다. 경로를 추가하세요.");
      }
    },

    //-------------직접그리기--------------------//
    directDraw() {
      if (this.methodIsRunning) {
        alert("검색으로 그리기 중입니다. 초기화 해주세요");
        return;
      }
      this.methodIsRunning = true;
      console.log("클릭클릭");

      var drawingFlag = false; // 선이 그려지고 있는 상태를 가지고 있을 변수입니다
      var clickLine; // 마우스로 클릭한 좌표로 그려질 선 객체입니다
      var moveLine; // 선이 그려지고 있을때 마우스 움직임에 따라 그려질 선 객체 입니다
      var distanceOverlay; // 선의 거리정보를 표시할 커스텀오버레이 입니다
      //var circleOverlay;
      var dots = {}; // 선이 그려지고 있을때 클릭할 때마다 클릭 지점과 거리를 표시하는 커스텀 오버레이 배열입니다.

      var content;
      var self = this;
      var count = 0;
      var positions = [
        {
          latlng: "",
        },
      ];

      var imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png", // 마커이미지의 주소입니다
        imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
        imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
      var markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      console.log("directDraw()--this.map", this.map);
      // 위에 작성한 옵션으로 Drawing Manager를 생성합니다
      //var manager = new kakao.maps.drawing.DrawingManager(options);
      //console.log(manager);
      kakao.maps.event.addListener(this.map, "click", function (mouseEvent) {
        // 마우스로 클릭한 위치입니다
        self.clickPosition = mouseEvent.latLng;
        console.log("chlickPosition", self.clickPosition);
        // Before setting the latlng property, check if positions[count] is undefined and initialize it if necessary
        if (!positions[count]) {
          positions[count] = {};
        }
        positions[count].latlng = mouseEvent.latLng;

        // 지도 클릭이벤트가 발생했는데 선을 그리고있는 상태가 아니면
        if (!drawingFlag) {
          // 상태를 true로, 선이 그리고있는 상태로 변경합니다
          drawingFlag = true;
          count = 0;
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
            strokeWeight: 3, // 선의 두께입니다
            strokeColor: "#068CD2", // 선의 색깔입니다
            strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
            strokeStyle: "solid", // 선의 스타일입니다
            zIndex: 4,
          });
          // 선이 그려지고 있을 때 마우스 움직임에 따라 선이 그려질 위치를 표시할 선을 생성합니다
          moveLine = new kakao.maps.Polyline({
            strokeWeight: 3, // 선의 두께입니다
            strokeColor: "#068CD2", // 선의 색깔입니다
            strokeOpacity: 0.5, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
            strokeStyle: "solid", // 선의 스타일입니다
            zIndex: 5,
          });
          // 클릭한 지점에 대한 정보를 지도에 표시합니다
          displayCircleDot(self.clickPosition, 0);
          count++;
        } else {
          // 선이 그려지고 있는 상태이면

          // 그려지고 있는 선의 좌표 배열을 얻어옵니다
          self.path = clickLine.getPath();
          // 좌표 배열에 클릭한 위치를 추가합니다
          self.path.push(self.clickPosition);

          // 다시 선에 좌표 배열을 설정하여 클릭 위치까지 선을 그리도록 설정합니다
          clickLine.setPath(self.path);

          self.courseVo.course_length = Math.round(clickLine.getLength());
          displayCircleDot(self.clickPosition, self.courseVo.course_length);
          count++;
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
            self.path = clickLine.getPath();

            // 마우스 클릭으로 그려진 마지막 좌표와 마우스 커서 위치의 좌표로 선을 표시합니다
            var movepath = [self.path[self.path.length - 1], mousePosition];
            moveLine.setPath(movepath);
            moveLine.setMap(self.map);

            (self.courseVo.course_length = Math.round(
              clickLine.getLength() + moveLine.getLength()
            )), // 선의 총 거리를 계산합니다
              (content =
                '<div class="dotOverlay distanceInfo">총거리 <span class="number">' +
                self.courseVo.course_length +
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
          self.path = clickLine.getPath();

          // 선을 구성하는 좌표의 개수가 2개 이상이면
          if (self.path.length > 1) {
            // 마지막 클릭 지점에 대한 거리 정보 커스텀 오버레이를 지웁니다
            if (dots[dots.length - 1].distance) {
              dots[dots.length - 1].distance.setMap(null);
              dots[dots.length - 1].distance = null;
            }

            (self.courseVo.course_length = Math.round(clickLine.getLength())), // 선의 총 거리를 계산합니다
              (content = getTimeHTML(self.courseVo.course_length)); // 커스텀오버레이에 추가될 내용입니다

            // 그려진 선의 거리정보를 지도에 표시합니다
            showDistance(content, self.path[self.path.length - 1]);
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

      //되돌리기 버튼!!
      document
        .getElementById("leb-course-bottom-map-direct-draw-return-button")
        .addEventListener("click", function () {
          undoLastClick(); // 되돌리기 함수 호출
        });

      // 되돌리기 기능 추가
      function undoLastClick() {
        if (clickLine) {
          // clickLine이 존재하면
          self.path = clickLine.getPath(); // 현재 선의 경로 얻기
          self.path.pop(); // 배열에서 마지막 좌표 제거
          clickLine.setPath(self.path); // 선의 경로 설정
          deleteOneCircleDot(); // 기존의 동그라미 지우기
          // 이전 좌표에 대한 거리와 시간 업데이트
          if (self.path.length > 1) {
            count--;
            console.log("count", count);
            console.log("length", self.path.length);
            self.courseVo.course_length = Math.round(clickLine.getLength()); // 총 거리 계산
            var content = getTimeHTML(self.courseVo.course_length); // 거리에 따른 HTML 생성
            showDistance(content, self.path[self.path.length - 1]); // 거리 표시
          } else {
            console.log("마지막 undo");
            deleteDistnce(); // 선이 없으면 정보 삭제
            deleteClickLine();
            deleteCircleDot();
            drawingFlag = false;
            count = 0;
            self.path[0] = null;
            self.methodIsRunning = false;
          }
        }
      }

      // 클릭으로 그려진 선을 지도에서 제거하는 함수입니다
      function deleteClickLine() {
        if (clickLine) {
          clickLine.setMap(null);
          clickLine = null;
        }
      }

      const displayCircleDot = (position, distance) => {
        console.log(count);

        var marker;

        if (count < 1) {
          console.log("찍혀라 쫌");
          marker = new kakao.maps.Marker({
            position: positions[0].latlng,
            image: markerImage,
            draggable: true,
            clickable: true,
          });

          // 마커의 드래그 종료 이벤트에 리스너 추가
          kakao.maps.event.addListener(marker, "dragend", function () {
            self.path = clickLine.getPath();
            self.path[0] = marker.getPosition();
            clickLine.setPath(self.path);
            self.courseVo.course_length = Math.round(clickLine.getLength());
            var content = getTimeHTML(self.courseVo.course_length);
            showDistance(content, self.path[self.path.length - 1]);

            // 거리 오버레이 업데이트
            if (dots[0] && dots[0].distance) {
              dots[0].distance.setPosition(marker.getPosition());
              dots[0].distance.setContent(
                '<div class="dotOverlay">거리 <span class="number">' +
                  self.courseVo.course_length +
                  "</span>m</div>"
              );
            }
          });
          marker.setMap(this.map);
        } else {
          let imageSrc =
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/mini_circle.png";
          let imageSize = new kakao.maps.Size(18, 18);
          let imageOption = { offset: new kakao.maps.Point(4, 12) };
          let markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption
          );

          marker = new kakao.maps.Marker({
            position: positions[count].latlng,
            image: markerImage,
            draggable: true,
            clickable: true,
          });

          // 변경된 부분: 이벤트 리스너에 올바른 인덱스를 사용하도록 설정
          kakao.maps.event.addListener(
            marker,
            "dragend",
            reloadPointDraw(count, marker)
          );

          marker.setMap(this.map);
        }

        console.log("displayCircleDot: ", this.map);
        let distanceOverlay; // distanceOverlay를 함수 스코프 밖으로 이동

        if (distance > 0) {
          distanceOverlay = new kakao.maps.CustomOverlay({
            content:
              '<div class="dotOverlay">거리 <span class="number">' +
              this.courseVo.course_length +
              "</span>m</div>",
            position: position,
            yAnchor: 1,
            zIndex: 2,
          });

          distanceOverlay.setMap(this.map);
        }

        dots.push({ circle: marker, distance: distanceOverlay });

        function reloadPointDraw(index, marker) {
          return function () {
            if (positions[index]) {
              self.path = clickLine.getPath();
              self.path[index] = marker.getPosition();
              positions[index].latlng = marker.getPosition();
              clickLine.setPath(self.path);

              // 변경된 부분: 드래그가 끝난 후 점 사이의 거리 계산 및 표시
              self.courseVo.course_length = Math.round(clickLine.getLength());
              var content = getTimeHTML(self.courseVo.course_length);
              showDistance(content, self.path[self.path.length - 1]);

              // 변경된 부분: 동그라미 클릭으로 그린 점의 거리 표시 업데이트
              if (dots[index] && dots[index].distance) {
                dots[index].distance.setPosition(marker.getPosition());
                dots[index].distance.setContent(
                  '<div class="dotOverlay">거리 <span class="number">' +
                    self.courseVo.course_length +
                    "</span>m</div>"
                );
              }
            } else {
              console.error("Position at index", index, "is undefined.");
            }
          };
        }
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
        count = 0;
        //positions = [];
      }

      // 클릭 지점에 대한 정보 (동그라미와 클릭 지점까지의 총거리)를 지도에서 하나만 제거하는 함수입니다
      // 클릭으로 그려진 선을 지도에서 제거하는 함수입니다
      function deleteOneCircleDot() {
        var lastIndex = dots.length - 1; // 배열의 마지막 인덱스
        if (lastIndex >= 0) {
          // 배열이 비어있지 않을 경우에만 실행
          if (dots[lastIndex].circle) {
            dots[lastIndex].circle.setMap(null);
          }

          if (dots[lastIndex].distance) {
            dots[lastIndex].distance.setMap(null);
          }

          // 마지막으로 추가된 점의 정보 삭제
          dots.pop();
        }
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
        self.walkTime = distance / 67;
        console.log(self.walkTime);

        var walkHour = "",
          walkMin = "",
          walkSec = "";

        // 시간, 분, 초 계산
        var hours = Math.floor(self.walkTime / 60);
        var totalMinutes = self.walkTime;
        var minutes = Math.floor(totalMinutes % 60);
        var seconds = Math.floor(
          (totalMinutes - Math.floor(totalMinutes)) * 60
        );

        // 두 자리 수로 포맷팅
        var formattedHours = hours < 10 ? "0" + hours : hours;
        var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
        var formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

        walkHour = '<span class="number">' + formattedHours + "</span>시간 ";
        walkMin = '<span class="number">' + formattedMinutes + "</span>분 ";
        walkSec = '<span class="number">' + formattedSeconds + "</span>초";

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
          '        <span class="label">도보</span>' +
          walkHour +
          walkMin +
          walkSec;
        content += "    </li>";
        content += "    <li>";

        self.courseVo.course_time =
          formattedHours + ":" + formattedMinutes + ":" + formattedSeconds;
        return content;
      }
    },
    reload() {
      window.location.reload();
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

<style></style>
