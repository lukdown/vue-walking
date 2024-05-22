<template>
    <div></div>
</template>

<script>
import axios from 'axios';


export default {
    name: "KakaoJoinView",
    components: {},
    data() {
        return {
            code: "",
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
                    self.form.email = res.data.email;
                    self.form.pwd = res.data.id;
                    self.form.nickname = res.data.nickname;
                    self.form.kakaotoken = res.data.accessToken;
                })
                .catch((error) => {
                    console.error("Error fetching token:", error);
                });
        }
    },
    created() {
        this.code = this.$route.query.code;
        console.log(this.code);
        this.getToken();
    }
};

</script>

<style></style>