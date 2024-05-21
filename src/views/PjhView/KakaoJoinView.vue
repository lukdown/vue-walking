<template>
    <div></div>
</template>

<script>



export default {
    name: "KakaoJoinView",
    components: {},
    data() {
        return {
            code:""
        };
    },
    methods: {
        getToken(){
            const self = this;

            self.$axios.get('http://localhost:8080/walking/kakaojoinpage' + self.code)
                .then((res) => {
                    console.log(res);
                    self.form.email = res.data.email;
                    self.form.pwd = res.data.id;
                    self.form.nickname = res.data.nickname;
                    self.form.kakaotoken = res.data.accessToken;
                })
        }
    },
    created(){
        this.code = this.$route.query.code;
        console.log(this.code);
        this.getToken();
    }
};
    
</script>

<style></style>