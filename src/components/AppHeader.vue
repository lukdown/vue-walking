<template>
    <div>


            <div class="navbar header" aria-label="Light offcanvas navbar">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbarLight" aria-controls="offcanvasNavbarLight" style="border:2px solid white;">
                        <span><img id="sidemenu-icon" src="@/assets/img/pngwing.com.png" alt="sidebar-btn"></span>
                    </button>

                    <router-link to="/">
                        <img id="logo-img" src="@/assets/img/logo.png" alt="youngground" />
                    </router-link>

                    <div id="ls-gather-btn-box">
                        
                        <ul v-if="this.$store.state.authUser != null">
                            <li id="btn-li">{{ this.$store.state.authUser.user_name}} 님</li>
                            <li><router-link to="/customer/shoppingbasket">Cart</router-link></li>
                            <li><button v-on:click="logout" type="button" class="btn_s" id="logout-btn">Logout</button></li>
                        </ul>
                        
                        <ul v-if="this.$store.state.authUser == null" id="header-ul2">
                            <router-link to="/customer/login">Login</router-link>
                            <router-link to="/customer/join">Sign Up</router-link>
                        </ul>
                    </div>
















                    

                    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbarLight" aria-labelledby="offcanvasNavbarLightLabel">

                        <div class="offcanvas-header border-bottom">
                            <h5 class="offcanvas-title" id="offcanvasNavbarLightLabel">Offcanvas</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>

                        <ul class="list-unstyled ps-0">
                            <li class="mb-1">
                                <button
                                    class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
                                    data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                                    Clothes
                                </button>
                                <div class="collapse show" id="home-collapse">
                                    <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                        <li><router-link to="/customer/productlist"
                                                class="link-dark d-inline-flex text-decoration-none rounded">Outer</router-link>
                                        </li>
                                        <li><router-link to="/customer/productlist"
                                                class="link-dark d-inline-flex text-decoration-none rounded">Top</router-link>
                                        </li>
                                        <li><router-link to="/customer/productlist"
                                                class="link-dark d-inline-flex text-decoration-none rounded">Bottom</router-link>
                                        </li>
                                        <li><router-link to="/customer/productlist"
                                                class="link-dark d-inline-flex text-decoration-none rounded">ETC</router-link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li class="mb-1">
                                <button
                                    class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
                                    data-bs-toggle="collapse" data-bs-target="#dashboard-collapse"
                                    aria-expanded="false">
                                    Event
                                </button>
                                <div class="collapse" id="dashboard-collapse">
                                    <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                        <li><router-link to="#"
                                                class="link-dark d-inline-flex text-decoration-none rounded">출석체크</router-link>
                                        </li>
                                        <li><router-link to="#"
                                                class="link-dark d-inline-flex text-decoration-none rounded">기획전</router-link>
                                        </li>
                                        <li><router-link to="#"
                                                class="link-dark d-inline-flex text-decoration-none rounded">랜덤박스</router-link>
                                        </li>
                                        <li><router-link to="#"
                                                class="link-dark d-inline-flex text-decoration-none rounded">이벤트 당첨자
                                                발표</router-link></li>
                                    </ul>
                                </div>
                            </li>
                            <li class="mb-1">
                                <button
                                    class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
                                    data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
                                    고객센터
                                </button>
                                <div class="collapse" id="orders-collapse">
                                    <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                        <li><router-link to="#"
                                                class="link-dark d-inline-flex text-decoration-none rounded">FAQ</router-link>
                                        </li>
                                        <li><router-link to="#"
                                                class="link-dark d-inline-flex text-decoration-none rounded">1:1
                                                문의게시판</router-link></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>










































            

        
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