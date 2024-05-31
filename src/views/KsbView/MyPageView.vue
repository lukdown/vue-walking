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
                        <form v-on:submit.prevent="KsbuploadFile" action="" method="put">
                            <div id="ksb-profile-area">
                                <img id="ksb-profile-img"
                                    v-bind:src="`${this.$store.state.apiBaseUrl}/upload/${ksbVo.saveName}`"
                                    alt="프로필 사진">


                            </div>
                            <div class="ksb-profile-upload-area">
                                <div id="ksb-profile-upload-area1">
                                    <label for="ksb-profile-upload">업로드</label>
                                    <input type="file" id="ksb-profile-upload" v-on:change="KsbselectFile">
                                </div>
                                <div id="ksb-profile-upload-area2">
                                    <button id="ksb-img-form" type="submit">프로필사진<br>저장하기</button> 
                                </div>
                            </div>

                            <input type="hidden" v-model="ksbVo.users_no">
                        </form>
                    </div>
                    <div id="myP-detail">
                        <div id="myP-name">
                            <span id="myP-name-name">{{ ksbVo.users_nickname }} 님</span>
                            <button id="ksb-member-info"><router-link to="/walking/modifypage">회원정보
                                    수정</router-link>
                            </button>
                        </div>
                        <div id="myP-sticker">
                            <span>우왕~ 많이 걸었당~ <img src="" alt=""></span>
                            <button id="ksb-sticker-btn" @click="getModal">스티커</button>
                            <button id="ksb-like-btn">즐겨찾기(2)</button>
                        </div>
                        <div id="myP-Walk">
                            <span>총 걸음 1.23Km</span>
                            <button id="ksb-myGal-btn">나의 갤러리</button>
                        </div>
                    </div>
                    <div id="ksb-myP-achievement">
                        <div class="ksb-myP-infoArea_achievement">
                            <div class="ksb-myP-infoSub_achievement">
                                <span id="achievement-subtitle">도전과제</span>
                            </div>
                            <div class="ksb-myP-nextBtnArea">
                                <router-link class="ksb-myP-nextBtn" to="/walking/achievement">
                                    <img src="../../assets/img/icon/right-arrow_3031716.png" alt="">
                                </router-link>
                            </div>
                        </div>
                        <div id="ksb-myP-achievement-Area">
                            <ul>
                                <li><img src="../../assets/img/icon/star_full.png" alt="" class="ksb-achievement-img"> 누적
                                    50Km 걷기</li>
                                <li><img src="../../assets/img/icon/star_full.png" alt="" class="ksb-achievement-img"> 누적
                                    500Km 걷기</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div v-if="ksb_openModal" class="ksb-overlay"></div>
                <div v-if="ksb_openModal" class="ksb-modal">
                    <div id="ksb-modal-title-area">
                        <span id="ksb-modal-Sticker">스티커</span>
                        <button @click="closeModal"><img src="../../assets/img/close_1828774.png" alt=""></button>
                    </div>
                    <div id="ksb-main-Sticker"><img src="../../assets/img/newbie.png" alt=""></div>
                    <span id="ksb-modal-mainImg">대표 스티커</span>
                    <div id="ksb-modal-listAll">
                        <ul id="ksb-sticker-List1">
                            <li>
                                <div class="sticker-List-Img"></div>
                            </li>
                            <li>
                                <div class="sticker-List-Img"></div>
                            </li>
                            <li>
                                <div class="sticker-List-Img"></div>
                            </li>
                        </ul>
                        <ul id="ksb-sticker-name1">
                            <li><span class="sticker-List-Title">초보자</span></li>
                            <li><span class="sticker-List-Title">우왕~ 많이 걸었당~</span></li>
                            <li><span class="sticker-List-Title">영 수</span></li>
                        </ul>
                        <ul id="ksb-sticker-List2">
                            <li>
                                <div class="sticker-List-Img"></div>
                            </li>
                            <li>
                                <div class="sticker-List-Img"></div>
                            </li>
                            <li>
                                <div class="sticker-List-Img"></div>
                            </li>
                        </ul>
                        <ul id="ksb-sticker-name2">
                            <li><span class="sticker-List-Title">프로산책러</span></li>
                            <li><span class="sticker-List-Title">고수</span></li>
                            <li><span class="sticker-List-Title">초고수</span></li>
                        </ul>
                    </div>
                    <div id="ksb-modal-submit-area">
                        <button id="ksb-modal-submit-btn">저장하기</button>
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
                                <li v-bind:key="i" v-for="(recordVo, i) in recordList" id="ksb-myP-mywalk-1List">
                                    <div id="ksb-mywalk-List-Date">{{ recordVo.record_date }}</div>
                                    <div>
                                        <div>
                                            <span class="ksb-mywalk-List-Detail">소요시간</span>
                                            <span class="ksb-mywalk-List-Value">{{ recordVo.record_time }}</span>
                                            <span class="ksb-mywalk-List-Detail">걸은 거리</span>
                                            <span class="ksb-mywalk-List-Value">{{ recordVo.record_length
                                                }}</span><br />
                                            <span class="ksb-mywalk-List-Detail">소모 열량</span>
                                            <span class="ksb-mywalk-List-Value">{{ recordVo.record_kcal }}</span>
                                            <span class="ksb-mywalk-List-Detail">오늘의 기분</span>
                                            <span class="ksb-mywalk-List-Value">{{ recordVo.record_vibe }}</span><br />
                                            <span class="ksb-mywalk-List-Detail">산책 메모</span>
                                            <span class="ksb-mywalk-List-Value">{{ recordVo.record_memo }}</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>


                            <div class="ksb-coursemap">
                                <KakaoMap ref="kakaoMap" :recordCourseNo="recordVo.course_no" />
                            </div>
                        </div>























                    </div>
                </div>

                <button id="ksb-member-expire">회원탈퇴</button>
            </div>
        </div>
        <AppFooter />
    </div>
