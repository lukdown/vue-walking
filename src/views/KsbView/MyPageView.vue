<template>
    <div>
        <AppHeader/>
        <div id="ksb-myP-All">
            <div>
                <div id="myP-subMenu">
                    <h2>마이페이지</h2>
                </div>
                <div id="ksb-myP-upperarea">
                    <div id="ksb-profile-area">
                    </div>
                    <div class="ksb-profile-upload-area">
                        <label for="ksb-profile-upload">업로드</label>
                        <input type="file" id="ksb-profile-upload">
                    </div>
                    <div id="myP-detail">
                        <div id="myP-name">
                            <span>유영스 님</span>
                            <button id="ksb-member-info">회원정보 수정</button>
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
                            <li><div class="sticker-List-Img"></div></li>
                            <li><div class="sticker-List-Img"></div></li>
                            <li><div class="sticker-List-Img"></div></li>
                        </ul>
                        <ul id="ksb-sticker-name1">
                            <li><span class="sticker-List-Title">초보자</span></li>
                            <li><span class="sticker-List-Title">우왕~ 많이 걸었당~</span></li>
                            <li><span class="sticker-List-Title">영 수</span></li>
                        </ul>
                        <ul id="ksb-sticker-List2">
                            <li><div class="sticker-List-Img"></div></li>
                            <li><div class="sticker-List-Img"></div></li>
                            <li><div class="sticker-List-Img"></div></li>
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
                        <div class="ksb-myP-nextBtnArea">
                            <router-link class="ksb-myP-nextBtn" to="/walking/mywalk"><img src="../../assets/img/icon/right-arrow_3031716.png" alt=""></router-link>
                        </div>
                    </div>
                    <div id="ksb-myP-myWalk-Area">
                        <div class="ksb-myP-myWalk-list">
                            <span>2024-05-12</span>
                            <div>
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
                        <div class="ksb-myP-myWalk-list">
                            <span>2024-05-12</span>
                            <div>
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
                </div>
                <div id="ksb-myP-achievement">
                    <div class="ksb-myP-infoArea">
                        <div class="ksb-myP-infoSub">
                            <span class="ksb-mywalk-span">도전과제</span>
                        </div>
                        <div class="ksb-myP-nextBtnArea">
                            <router-link class="ksb-myP-nextBtn" to="#"><img src="../../assets/img/icon/right-arrow_3031716.png" alt=""></router-link>
                        </div>
                    </div>
                    <div id="ksb-myP-achievement-Area">
                        <ul>
                            <li><img src="../../assets/img/icon/star_3794158.png" alt="" class="ksb-achievement-img"> 누적 50Km 걷기</li>
                            <li><img src="../../assets/img/icon/star_3794158.png" alt="" class="ksb-achievement-img"> 누적 500Km 걷기</li>
                        </ul>
                    </div>
                </div>
                <button id="ksb-member-expire">회원탈퇴</button>
            </div>
        </div>
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
    data() {
        return {
            ksb_openModal:false
        };
    },
    methods: {
        getModal(){
            this.ksb_openModal = true;
        },
        closeModal(){
            this.ksb_openModal = false;
        }
    },
};
</script>


<style></style>