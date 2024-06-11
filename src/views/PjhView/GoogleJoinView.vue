<template>
    <div v-if="this.isLoading == true" class="loading-overlay">
        <p>Loading...</p>
    </div>
    <div v-else-if="this.isLoading == false">
        <AppHeader />

        <div class="">
            <form @submit.prevent="googlejoin" action="">
                <div id="pjh-Kakaojoinform-id" class="pjh-Kakaojoin">

                    <div id="pjh-KakaojoinformLogo" class="pjh-Kakaojoin">
                        <p class="pjh-joKakaojoinin-p-margin-delete">회원가입</p>
                    </div>


                    <div class="pjh-KakaojoinformLabalName">
                        <label class="pjh-KakaojoinformLabal" for="">이름</label>
                        <span class="pjh-Kakaojoinspanfont">{{ this.userslistVo.users_name }}</span>
                    </div>

                    <div class="pjh-KakaojoinformLabalNickName">
                        <label class="pjh-KakaojoinformLabal" for="">닉네임</label>
                        <input class="pjh-Kakaojoinforminput-class" type="text" v-model="this.userslistVo.users_nickname">
                    </div>

                    <div class="pjh-KakaojoinformLabalHp">
                        <label class="pjh-KakaojoinformLabal" for="">핸드폰</label>
                        <select name="010firstnum" class="pjh-KakaojoinformSelectBox" v-model="HpFirstNum">
                            <option class="010firstnum" value="010">010</option>
                        </select>
                        <span class="pjh-KakaojoinHpminus">-</span>
                        <input class="pjh-KakaojoinHpNumber" type="text" maxlength="4" v-model="HpmiddleNum"
                            oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" />
                        <span class="pjh-KakaojoinHpminus">-</span>
                        <input class="pjh-KakaojoinHpNumber" type="text" maxlength="4" v-model="HpLastNum"
                            oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" />
                    </div>

                    <div class="pjh-KakaojoinformLabalBirthDate">
                        <label class="pjh-KakaojoinformLabal" for="">생년월일</label>
                        <span class="pjh-Kakaojoinspanfont">{{ this.userslistVo.users_birth_date }}</span>
                    </div>

                    <div class="pjh-KakaojoinformLabalGender">
                        <label class="pjh-KakaojoinformLabal" for="">성별</label>

                        <span v-if="userslistVo.users_gender == 'male'" class="pjh-Kakaojoinspanfont">남자</span>
                        <span v-else-if="userslistVo.users_gender == 'female'" class="pjh-Kakaojoinspanfont">여자</span>
                    </div>

                    <div class="pjh-KakaojoinformLabalRegion">
                        <label class="pjh-KakaojoinformLabal" for="">거주지역</label>
                        <input class="pjh-Kakaojoinforminput-class" type="text" placeholder="주소"
                            v-model="userslistVo.users_residence" readonly />
                        <button id="pjh-addressSearchbtn" @click="openPost" type="button">검색</button>
                    </div>

                    <div class="pjh-KakaojoinformLabalagreement">
                        <input id="pjh-KakaojoinformLabalagreementcheckbox" type="checkbox" v-model="agreement">
                        <span id="pjh-KakaojoinformLabalagreementContents">회원가입을 위해 개인정보 수집 및 이용에 동의합니다.</span>
                    </div>

                    <div id="pjh-KakaojoinformDoneButton">
                        <button id="pjh-KakaojoinformJoinMembershipButton" type="submit">회원가입</button>
                    </div>

                    <div class="pjh-Kakaojoinmodal-wrap" v-show="JoinmodalPage">
                        <div class="pjh-Kakaojoinmodal-container">
                            <div class="pjh-Kakaojoinmodal-content">
                                <p>회원가입에</p>
                                <p>성공하였습니다!</p>
                            </div>
                            <!--  모달창 content  -->

                            <div class="pjh-Kakaojoinmodal-btn">

                                <button class="pjh-Kakaojoinmodalclearbtn" @click="JoinokandLogin"
                                    type="button">확인</button>
                            </div>
                        </div>
                    </div>


                </div>
            </form>
        </div>

        <AppFooter />
    </div>
