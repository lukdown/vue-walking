<template>
    <div>


        <div class="ksb-header">
            <div class="ksb-header-All">



                <div class="title"></div>
                <div class="title">
                    <router-link to="/">
                        <h1>걸음걸음
                            <img class="footprint" src="@/assets/img/발자국.png" alt="걸음걸음">
                        </h1>
                    </router-link>
                </div>

                <div class="title">
                    <div id="ksb-btn-box">
                        <ul v-if="this.$store.state.authUser != null">
                            <span>{{ this.$store.state.authUser.users_name }} 님</span>
                            <button v-on:click="logout" type="button" class="btn_s" id="logout-btn">로그아웃</button>
                        </ul>

                        <ul v-if="this.$store.state.authUser == null" id="header-ul2">
                            <router-link to="/walking/loginpage">로그인</router-link>
                            <router-link to="/walking/joinpage">회원가입</router-link>
                        </ul>
                    </div>
                </div>





            </div>
        </div>












        <nav class="ksb-nav">
            <div class="ksb-nav_menuAll">
                <ul class="ksb-nav_menu">
                    <li><router-link to="/walking/coursebook">코스북</router-link></li>
                    <li><router-link to="/walking/coursedraw">코스 그리기</router-link></li>
                    <li><router-link to="/walking/amenity">편의시설</router-link></li>
                    <li><router-link to="/walking/gallery">갤러리</router-link></li>
                    <li><router-link to="/walking/smallgatheringpage">소모임</router-link></li>
                    <li><router-link to="/walking/mypage">마이페이지</router-link></li>
                </ul>
            </div>

        </nav>












































    </div>
</template>
<script>
import '@/assets/css/AppHeader.css'

export default {
    name: "AppHeader",
    components: {},
    data() {
        return {};
    },
    methods: {
        logout() {
            console.log("로그아웃이다 임마!!!");
            this.$store.commit("setAuthUser", null);
            this.$store.commit("setToken", null);
        }
    },
    created() { }
};
</script>