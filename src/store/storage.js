import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';


export default createStore({
    state() {
        return {
            //apiBaseUrl: "http://localhost:9002",
            apiBaseUrl: "http://52.78.33.215:9002",
            authUser: null,
            token: null,
            c_p_amount: "",
            c_size: ""
        };
    },
    mutations: {
        setAuthUser(state, payload) {
            state.authUser = payload;
        },
        setToken(state, payload) {
            state.token = payload;
        },
        setAuthName(state, payload) {
            state.authUser.name = payload;
        },
        setC_p_amount(state, payload) {
            state.c_p_amount = payload;
        },
        setC_size(state, payload) {
            state.c_size = payload;
        },
    },
    plugins: [
        createPersistedState({
            paths: ['authUser', 'token']
        })
    ]

});