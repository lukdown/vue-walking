<template>
  <div>
    <AppHeader />
    <div id="ksb-myP-All">
      <div>
        <div id="myP-subMenu">
          <h2>마이페이지</h2>
        </div>
        <div id="ksb-myP-upperarea">
          <div id="ksb-img-all">
            <form
              v-on:submit.prevent="KsbuploadFile"
              action=""
              method="put"
              enctype="multipart/form-data"
            >
              <div id="ksb-profile-area">
                <img
                  id="ksb-profile-img"
                  v-bind:src="
                    previewImageUrl ||
                    `${this.$store.state.apiBaseUrl}/upload/${ksbVo.saveName}`
                  "
                  alt="프로필 사진"
                />
              </div>
              <div class="ksb-profile-upload-area">
                <div id="ksb-profile-upload-area1">
                  <label for="ksb-profile-upload">업로드</label>
                  <input
                    type="file"
                    id="ksb-profile-upload"
                    v-on:change="KsbselectFile"
                  />
                </div>
                <div id="ksb-profile-upload-area2">
                  <button id="ksb-img-form" type="submit">
                    프로필사진<br />저장하기
                  </button>
                </div>
              </div>

              <input type="hidden" v-model="ksbVo.users_no" />
            </form>
          </div>
          <div id="myP-detail">
            <div id="myP-name">
              <span id="myP-name-name">{{ ksbVo.users_nickname }} 님</span>
              <button
                v-if="this.$store.state.authUser.users_login_type == 0"
                id="ksb-member-info"
              >
                <router-link to="/walking/modifypage"
                  >회원정보 수정</router-link
                >
              </button>
            </div>
            <div id="myP-sticker">
              <span v-if="daepyoVo && daepyoVo.challenge_name">
                {{ daepyoVo.challenge_name }}
                <img
                  id="daepyo_img"
                  :src="`${this.$store.state.apiBaseUrl}/upload/${daepyoVo.saveName}`"
                  alt=""
                />
              </span>
              <span v-else>대표 도전과제를 설정해보세요!</span>
              <button id="ksb-sticker-btn" @click="getModal">스티커</button>
              <router-link :to="`/walking/coursebook/list`"
                ><button id="ksb-like-btn">
                  즐겨찾기({{ favVo.favCount }})
                </button></router-link
              >
            </div>
            <div id="myP-Walk">
              <span>총 걸음 {{ walkVo.total_length_km }} Km</span>
              <router-link :to="`/walking/mypage/gallery/${ksbVo.users_no}`"
                ><button id="ksb-myGal-btn">나의 갤러리</button></router-link
              >
            </div>
          </div>
          <div id="ksb-myP-achievement">
            <div class="ksb-myP-infoArea_achievement">
              <div class="ksb-myP-infoSub_achievement">
                <span id="achievement-subtitle">도전과제</span>
              </div>
              <div class="ksb-myP-nextBtnArea">
                <router-link class="ksb-myP-nextBtn" to="/walking/achievement">
                  <img
                    src="../../assets/img/icon/right-arrow_3031716.png"
                    alt=""
                  />
                </router-link>
              </div>
            </div>
            <div id="ksb-myP-achievement-Area">
              <ul>
                <li
                  v-bind:key="i"
                  v-for="(aVo, i) in achieve4List"
                  class="ksb-achievement-class"
                >
                  <img
                    src="../../assets/img/icon/star_full.png"
                    alt=""
                    class="ksb-achievement-img"
                  />{{ aVo.challenge_name }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div v-if="ksb_openModal" class="ksb-overlay"></div>
        <div v-if="ksb_openModal" class="ksb-modal">
          <div id="ksb-modal-title-area">
            <span id="ksb-modal-Sticker">스티커</span>
            <button @click="closeModal">
              <img src="../../assets/img/close_1828774.png" alt="" />
            </button>
          </div>
          <div id="ksb-main-Sticker">
            <div v-if="daepyoVo && daepyoVo.saveName">
              <img
                :src="`${this.$store.state.apiBaseUrl}/upload/${daepyoVo.saveName}`"
                alt=""
              />
            </div>
            <div v-else>
              <img src="../../assets/img/흰 아이콘.png" alt="" />
            </div>
          </div>
          <span id="ksb-modal-mainImg">대표 스티커</span>
          <div id="ksb-modal-listAll">
            <ul v-if="challengeList.length > 0" id="ksb-sticker-List1">
              <li
                v-for="(challengeVo, i) in challengeList"
                :key="i"
                @click="setRepresentativeChallenge(challengeVo.challenge_no)"
              >
                <div class="Sticker-1List">
                  <div class="sticker-List-Img">
                    <img
                      :src="`${this.$store.state.apiBaseUrl}/upload/${challengeVo.saveName}`"
                      alt=""
                    />
                  </div>
                  <div class="sticker-Title-Area">
                    <input type="hidden" v-model="challengeVo.challenge_no" />
                    <span class="sticker-List-Title">{{
                      challengeVo.challenge_name
                    }}</span>
                  </div>
                </div>
              </li>
            </ul>
            <ul v-else>
              <span id="modal-else">아직 달성한 도전과제가 없습니다.</span>
            </ul>
          </div>
          <div id="ksb-modal-submit-area">
            <button id="ksb-modal-submit-btn" @click="saveSelectedChallenge">
              저장하기
            </button>
          </div>
        </div>

        <div id="ksb-empty-area"></div>
        <div id="ksb-myP-myWalk">
          <div class="ksb-myP-infoArea">
            <div class="ksb-myP-infoSub">
              <span class="ksb-mywalk-span">나의 산책</span>
            </div>
          </div>
          <div id="ksb-myP-myWalk-Area">
            <div id="ksb-Minicalender-Area">
              <FullCalendar :options="calendarOptions" id="calender" />
            </div>
            <div id="ksb-myP-mywalk-listArea">
              <div id="ksb-myP-mywalk-minititle">
                <span>산책 기록</span>
              </div>

              <ul class="ksb-myP-myWalk-list">
                <li
                  v-bind:key="i"
                  v-for="(recordVo, i) in recordList"
                  id="ksb-myP-mywalk-1List"
                >
                  <div id="ksb-mywalk-List-Date">
                    {{ recordVo.record_date }}
                  </div>
                  <div>
                    <div>
                      <span class="ksb-mywalk-List-Detail">소요시간</span>
                      <span class="ksb-mywalk-List-Value">{{
                        recordVo.record_time
                      }}</span>
                      <span class="ksb-mywalk-List-Detail">걸은 거리</span>
                      <span class="ksb-mywalk-List-Value">{{
                        recordVo.record_length
                      }}</span
                      ><br />
                      <span class="ksb-mywalk-List-Detail">소모 열량</span>
                      <span class="ksb-mywalk-List-Value">{{
                        recordVo.record_kcal
                      }}</span>
                      <span class="ksb-mywalk-List-Detail">오늘의 기분</span>
                      <span class="ksb-mywalk-List-Value">{{
                        recordVo.record_vibe
                      }}</span
                      ><br />
                      <span class="ksb-mywalk-List-Detail">산책 메모</span>
                      <span class="ksb-mywalk-List-Value">{{
                        recordVo.record_memo
                      }}</span>
                    </div>
                  </div>
                </li>
              </ul>

              <div class="ksb-coursemap">
                <KakaoMap
                  ref="kakaoMap"
                  :recordCourseNo="recordVo.course_no"
                  :recordNo="recordVo.record_no"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import KakaoMap from "@/components/KsbKakaoMap/MypageKakaoMap.vue";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
import axios from "axios";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import Swal from "sweetalert2";

import "@/assets/css/KsbCss/MyPage.css";

export default {
  name: "MyPageView",
  components: {
    AppFooter,
    AppHeader,
    FullCalendar,
    KakaoMap,
  },
  data() {
    return {
      previewImageUrl: null,
      ksb_openModal: false,
      selectedChallengeNo: null,
      calendarOptions: {
        plugins: [dayGridPlugin],
        initialView: "dayGridMonth",
        headerToolbar: {
          // 헤더에 표시할 툴 바
          start: "prev next",
          center: "title",
          end: "dayGridMonth,dayGridWeek, today",
        },
        contentHeight: 550,
        weekend: true,
        locale: "ko",
        events: [],
        eventClick: this.RecordClick,
      },
      file: "",
      ksbVo: {
        users_nickname: "",
        users_no: "",
        users_saveName: "",
      },
      walkVo: {
        total_length_km: 0,
      },
      favVo: {
        favCount: 0,
      },
      recordVo: {
        record_no: "",
        users_no: "",
        course_no: "",
        record_date: "",
        record_time: "",
        record_length: "",
        record_kcal: "",
        record_vibe: "",
        record_memo: "",
      },
      testVo: {
        record_no: "",
        users_no: "",
        course_no: "",
      },
      challengeVo: {
        challenge_no: "",
        saveName: "",
      },
      stickerVo: {
        users_no: null,
        challenge_no: null,
      },
      daepyoVo: {
        challenge_name: null,
        saveName: "",
      },
      recordList: [],
      challengeList: [],
      achieve4List: [],
    };
  },
  computed: {},
  methods: {
    refreshChild() {
      this.childKey += 1;
    },
    getModal() {
      console.log("열려라", this.ksb_openModal);
      this.ksb_openModal = true;

      console.log("수빈언니", this.ksb_openModal);
      this.getStickerList();
    },
    closeModal() {
      this.ksb_openModal = false;
    },
    KsbselectFile(event) {
      console.log("사진 선택");
      this.file = event.target.files[0];
      if (this.file) {
        this.previewImageUrl = URL.createObjectURL(this.file);
      }
    },
    //도전과제 리스트 4개 가져오기
    get4Achievement() {
      console.log("도전과제 리스트 가져오기");

      axios({
        method: "get",
        url: `${this.$store.state.apiBaseUrl}/api/gathering/get4Achievement`,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + this.$store.state.token,
        },
        responseType: "json",
      })
        .then((response) => {
          this.achieve4List = response.data.apiData;
          console.log(this.achieve4List);
          console.log("jdfkaljfsdkalfjdasklf");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //즐겨찾기 개수 구하기
    getFavoritesCount() {
      console.log("즐겨찾기 개수 구하기");
      axios({
        method: "get", // put, post, delete
        url: `${this.$store.state.apiBaseUrl}/api/walking/getfavcount`,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + this.$store.state.token,
        }, //전송타입
        responseType: "json", //수신타입
      })
        .then((response) => {
          console.log(response.data); //수신데이타
          if (response.data.result == "success") {
            console.log(response.data.apiData);
            this.favVo.favCount = response.data.apiData;
          } else {
            console.log(response.data.message);
            alert("로그인 하세요");
            this.$router.push("/walking/loginpage");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //대표 도전과제 가져오기
    getChallengeDaepyo() {
      console.log("대표 도전과제");
      axios({
        method: "get", // put, post, delete
        url: `${this.$store.state.apiBaseUrl}/api/walking/getchallengedaepyo`,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + this.$store.state.token,
        }, //전송타입
        responseType: "json", //수신타입
      })
        .then((response) => {
          console.log(response.data);
          console.log("+++++++++++++++++++++++++++++++++"); //수신데이타
          if (response.data.result == "success") {
            this.daepyoVo = response.data.apiData;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getTotalWalk() {
      console.log("총 걸음");
      axios({
        method: "get", // put, post, delete
        url: `${this.$store.state.apiBaseUrl}/api/walking/totalWalk`,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + this.$store.state.token,
        }, //전송타입
        responseType: "json", //수신타입
      })
        .then((response) => {
          console.log(response.data); //수신데이타
          if (response.data.result == "success") {
            console.log(response.data.apiData);
            this.walkVo.total_length_km = response.data.apiData;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setRepresentativeChallenge(challenge_no) {
      this.selectedChallengeNo = challenge_no;
      console.log("selectedChallengeNo:", this.selectedChallengeNo);
    },
    saveSelectedChallenge() {
      this.challengeVo.challenge_no = this.selectedChallengeNo;
      console.log(this.selectedChallengeNo);
      if (!this.selectedChallengeNo) {
        Swal.fire({
          icon: "warning",
          title: "경고!",
          text: "먼저 스티커를 선택하세요.",
        });
        return;
      }
      console.log(this.challengeVo, "------------------------------------");
      axios({
        method: "post",
        url: `${this.$store.state.apiBaseUrl}/api/walking/saveChallengeNo`,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + this.$store.state.token,
        },
        data: this.challengeVo,
        responseType: "json",
      })
        .then((response) => {
          console.log(response.data); // 수신데이터
          if (response.data.result === "success") {
            Swal.fire({
              icon: "success",
              title: "성공!",
              text: "대표 이미지가 변경되었습니다.",
            });
            this.closeModal();
          } else {
            console.error(response.data.message);
          }
          this.getChallengeDaepyo();
          
        })
        .catch((error) => {
          console.error(error);
        });
    },

    //스티커 리스트 가져오기
    getStickerList() {
      //console.log("도전과제 리스트 가져오기");

      axios({
        method: "get",
        url: `${this.$store.state.apiBaseUrl}/api/walking/mypageStickerList`,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + this.$store.state.token,
        },
        responseType: "json",
      })
        .then((response) => {
          this.challengeList = response.data.apiData;
          console.log(this.challengeList);
          console.log("jdfkaljfsdkalfjdasklf");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //달력 리스트 가져오기
    getCalendarList(users_no) {
      this.recordVo.users_no = users_no;
      axios({
        method: "get", // put, post, delete
        url: `${this.$store.state.apiBaseUrl}/api/walking/calendarList`,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + this.$store.state.token,
        }, //전송타입

        responseType: "json", //수신타입
      })
        .then((response) => {
          //console.log(response.data.apiData); //수신데이타

          this.records = Array.isArray(response.data.apiData)
            ? response.data.apiData
            : [];
          this.updateRecords();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //기록 달력에 입력하기
    updateRecords() {
      const events = this.records.map((record) => ({
        title: `${record.record_memo}`,
        start: record.record_date,
        extendedProps: {
          recordNo: record.record_no,
          recordCourseNo: record.course_no,
          recordUserNo: record.users_no,
          recordDate: record.record_date,
          recordTime: record.record_time,
          recordLength: record.record_length,
          recordKcal: record.record_kcal,
          recordVibe: record.record_vibe,
          recordMemo: record.record_memo,
        },
      }));
      //console.log(events);

      this.calendarOptions.events = events;
      //console.log("기록 :", this.calendatOptions.events);
    },

    // 기록 리스트
    getrecordList() {
      console.log("데이터 가져오기");
      //console.log(category);

      axios({
        method: "get", // put, post, delete
        url: `${this.$store.state.apiBaseUrl}/api/walking/recordlist`,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + this.$store.state.token,
        }, //전송타입
        //params: course_category_no, //get방식 파라미터로 값이 전달

        responseType: "json", //수신타입
      })
        .then((response) => {
          //console.log(response); //수신데이타
          this.recordList = response.data.apiData;
          console.log(
            this.recordList,
            "gsdfgsejigherig=============================="
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //기록 클릭
    RecordClick(info) {
      const { recordNo, recordCourseNo } = info.event.extendedProps;
      //recordCourseNo:record.course_no,

      this.$refs.kakaoMap.initMap(recordCourseNo, recordNo);
      this.getSelectedRecord(recordNo, recordCourseNo);
      this.refreshChild();
    },
    getSelectedRecord(recordNo, courseNo) {
      //console.log(recordNo+"fwertfgserkojtgerkyjhiohuiotuyiy");
      //클릭한 기록의 리스트로 바꾸기
      this.testVo.record_no = recordNo;
      this.testVo.users_no = this.$store.state.authUser.users_no;
      this.testVo.course_no = courseNo;
      //console.log(this.testVo, "gdggsrgwergwergwg=================");
      axios({
        method: "post", // put, post, delete
        url: `${this.$store.state.apiBaseUrl}/api/walking/getSelectedRecord`,
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        //params: guestbookVo, //get방식 파라미터로 값이 전달
        data: this.testVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

        responseType: "json", //수신타입
      })
        .then((response) => {
          //console.log(response.data.apiData); //수신데이타
          //console.log(response.data.apiData, "===================================");
          this.recordList = [];
          this.recordList.push(response.data.apiData);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //파일 업로드
    KsbuploadFile() {
      console.log("파일 업로드");

      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("users_no", this.ksbVo.users_no);

      axios({
        method: "put", // put, post, delete
        url: `${this.$store.state.apiBaseUrl}/api/walking/mypage`,
        headers: {
          "Content-Type": "multipart/form-data",
        }, //전송타입
        //params: guestbookVo, //get방식 파라미터로 값이 전달
        data: formData, //put, post, delete 방식 자동으로 JSON으로 변환 전달

        responseType: "json", //수신타입
      })
        .then((response) => {
          console.log(response.data.apiData); //수신데이타
          
          if (response.data.result == "success") {
              this.ksbVo.saveName = response.data.apiData.saveName;
              alert("변경이 완료되었습니다.");
          } else {
            alert("알수없는 오류");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("로그인 하세요");
          this.$router.push("/walking/loginpage");
        });
    },
    //회원정보 불러오기
    mypage() {
      console.log("마이페이지");
      axios({
        method: "get", // put, post, delete
        url: `${this.$store.state.apiBaseUrl}/api/walking/mypage`,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + this.$store.state.token,
        }, //전송타입
        responseType: "json", //수신타입
      })
        .then((response) => {
          console.log(response.data); //수신데이타
          if (response.data.result == "success") {
            //console.log(response.data.apiData);
            this.ksbVo = response.data.apiData;
          } else {
            console.log(response.data.message);
            alert("로그인 하세요");
            this.$router.push("/walking/loginpage");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.mypage();
    this.getrecordList();
    this.getTotalWalk();
    this.getCalendarList(this.$store.state.authUser.users_no);
    this.getChallengeDaepyo();
    this.getFavoritesCount();
    this.getStickerList();
    this.getChallengeDaepyo();
    this.get4Achievement();
  },
};
</script>


<style></style>