<template>
    <footer id="footer">

        <div id="yys-footer-content">
            
            
            <div id="yys-footer-content-company-infobox">
                <div id="yys-footer-content-header">
                    <div class="yys-footer-content-header-sizebox">
                        <div class="yys-footer-content-header-titleAndicon">
                            <div id="yys-footer-content-header-logo">
                                <router-link to="">
                                    <img src="@/assets/img/icon/testlogo.png" alt="">
                                </router-link>
                            </div>
                        </div>
                        <div class="yys-footer-content-header-titleAndicon">
                            <router-link to="">걸음걸음</router-link>
                        </div>
                        <div class="yys-footer-content-header-titleAndicon">
                            <div id="yys-footer-content-header-icon">
                                <router-link to="#">
                                    <img src="@/assets/img/icon/instargramicon.png" alt="">
                                </router-link>
                                <router-link to="#">
                                    <img src="@/assets/img/icon/facebookicon.png" alt="">
                                </router-link>
                                <router-link to="#">
                                    <img src="@/assets/img/icon/naverblogicon.png" alt="">
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>







                <div id="yys-footer-content-body">
                    <p>
                        | COMPANY. <span class="">(주)YS Company</span> | OWNER. <span>유영수</span> | TEL. <span>02-1588-0355</span> | ADDRESS. <span>05489 서울특별시 서초구 서초동 1318-2</span> |
                    </p>
                </div>









                <div id="yys-footer-content-footer">
                    <div id="yys-footer-content-footer-link">
                        <router-link to="#">홈으로 </router-link>
                        <router-link to="#">회사소개 </router-link>
                        <router-link to="#">이용약관 </router-link>
                        <router-link to="#"><strong>개인정보처리방침 </strong></router-link>
                        <router-link to="#">이용안내</router-link>
                    </div>
                    <div>© 2024 (주)YS Company, Inc. All rights reserved.</div>
                </div>
                
            </div>





            
        </div>

    </footer>
  <!-- //footer -->
</template>

<script>
import "@/assets/css/AppFooter.css";
export default {
  name: "AppFooter",
  components: {},
  data() {
    return {};
  },
  methods: {},
  created() {},
};
</script>