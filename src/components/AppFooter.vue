<template>
    <div id="footer-All">











        <div id="footer">
            <div class="all_width">
                <div class="footer_info">
                    <div class="all_call">
                        <h2>C/S CENTER</h2>
                        <!-- 고객센터 정보는 이곳에서 수정해주세요 -->

                        <strong>T. 1588-0404</strong><br>
                        평일 am 10:00 - pm 17:00 점심 pm 13:00 - pm 14:00<br>
                        토.일.공휴일 <font color="#c97979">휴무</font>

                        <br>
                        <p class="sub">※ 고객센터가 연결되지 않으시는 경우 게시판으로 문의주세요.</p>
                    </div>


                </div>
                <div class="footer_info">
                    <div class="all_bank">
                        <h2>ACCOUNT</h2>
                        <!-- 계좌 정보는 이곳에서 수정해주세요 -->

                        국민 00000-00-000000 농협 000-0000-0000-00<br>
                        우리 1005-000-000000<br>
                        예금주 : (주)영수컴퍼니

                        <br>
                        <p class="sub">※ 무통장입금시, 입금자와 주문자 성명이 다른 경우 입금확인 및 배송이 지연될 수 있습니다.</p>


                    </div>
                    <div class="footer_logo">
                        <a href=""> YoungGround</a>
                    </div>
                    COMPANY. <span class="">(주)영수컴퍼니</span><br>
                    OWNER. <span>유영수</span> TEL. <span>02-1588-0355</span><br>
                    ADDRESS. <span>05489 서울특별시 서초구 서초동 1318-2</span><br>
                </div>
                <div class="footer_info">
                    <h2>교환/반품주소</h2>
                    <!-- 반품지 주소 및 택배사 링크주소는 이곳에서 수정해주세요 -->

                    <strong>(05489) 서울특별시 서초구 서초동 1318-2<br></strong>

                    ※ 고객센터에 접수 후 상품 보내주셔야하며, 지정택배사를 이용해주시기 바랍니다.<br>

                    <h2 style="margin-top:20px">SNS</h2>
                    <router-link to="" target="_blank"><i class="fa fa-instagram"></i> INSTAGRAM @dasom</router-link><br><router-link to=""
                        target="_blank"><i class="fa fa-shopping-bag"></i> SMARTSTORE @YoungGround</router-link><br><router-link to=""
                        target="_blank"><i class="fa fa-facebook"></i> FACEBOOK @YoungGround</router-link>
                </div>
            </div>
            <div class="footer_menu">
                <router-link to="#">홈으로</router-link>
                <router-link to="#">회사소개</router-link>
                <router-link to="#">이용약관</router-link>
                <router-link to="#"><strong>개인정보처리방침</strong></router-link>
                <router-link to="#">이용안내</router-link>
            </div>
        </div>

        <!-- //footer -->
















    </div>
</template>

<script>
import '@/assets/css/AppFooter.css'
export default {
    name: "AppFooter",
    components: {},
    data() {
        return {};
    },
    methods: {},
    created() {

    }
};
</script>