</template>

<script>
import KakaoMap from "@/components/KsbKakaoMap/MypageKakaoMap.vue";
import "@/assets/css/KsbCss/MyPage.css";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
import axios from "axios";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import Swal from "sweetalert2";

export default {
    name: "MyPageView",
    components: {
        AppFooter,
        AppHeader,
        FullCalendar,
        KakaoMap
    },
    data() {
        return {
            ksb_openModal: false,
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
            recordVo: {
                record_no: "",
                users_no: "",
                course_no: "",
                record_date: "",
                record_time: "",
                record_length: "",
                record_kcal: "",
                record_vibe: "",
                record_memo: ""
            },
            recordList: [],
        };
    },
    methods: {
        refreshChild() {
        this.childKey += 1;
        },
        getModal() {
            this.ksb_openModal = true;
        },
        closeModal() {
            this.ksb_openModal = false;
        },
        KsbselectFile(event) {
            console.log("사진 선택");
            this.file = event.target.files[0];
        },

        //달력 리스트 가져오기
        getCalendarList(users_no) {
            this.recordVo.users_no = users_no;
            axios({
                method: 'get', // put, post, delete                   
                url: `${this.$store.state.apiBaseUrl}/api/walking/calendarList`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    Authorization: "Bearer " + this.$store.state.token
                }, //전송타입

                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data.apiData); //수신데이타

                this.records = Array.isArray(response.data.apiData) ? response.data.apiData : [];
                this.updateRecords();

            }).catch(error => {
                console.log(error);
            });
        },

        //기록 달력에 입력하기
        updateRecords() {
            const events = this.records.map(record => ({
                title: `${record.record_date}일 산책기록`,
                start: record.record_date,
                extendedProps: {
                    recordNo: record.record_no,
                    recordCourseNo:record.course_no,
                    recordUserNo:record.users_no,
                    recordDate: record.record_date,
                    recordTime: record.record_time,
                    recordLength: record.record_length,
                    recordKcal: record.record_kcal,
                    recordVibe: record.record_vibe,
                    recordMemo: record.record_memo
                }
            }));
            console.log(events);

            this.calendarOptions.events = events;
            console.log("기록 :", this.calendatOptions.events);

            this.$refs.calendar.getApi().refetchEvents();

        },

        // 기록 리스트
        getrecordList(users_no) {
            console.log("데이터 가져오기");
            this.recordVo.users_no = users_no;
            //console.log(category);

            axios({
                method: "post", // put, post, delete
                url: `${this.$store.state.apiBaseUrl}/api/walking/recordlist`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    Authorization: "Bearer " + this.$store.state.token
                }, //전송타입
                //params: course_category_no, //get방식 파라미터로 값이 전달
                data: this.recordVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

                responseType: "json", //수신타입
            })
                .then((response) => {
                    //console.log(response); //수신데이타
                    this.recordList = response.data.apiData;
                    console.log(this.recordList);
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        //기록 클릭
        RecordClick(info) {
            const { recordCourseNo, recordDate, recordTime, recordLength, recordKcal, recordVibe, recordMemo } = info.event.extendedProps;
            //recordCourseNo:record.course_no,
            Swal.fire({
                title: "기록",
                html: `
            기록 상세: ${info.event.title}
            <br/>걸은 날짜: ${recordDate}
            <br/>걸은 시간: ${recordTime}
            <br/>걸은 거리: ${recordLength} km
            <br/>소모 칼로리: ${recordKcal} kcal
            <br/>오늘의 기분: ${recordVibe}
            <br/>오늘의 메모: ${recordMemo}
        `,
            });
            this.$refs.kakaoMap.initMap(recordCourseNo);
            this.refreshChild();
        }
        ,

        //파일 업로드
        KsbuploadFile() {
            console.log("파일 업로드");

            let formData = new FormData();
            formData.append("file", this.file);
            formData.append("users_no", this.ksbVo.users_no);

            axios({
                method: 'put', // put, post, delete                   
                url: 'http://localhost:9020/api/walking/mypage',
                headers: {
                    "Content-Type": "multipart/form-data",
                }, //전송타입
                //params: guestbookVo, //get방식 파라미터로 값이 전달
                data: formData, //put, post, delete 방식 자동으로 JSON으로 변환 전달

                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data.apiData); //수신데이타
                this.mypage();
                this.$router.push({ path: '/walking/mypage' });
            }).catch(error => {
                console.log(error);
            });
        },
        //회원정보 불러오기
        mypage() {
            console.log("마이페이지");
            axios({
                method: 'get', // put, post, delete                   
                url: 'http://localhost:9020/api/walking/mypage',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    Authorization: "Bearer " + this.$store.state.token
                }, //전송타입
                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data); //수신데이타
                if (response.data.result == "success") {
                    console.log(response.data.apiData);
                    this.ksbVo = response.data.apiData;
                } else {
                    console.log(response.data.message);
                    alert("로그인 하세요");
                    this.$router.push("/walking/loginpage");
                }
            }).catch(error => {
                console.log(error);
            });
        }
    },
    created() {
        this.mypage();
        this.getrecordList(this.$store.state.authUser.users_no);
        this.getCalendarList(this.$store.state.authUser.users_no);
    }
};
</script>


<style></style>