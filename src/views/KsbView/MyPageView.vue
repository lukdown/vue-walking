<template>
    <div>
        <AppHeader/>
        <div id="myP-subMenu">
            <h2>마이페이지</h2>
        </div>
        <div id="ksb-profile-area">
        </div>
        <div class="ksb-profile-upload-area">
            <label for="ksb-profile-upload">업로드</label>
            <input type="file" id="ksb-profile-upload">
        </div>
        <div id="myP-detail">
            <ul>
                <li>유영스님</li>
                <li><button id="ksb-member-info">회원정보 수정</button></li>
                <li>우왕~ 많이 걸었당~</li>
                <li><button id="ksb-sticker-btn">스티커</button></li>
                <li><button id="ksb-like-btn">즐겨찾기(2)</button></li>
                <li>총 걸음 1.23km</li>
            </ul>
        </div>
        <div id="ksb-myP-myWalk">
            <span class="ksb-mywalk-span">나의 산책</span>
            <div id="ksb-myP-myWalk-Area">
                <div class="ksb-myP-myWalk-list">
                    <span>2024-05-12</span>
                    <ul>
                        <li>소요시간</li>
                        <li>1시간 11분</li>
                        <li>걸은 거리</li>
                        <li>1.23Km</li>
                        <li>소모 열량</li>
                        <li>333Kcal</li>
                        <img src="" alt="">
                        <span>힘들어...</span>
                    </ul>
                </div>
                <div class="ksb-myP-myWalk-list">
                    <span>2024-05-12</span>
                    <ul>
                        <li>소요시간</li>
                        <li>1시간 11분</li>
                        <li>걸은 거리</li>
                        <li>1.23Km</li>
                        <li>소모 열량</li>
                        <li>333Kcal</li>
                        <img src="" alt="">
                        <span>힘들어...</span>
                    </ul>
                </div>
            </div>
        </div>
        <div id="ksb-myP-achievement">
            <span class="ksb-mywalk-span">도전과제</span>
            <div id="ksb-myP-achievement-Area">
                <ul>
                    <li><img src="" alt=""> 누적 50Km 걷기</li>
                    <li><img src="" alt=""> 누적 500Km 걷기</li>
                </ul>
            </div>
        </div>
        <button id="ksb-member-expire">회원탈퇴</button>

        <AppFooter/>
    </div>
</template>

<script>
import "@/assets/css/KsbCss/MyPage.css";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";

export default {
    name: "MyPageView",
    components: {
        AppFooter,
        AppHeader,
    },
    data() 
    {
        return {};
    },
    methods: {},
};
</script>


<style></style>