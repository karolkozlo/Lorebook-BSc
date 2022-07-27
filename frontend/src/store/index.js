import { createStore } from 'vuex';

const store = createStore({
  modules: {
  },
  state: {
    userID: null,
    username: null,
    email: null,
    isAuth: false,
  },
  getters: {
    userID(state) {
      return state.userID;
    },
    username(state) {
      return state.username;
    },
    email(state) {
      return state.email;
    },
    isAuth(state) {
      return state.isAuth;
    },
  },
  mutations: {
    setUser(state, payload) {
      state.userID = payload.userID;
      state.username = payload.username;
      state.email = payload.email;
    },
    clearUser(state) {
      state.userID = null;
      state.username =  null;
      state.email =  null;
    },
    setAuth(state, payload) {
      state.isAuth = payload;
    }
  },
  actions: {
  },
});

export default store;
