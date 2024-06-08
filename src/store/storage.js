import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';


export default createStore({
    state() {
        return {
            // api 공용 주소
            //apiBaseUrl: "http://localhost:9020",
            apiBaseUrl: "http://43.201.96.200:9020",

            // 로그인
            authUser: null,
            token: null,
            kakaoToken: null,
            naverToken: null,
            googleToken: null,

            // couresebook - yys
            lList: [],
            login_users_no: null,
            category: null,
            fcategory: null,




        };
    },
    mutations: {
        // 로그인
        setAuthUser(state, payload) {
            state.authUser = payload;
        },
        setToken(state, payload) {
            state.token = payload;
        },
        setKakaoToken(state, payload) {
            state.kakaoToken = payload;
        },
        setNaverToken(state, payload){
            state.naverToken = payload;
        },
        setGoogleToken(state, payload){
            state.googleToken = payload;
        },
        setAuthNickName(state, payload) {
            state.authUser.users_nickname = payload;
        },
        setLoginType(state, payload) {
            state.authUser.users_login_type = payload;
        },
        // couresebook - yys
        setLList(state, payload) { /* 좋아요 리스트 목록 */
            state.lList = payload;
        },
        setLogin_users_no(state, payload) {
            state.login_users_no = payload;
        },
        setCategory(state, payload) {
            state.category = payload;
        },
        setfCategory(state, payload) {
            state.fcategory = payload;
        },
        
    },
    getters: {
        isAuthenticated: state => !!state.token,
    },
    plugins: [
        createPersistedState({
            paths: ['authUser', 'token']
        })
    ]

});