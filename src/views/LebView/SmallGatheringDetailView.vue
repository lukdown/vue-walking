<template>
  <div class="home">
    <AppHeader />
    <div class="leb-background">
      <div id="leb-smallgathering-detail">
        <div
          v-if="
            this.$store.state.authUser.users_no == this.gatheringVo.users_no
          "
          id="leb-smallgathering-detail-writer-buttons"
        >
          <h2>소모임</h2>
          <div class="yys-smallgathering-detail-btn">
            <button id="yys-smallgathering-detail-apply-button" @click="getModal(), getappList()">
                신청리스트
            </button>

            <div v-if="yys_openModal" class="yys-modal">
                    <div id="yys-modal-title-area">

                      <div class="yys-modal-title">
                        <span id="yys-modal-Sticker">신청자 명단</span>
                      </div>
                      <div class="yys-modal-title">
                        <p>( 모임장 : {{ this.$store.state.authUser.users_nickname }} )</p>
                      </div>

                      <div class="yys-modal-title">
                        <button @click="closeModal"><img src="../../assets/img/close_1828774.png" alt=""></button>
                      </div>

                    </div>
                    



                    <ul id="yys-list">
                    <li class="yys-list-info" v-bind:key="i" v-for="(s_app_Vo, i) in s_l_List">




                      <div class="yys-list-contentbox">
                        
                        <div>
                          <div class="yys-writing">
              
                            <div class="yys-listcontent-ex">
                              <div class="yys-listinfo-ex1">

                                <p>
                                  <label for="">신청자 닉네임 :</label>
                                  <span>{{ s_app_Vo.users_nickname }}</span>
                                </p>
                                <p>
                                  <label for="">신청자 HP :</label>
                                  <span>{{ s_app_Vo.users_hp }}</span>
                                </p>
                                <p>
                                  <label for="">상태 :</label>
                                  <button id="yys-allow-btn" type="button" v-if="s_app_Vo.application_division == 0" @click="appModify(0, s_app_Vo.users_no)">
                                    수락하기
                                  </button>
                                  <button id="yys-cancel-btn" type="button" v-else-if="s_app_Vo.application_division == 1" @click="appModify(1, s_app_Vo.users_no), applicationDelete()">
                                    수락취소
                                  </button>
                                </p>
                                
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>



                      




                    </li>
                  </ul>














                    
                    <!-- 
                    <div id="yys-modal-submit-area">
                        <button id="yys-modal-submit-btn">저장하기</button>
                    </div>
                    -->

                </div>









            


            <button id="leb-smallgathering-detail-modify-button">
              <router-link
                id="leb-smallgathering-detail-router-link"
                v-bind:to="`/walking/smallgatheringmodify/${gatheringVo.small_gathering_no}`"
                >수정</router-link>
            </button>
            <button
              id="leb-smallgathering-detail-delete-button"
              @click="SmallGatheringDelete()"
            >
              삭제
            </button>
          </div>
        </div>
        <div
          v-else-if="
            this.$store.state.authUser.users_no != this.gatheringVo.users_no
          "
          id="leb-smallgathering-detail-applicant-buttons"
        >
          <h2>소모임</h2>
          <div v-if="this.gatheringVo.is_application == 0">
              <button id="leb-smallgathering-detail-apply-button" @click="applicationUpdate()">
                신청하기
              </button>
          </div>
          <div v-else-if="this.gatheringVo.is_application == 1">
              <button id="leb-smallgathering-detail-apply-button" @click="applicationDelete()">
                신청취소
              </button>
              <span v-if="this.checkinfoVo.application_division == 1">승인</span>
              <span v-if="this.checkinfoVo.application_division == 0">대기</span>
          </div>
          <div v-else-if="this.gatheringVo.application_no_count == this.gatheringVo.small_gathering_total_personnel">
              <button id="leb-smallgathering-detail-apply-button">
                모집마감
              </button>
          </div>
            
        </div>
        <!--사진등록-->
        <div id="leb-smallgathering-detail-img">
          <img
            v-bind:src="`${this.$store.state.apiBaseUrl}/upload/${gatheringVo.small_gathering_saveName}`"
            alt="미리보기 이미지"
            id="leb-preview"
          />
        </div>

        <!--소모임 이름-->
        <div
          id="leb-smallgathering-detail-name"
          class="leb-smallgathering-detail-img-right"
        >
          <span class="leb-smallgathering-detail-title">소모임 이름</span>
          <span class="leb-smallgathering-detail-content">{{
            gatheringVo.small_gathering_name
          }}</span>
        </div>

        <!--주최자 이름-->
        <div
          id="leb-smallgathering-detail-host-name"
          class="leb-smallgathering-detail-img-right"
        >
          <span class="leb-smallgathering-detail-title">주최자 이름</span>
          <span class="leb-smallgathering-detail-content">{{
            gatheringVo.small_gathering_host_name
          }}</span>
        </div>

        <!--주최자 연락처-->
        <div
          id="leb-smallgathering-detail-host-number"
          class="leb-smallgathering-detail-img-right"
        >
          <span class="leb-smallgathering-detail-title">주최자 연락처</span>
          <span class="leb-smallgathering-detail-content">{{
            gatheringVo.small_gathering_hp
          }}</span>
        </div>

        <!--모집인원-->
        <div
          id="leb-smallgathering-detail-required"
          class="leb-smallgathering-detail-img-right"
        >
          <span class="leb-smallgathering-detail-title">모집인원</span>
          <span class="leb-smallgathering-detail-content"
            >{{ gatheringVo.application_no_count }}명 /
            {{ gatheringVo.small_gathering_total_personnel }}명</span
          >
        </div>

        <!--코스-->

        <div
          id="leb-smallgathering-detail-course-choice"
          class="leb-smallgathering-detail-img-right"
        >
          <span class="leb-smallgathering-detail-title">코스 이름</span>
          <span class="leb-smallgathering-detail-content">{{
            gatheringVo.course_name
          }}</span>
        </div>

        <!--모임 일시-->
        <div
          id="leb-smallgathering-detail-date"
          class="leb-smallgathering-detail-img-right"
        >
          <span class="leb-smallgathering-detail-title">모임 일시</span>
          <span class="leb-smallgathering-detail-content">{{
            gatheringVo.small_gathering_date
          }}</span>
        </div>

        <!--신청 마감일-->
        <div
          id="leb-smallgathering-detail-closing-date"
          class="leb-smallgathering-detail-img-right"
        >
          <span class="leb-smallgathering-detail-title">신청마감일</span>
          <span class="leb-smallgathering-detail-content">{{
            gatheringVo.small_gathering_deadline
          }}</span>
        </div>

        <!--신청제한-->
        <div
          id="leb-smallgathering-detail-limit"
          class="leb-smallgathering-detail-img-right"
        >
          <span id="leb-smallgathering-detail-limit-title">신청 제한</span>
          <span id="leb-smallgathering-detail-limit-gender">
            <span class="leb-smallgathering-detail-title">성별</span>
            <span class="leb-smallgathering-detail-content">{{
              gatheringVo.small_gathering_gender_limit
            }}</span>
          </span>
          <span id="leb-smallgathering-detail-limit-age">
            <span class="leb-smallgathering-detail-title">나이</span>
            <span class="leb-smallgathering-detail-content">{{
              gatheringVo.small_gathering_age_limit
            }}</span>
          </span>
        </div>

        <!--코스 위치-->
        <div id="leb-smallgathering-detail-course-map">
          <div id="leb-smallgathering-detail-course-location">코스 위치</div>
          <div id="MGDKMmap">
            <div style="display: none"></div>
          </div>
        </div>

        <!--모임정보-->
        <div id="leb-smallgathering-detail-information">
          <div class="leb-smallgathering-detail-title">모임정보</div>
          <div class="leb-smallgathering-detail-content">
            {{ gatheringVo.small_gathering_information }}
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
//import SmallGatheringKakaoMap from "@/components/PjhKakaoMap/SmallGatheringDetailKakaoMap";
import "@/assets/css/LebCss/SmallGatheringDetail.css";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
import axios from "axios";
import { Modal } from 'bootstrap';