</template>

<script>
import "@/assets/css/PjhCss/KakaoJoinView.css";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
import axios from 'axios';



export default {
    name: "GoogleJoinView",
    components: {
        AppFooter,
        AppHeader,
    },
    data() {
        return {
            code: "",
            isLoading: true,
            userslistVo: {
                users_id: "",
                users_name: "",
                users_nickname: "",
                users_hp: "",
                users_birth_date: "",
                users_gender: "",
                users_residence: "",
                googleToken: "",
                kaka0profile_image: ""
            },
            JoinmodalPage: false,
            birthyear: "",
            birthday: "",
            HpFirstNum: "",
            HpmiddleNum: "",
            HpLastNum: "",
            agreement: "",
        };
    },
    methods: {
        getGoogleToken() {
            const self = this;
            //self.isLoading = true; // 로딩 시작
            //console.log(this.code);

            axios({
                method: 'post', // put, post, delete                   
                url: `${this.$store.state.apiBaseUrl}/api/walking/googlejoinpage`,
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                //params: guestbookVo, //get방식 파라미터로 값이 전달
                data: encodeURIComponent(this.code), //put, post, delete 방식 자동으로 JSON으로 변환 전달

                responseType: 'json' //수신타입
            }).then((response) => {
                if (response.data.accessToken != "") {
                    console.log(response);

                    self.userslistVo.users_id = response.data.id;
                    self.userslistVo.users_nickname = response.data.nickname;
                    self.userslistVo.users_name = response.data.name;
                    self.userslistVo.users_birth_date = response.data.birthday;
                    self.userslistVo.users_gender = response.data.gender;
                    self.userslistVo.googleToken = response.data.accessToken;

                    console.log(this.userslistVo);

                    axios.get(`${this.$store.state.apiBaseUrl}/api/walking/googleBysubscription/` + self.userslistVo.users_id)
                        .then(function (res) {
                            console.log(res);
                            
                            if (res.status == 200) {
                                console.log(res.data.apiData);
                                if (res.data.apiData == false) {
                                    alert('받아온 정보로 회원가입을 진행합니다')
                                    self.isLoading = false; // 로딩 끝
                                } else {
                                    console.log("로그인확인");
                                    self.googlelogin()
                                }
                            }
                            

                        })
                }else{
                    this.$router.push("/walking/loginpage");
                }



            })
                .catch((error) => {
                    console.error("Error fetching token:", error);
                    self.isLoading = false; // 로딩 끝 (오류 발생 시에도)
                });

        },

        googlejoin(event) {

            this.userslistVo.users_hp = `${this.HpFirstNum}-${this.HpmiddleNum}-${this.HpLastNum}`

            //console.log(this.userslistVo.users_birth_date);
            //console.log(this.userslistVo.users_hp);

            //console.log("등록");

            if (this.userslistVo.users_id == undefined) {
                event.preventDefault();//폼기능 제한
                window.alert("로그인을 다시시도해주세요");//경고장
                return false;//이벤트 전파를 막는다
            } else if (this.userslistVo.users_name == undefined) {
                event.preventDefault();//폼기능 제한
                window.alert("로그인을 다시시도해주세요");//경고장
                return false;//이벤트 전파를 막는다
            } else if (this.userslistVo.users_nickname == "") {
                event.preventDefault();//폼기능 제한
                window.alert("닉네임을 입력해주세요");//경고장
                return false;//이벤트 전파를 막는다
            } else if (this.userslistVo.users_hp == undefined) {
                event.preventDefault();//폼기능 제한
                window.alert("카카오로그인을 다시시도해주세요");//경고장
                return false;//이벤트 전파를 막는다
            } else if (this.HpFirstNum == "") {
                event.preventDefault();//폼기능 제한
                window.alert("전화번호를 전부 입력해주세요");//경고장
                return false;//이벤트 전파를 막는다
            } else if (this.HpmiddleNum == "") {
                event.preventDefault();//폼기능 제한
                window.alert("전화번호를 전부 입력해주세요");//경고장
                return false;//이벤트 전파를 막는다
            } else if (this.HpmiddleNum.length != 4) {
                event.preventDefault();//폼기능 제한
                window.alert("전화번호를 4자리 전부 입력해주세요");//경고장
                return false;//이벤트 전파를 막는다
            } else if (this.HpLastNum == "") {
                event.preventDefault();//폼기능 제한
                window.alert("전화번호를 전부 입력해주세요");//경고장
                return false;//이벤트 전파를 막는다
            } else if (this.HpLastNum.length != 4) {
                event.preventDefault();//폼기능 제한
                window.alert("전화번호를 4자리 전부 입력해주세요");//경고장
                return false;//이벤트 전파를 막는다
            } else if (this.userslistVo.users_birth_date == undefined) {
                event.preventDefault();//폼기능 제한
                window.alert("카카오로그인을 다시시도해주세요");//경고장
                return false;//이벤트 전파를 막는다
            } else if (this.userslistVo.users_gender == undefined) {
                event.preventDefault();//폼기능 제한
                window.alert("카카오로그인을 다시시도해주세요");//경고장
                return false;//이벤트 전파를 막는다
            } else if (this.userslistVo.users_residence == "") {
                event.preventDefault();//폼기능 제한
                window.alert("거주지역을 입력해주세요");//경고장
                return false;//이벤트 전파를 막는다
            } else if (this.agreement == "") {
                event.preventDefault();//폼기능 제한
                window.alert("개인정보 수짐 및 이용에 동의해주세요");//경고장
                return false;//이벤트 전파를 막는다
            } else {
                axios({
                    method: 'post', // put, post, delete                   
                    url: `${this.$store.state.apiBaseUrl}/api/walking/Googlejoinpage`,
                    headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                    //params: guestbookVo, //get방식 파라미터로 값이 전달
                    data: this.userslistVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

                    responseType: 'json' //수신타입
                }).then(response => {
                    console.log(response.data.apiData); //수신데이타

                    this.JoinTheMembership();
                    //this.$router.push({ path: '/user/joinok' });
                }).catch(error => {
                    console.log(error);
                });
            }


        },
        
        googlelogin() {
            console.log("로그인");

            axios({
                method: 'post', // put, post, delete                   
                url: `${this.$store.state.apiBaseUrl}/api/walking/Googleloginpage`,
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                //params: guestbookVo, //get방식 파라미터로 값이 전달
                data: this.userslistVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response); //수신데이터

                if (response.data.result == "success") {
                    let authUser = response.data.apiData;

                    const token = response.headers.authorization.split(" ")[1];

                    this.$store.commit("setAuthUser", authUser);
                    this.$store.commit("setToken", token);
                    this.$store.commit("setGoogleToken",this.userslistVo.googleToken)

                    console.log(authUser);
                    console.log(token);
                    console.log(this.userslistVo.googleToken)

                    this.$router.push({ path: '/' });

                } else {
                    console.log(response.data.message);
                    alert("아이디 패스워드를 확인하세요");
                }

            }).catch(error => {
                console.log(error);
            });

        },
        openPost() {
            new window.daum.Postcode({
                oncomplete: (data) => {
                    if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                        this.userslistVo.users_residence = data.roadAddress;
                    } else { // 사용자가 지번 주소를 선택했을 경우(J)
                        this.userslistVo.users_residence = data.jibunAddress;
                    }
                }
            }).open();
        },
        JoinTheMembership() {
            this.JoinmodalPage = !this.JoinmodalPage
        },
        JoinokandLogin() {
            this.googlelogin();
        }

    },
    created() {
        this.code = this.$route.query.code;
        this.getGoogleToken();


    }
};

</script>

<style></style>