<template>
    <div>
        <form v-on:submit.prevent="addAchievement" action="">
            <div>

                <div class="leb-upload-box">
                    <div id="drop-file" class="leb-drag-file">
                        <p class="leb-upload-box-message">사진을 등록해주세요</p>
                        <img v-bind:src="previewImageUrl || `${this.$store.state.apiBaseUrl}/upload/${challengeVo.saveName}`"
                            alt="미리보기 이미지" class="leb-preview">
                        <input type="file" id="file-input" style="display: none;" v-on:change="KsbselectFile">
                        <label for="file-input" id="leb-drag-file-label"><img src="../../assets/img/camera.png"></label>
                    </div>
                </div>
                <select name="" >
                    <option value="" selected disabled hidden>도전과제를 선택해주세요</option>
                    <option v-for="(aVo) in achievementList" v-bind:key="aVo.challenge_no" :value="aVo.challenge_no">
                        {{ aVo.challenge_name }}</option>
                </select>
                <button id="leb-smallgathering-write-button" @click="addAchievement">등록</button>
            </div>
        </form>
    </div>
</template>


<script>
import axios from 'axios';
import "@/assets/css/LebCss/SmallGatheringWrite.css";

export default {
    name: "postAchievementView",
    components: {},
    data() {
        return {
            previewImageUrl: null,
            challengeVo: {
                challenge_no:"",
            },
            achievementList:[],
        };
    },
    methods: {

        KsbselectFile(event) {
            console.log("사진 선택");
            this.file = event.target.files[0];
            if (this.file) {
                this.previewImageUrl = URL.createObjectURL(this.file);
            }
        },
        addAchievement() {
            console.log("도전과제 등록");
            console.log(this.challengeVo);
            let formData = new FormData();
            formData.append("file", this.file);
            formData.append("challenge_no", this.challengeVo.challenge_no);

            console.log(formData);

            axios({
                method: 'put', // put, post, delete                   
                url: `${this.$store.state.apiBaseUrl}/api/walking/addgathering`,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + this.$store.state.token
                }, //전송타입
                //params: guestbookVo, //get방식 파라미터로 값이 전달
                data: formData, //put, post, delete 방식 자동으로 JSON으로 변환 전달

                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data.apiData); //수신데이타
                this.challengeVo.saveName = response.data.apiData.saveName;
                this.$router.push({ path: '/walking/mypage' });
            }).catch(error => {
                console.log(error);
            });

        },
        getAchievementList() {
            console.log("데이터 가져오기");

            axios({
                method: 'post', // put, post, delete 
                url: `${this.$store.state.apiBaseUrl}/api/gathering/getAchievementList`,
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                // params: guestbookVo, //get방식 파라미터로 값이 전달
                //data: this.gatheringVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data.apiData); //수신데이타
                this.achievementList = response.data.apiData;
                this.challengeVo.saveName = response.data.apiData.saveName;

            }).catch(error => {
                console.log(error);

            });
        }

    },
    created(){
        this.getAchievementList();
    }
};
</script>


<style></style>