export default {
  name: "SmallGatheringDetailView",
  components: {
    AppFooter,
    AppHeader,
    //SmallGatheringKakaoMap
  },
  data() {
    return {
      checkinfoVo: {
        users_no: "",
        course_no: "",
        course_name: "",
        small_gathering_no: "",
        small_gathering_name: "",
        small_gathering_host_name: "",
        small_gathering_hp: "",
        small_gathering_total_personnel: "",
        small_gathering_date: "",
        small_gathering_deadline: "",
        small_gathering_information: "",
        small_gathering_region: "",
        small_gathering_gender_limit: "",
        small_gathering_age_limit: "",
        small_gathering_saveName: "",
        application_no_count: "",
        is_application: "",
        application_no: "",
      },
      checkVo: {
        small_gathering_no: "",
        users_no: "",
      },
      yys_openModal: false,
      file: "",
      s_l_List: [],
      applicationVo: {
        category: "",
        small_gathering_no: "",
        users_no: "",
      },
      gatheringVo: {
        users_no: "",
        course_no: "",
        course_name: "",
        small_gathering_no: "",
        small_gathering_name: "",
        small_gathering_host_name: "",
        small_gathering_hp: "",
        small_gathering_total_personnel: "",
        small_gathering_date: "",
        small_gathering_deadline: "",
        small_gathering_information: "",
        small_gathering_region: "",
        small_gathering_gender_limit: "",
        small_gathering_age_limit: "",
        small_gathering_saveName: "",
        application_no_count: "",
        is_application: "",
      },
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
    
    
    /* global kakao */
    if (window.kakao && window.kakao.maps) {
      this.initMap();
      const script = document.createElement("script");
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=df6af04d0c7740cc52da078913f38627";
      document.head.appendChild(script);
    } else {
      const script = document.createElement("script");
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=df6af04d0c7740cc52da078913f38627";
      document.head.appendChild(script);
    }

    
  },
  methods: {
    getModal() {
            this.yys_openModal = true;
    },
    closeModal() {
            this.yys_openModal = false;
    },
    showImageModal() {
      const imageModal = new Modal(document.getElementById('imageModal'));
      imageModal.show();
    },

    initMap() {
      this.course_point_Vo.course_no = this.$route.params.course_no;
      var mapContainer = document.getElementById("MGDKMmap"), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(37.498457376358886, 127.02681299738605), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };

      var map = new kakao.maps.Map(mapContainer, mapOption);
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
    },
    // 해당 소모임 정보
    getSmallGatheringDetailData() {
      axios({
        method: "get", // put, post, delete
        url:
          `${this.$store.state.apiBaseUrl}/api/walking/getSmallGatheringDetailData/` +
          this.$route.params.small_gathering_no,
        headers: { "Content-Type": "application/json; charset=utf-8",
          "Authorization": "Bearer " + this.$store.state.token
        }, //전송타입+토큰

        //params: guestbookVo, //get방식 파라미터로 값이 전달
        //data: guestbookVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

        responseType: "json", //수신타입
      })
        .then((response) => {
          //console.log(response.data.apiData);//수신데이타

          this.gatheringVo = response.data.apiData;
          //console.log("================");
          //console.log(this.gatheringVo);//수신데이타
          //console.log("================");

          //this.$refs.pjhref.initMap(this.gatheringVo.course_no);
          //this.callChildMethod(this.gatheringVo.course_no);
          //console.log(this.gatheringVo.course_no);
          //this.initMap();
          //console.log("===========================================");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 소모임 삭제
    SmallGatheringDelete() {
      console.log("삭제");

      axios({
        method: "delete", // put, post, delete
        url: `${this.$store.state.apiBaseUrl}/api/walking/smallgatheringupdatedelete`,
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        // params: guestbookVo, //get방식 파라미터로 값이 전달
        data: this.gatheringVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

        responseType: "json", //수신타입
      })
        .then((response) => {
          console.log(response.data); //수신데이타
          this.$router.push("/walking/smallgatheringpage");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 소모임 신청 등록
    applicationUpdate() {
      console.log("소모임 신청");
      this.applicationVo.small_gathering_no = this.gatheringVo.small_gathering_no;
      this.applicationVo.users_no = this.$store.state.authUser.users_no;

      axios({
        method: "post", // put, post, delete
        url: `${this.$store.state.apiBaseUrl}/api/walking/applicationupdatedelete`,
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        // params: guestbookVo, //get방식 파라미터로 값이 전달
        data: this.applicationVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

        responseType: "json", //수신타입
      })
        .then((response) => {
          console.log(response.data); //수신데이타
          this.getSmallGatheringDetailData();
          this.getappCheck();



          
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 소모임 신청 취소
    applicationDelete() {
      console.log("소모임 취소");
      this.applicationVo.small_gathering_no = this.gatheringVo.small_gathering_no;
      this.applicationVo.users_no = this.$store.state.authUser.users_no;

      axios({
        method: "delete", // put, post, delete
        url: `${this.$store.state.apiBaseUrl}/api/walking/applicationupdatedelete`,
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        // params: guestbookVo, //get방식 파라미터로 값이 전달
        data: this.applicationVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

        responseType: "json", //수신타입
      })
        .then((response) => {
          console.log(response.data); //수신데이타
          this.getSmallGatheringDetailData();
          this.getappList();
          //this.getappCheck();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 소모임 신청 리스트
    getappList() {
      console.log("소모임 신청 리스트 가져오기");
      //this.loginVo.users_no = this.$store.state.authUser.users_no;
      //console.log(this.loginVo);

      axios({
        method: "post", // put, post, delete
        url: `${this.$store.state.apiBaseUrl}/api/walking/small_app_list`,
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        //params: guestbookVo, //get방식 파라미터로 값이 전달
        data: this.gatheringVo, //put, post, de    lete 방식 자동으로 JSON으로 변환 전달

        responseType: "json", //수신타입
      })
        .then((response) => {
          //console.log(response.data.apiData); //수신데이타
          this.s_l_List = response.data.apiData;
          //console.log(this.s_l_List);
          // for (let index = 0; index < this.lList.length; index++) {
          //   console.log(this.lList[index]);
          //   if(this.lList[index].course_like_no == 0) {
          //     console.log("우엑");
          //   }else {
          //     console.log("우엑2");
          //   }

          // }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 소모임 신청 수락 취소
    appModify(category ,users_no) {
      console.log("소모임 신청 수락");
      this.applicationVo.small_gathering_no = this.gatheringVo.small_gathering_no;
      this.applicationVo.users_no = users_no;
      this.applicationVo.category = category;
      //this.applicationVo.users_no = this.$store.state.authUser.users_no;
      
      axios({
        method: "put", // put, post, delete
        url: `${this.$store.state.apiBaseUrl}/api/walking/small_app_modify`,
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        // params: guestbookVo, //get방식 파라미터로 값이 전달
        data: this.applicationVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

        responseType: "json", //수신타입
      })
        .then((response) => {
          console.log(response); //수신데이타
          this.getappList();
          this.getSmallGatheringDetailData();
          // this.getList(
          //   this.$store.state.login_users_no,
          //   this.$store.state.category
          // );
          
          
        })
        .catch((error) => {
          console.log(error);
        });
    },






    // 소모임 신청 확인
    getappCheck() {
      console.log("소모임 신청 확인");
      //this.loginVo.users_no = this.$store.state.authUser.users_no;
      this.checkVo.users_no = this.$store.state.authUser.users_no;
      this.checkVo.small_gathering_no = this.$route.params.small_gathering_no;
      //console.log("======================");
      //console.log(this.checkVo);
      //console.log("======================");

      axios({
        method: "post", // put, post, delete
        url: `${this.$store.state.apiBaseUrl}/api/walking/small_app_check`,
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        //params: guestbookVo, //get방식 파라미터로 값이 전달
        data: this.checkVo, //put, post, de    lete 방식 자동으로 JSON으로 변환 전달

        responseType: "json", //수신타입
      })
        .then((response) => {
          //console.log(response.data.apiData); //수신데이타
          this.checkinfoVo = response.data.apiData;
          console.log("//////////////////////////////");
          console.log(this.checkinfoVo);
          console.log("//////////////////////////////");
          //console.log(this.s_l_List);
          // for (let index = 0; index < this.lList.length; index++) {
          //   console.log(this.lList[index]);
          //   if(this.lList[index].course_like_no == 0) {
          //     console.log("우엑");
          //   }else {
          //     console.log("우엑2");
          //   }

          // }
        })
        .catch((error) => {
          console.log(error);
        });
    },































  },
  created() {
    this.getSmallGatheringDetailData();
    this.getappCheck();
  },
};
</script>
<style scoped>
#MGDKMmap {
  width: 100%;
  height: 400px;
}
</style>