<template>
    <div>
        <AppHeader />

        <div class="">
            <form @submit.prevent="join" action="">
                <div id="pjh-joinform-id" class="pjh-joinform">

                    <div id="pjh-joinformLogo" class="pjh-joinform">
                        <p class="pjh-join-p-margin-delete">회원가입</p>
                    </div>


                    <div class="pjh-joinformLabalName">
                        <label class="pjh-joinformLabal" for="">이름</label>
                        <span>{{ userslistVo.users_name }}</span>
                    </div>

                    <div class="pjh-joinformLabalNickName">
                        <label class="pjh-joinformLabal" for="">닉네임</label>
                        <span>{{ userslistVo.users_nickname }}</span>
                    </div>

                    <div class="pjh-joinformLabalHp">
                        <label class="pjh-joinformLabal" for="">핸드폰</label>
                        <select name="" class="pjh-joinformSelectBox" v-model="HpFirstNum">
                            <option value="010">010</option>
                        </select>
                        <span class="pjh-Hpminus">-</span>
                        <input class="pjh-HpNumber" type="text" maxlength="4" v-model="HpmiddleNum"
                            oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" />
                        <span class="pjh-Hpminus">-</span>
                        <input class="pjh-HpNumber" type="text" maxlength="4" v-model="HpLastNum"
                            oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" />
                    </div>

                    <div class="pjh-joinformLabalBirthDate">
                        <label class="pjh-joinformLabal" for="">생년월일</label>
                        <span>{{ userslistVo.users_birth_date }}</span>
                    </div>

                    <div class="pjh-joinformLabalGender">
                        <label class="pjh-joinformLabal" for="">성별</label>

                        <label class="pjh-joinformGenderLabal" for="">남</label>
                        <input class="pjh-joinformGenderRadio" type="radio" name="gender" value="male"
                            v-model="userslistVo.users_gender">

                        <label class="pjh-joinformGenderLabal" for="">여</label>
                        <input class="pjh-joinformGenderRadio" type="radio" name="gender" value="female"
                            v-model="userslistVo.users_gender">

                    </div>

                    <div class="pjh-joinformLabalRegion">
                        <label class="pjh-joinformLabal" for="">거주지역</label>
                        <input class="pjh-joinforminput-class" type="text" placeholder="주소"
                            v-model="userslistVo.users_residence" readonly />
                        <button id="pjh-addressSearchbtn" @click="openPost" type="button">검색</button>
                    </div>

                    <div class="pjh-joinformLabalagreement">
                        <input id="pjh-joinformLabalagreementcheckbox" type="checkbox" v-model="agreement">
                        <span id="pjh-joinformLabalagreementContents">회원가입을 위해 개인정보 수집 및 이용에 동의합니다.</span>
                    </div>

                    <div id="pjh-joinformDoneButton">
                        <button id="pjh-joinformJoinMembershipButton" type="submit">회원가입</button>
                    </div>

                    <div class="pjh-modal-wrap" v-show="JoinmodalPage">
                        <div class="pjh-modal-container">
                            <div class="pjh-modal-content">
                                <p>회원가입에</p>
                                <p>성공하였습니다!</p>
                            </div>
                            <!--  모달창 content  -->

                            <div class="pjh-modal-btn">

                                <button class="pjh-modalclearbtn" @click="JoinTheMembership" type="button"><router-link
                                        id="pjh-JoinEnd" to="/walking/loginpage">확인</router-link></button>
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
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
import axios from 'axios';



export default {
    name: "KakaoJoinView",
    components: {
        AppFooter,
        AppHeader,
    },
    data() {
        return {
            code: "",
            userslistVo: {
                users_id: "",
                users_pw: "",
                users_name: "",
                users_nickname: "",
                users_hp: "",
                users_birth_date: "",
                users_gender: "",
                users_residence: "",
                kakaotoken: "",
                kaka0profile_image: ""
            },
            birthyear: "",
            birthday: "",
            HpFirstNum: "",
            HpmiddleNum: "",
            HpLastNum: "",
            form: {
                email: "",
                pwd: "",
                nickname: "",
                kakaotoken: ""
            }
        };
    },
    methods: {
        getToken() {
            const self = this;
            
            axios.get('http://localhost:9020/api/walking/kakaojoinpage/' + self.code)
                .then((res) => {
                    console.log(res);
                    self.userslistVo.users_id = res.data.id;
                    self.userslistVo.users_nickname = res.data.nickname;
                    self.userslistVo.users_name = res.data.name;
                    self.userslistVo.users_hp = res.data.phone_number;
                    self.birthyear = res.data.birthyear;
                    self.birthday = res.data.birthday;
                    self.userslistVo.users_gender = res.data.gender;
                    self.userslistVo.kakaotoken = res.data.accessToken;
                    self.updateUsersBirthDate();
                    axios.get('http://localhost:9020/api/walking/kakaoBysubscription/' + self.form.id)
                        .then(function (res) {
                            console.log(res);
                            if (res.status == 200) {
                                console.log(res.data.apiData);
                                if (res.data.apiData == false) {
                                    alert('받아온 정보로 회원가입을 진행합니다')
                                } else {
                                    axios({
                                        method: 'post', // put, post, delete                   
                                        url: 'http://localhost:9020/api/walking/Kakaologinpage',
                                        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                                        //params: guestbookVo, //get방식 파라미터로 값이 전달
                                        data: self.form.id, //put, post, delete 방식 자동으로 JSON으로 변환 전달

                                        responseType: 'json' //수신타입
                                    }).then(response => {
                                        console.log(response); //수신데이터

                                        if (response.data.result == "success") {
                                            let authUser = response.data.apiData;

                                            const token = response.headers.authorization.split(" ")[1];

                                            this.$store.commit("setAuthUser", authUser);
                                            this.$store.commit("setToken", token);

                                            console.log(authUser);
                                            console.log(token);

                                            this.$router.push({ path: '/' });

                                        } else {
                                            console.log(response.data.message);
                                            alert("아이디 패스워드를 확인하세요");
                                        }

                                    }).catch(error => {
                                        console.log(error);
                                    });
                                }
                            }
                        })
                })
                .catch((error) => {
                    console.error("Error fetching token:", error);
                });
        },
        updateUsersBirthDate() {
            this.userslistVo.users_birth_date = this.birthyear + this.birthday;
        }
    },
    created() {
        this.code = this.$route.query.code;
        this.getToken();
        
    }
};

</script>

<style></style>