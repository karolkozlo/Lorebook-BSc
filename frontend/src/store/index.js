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
      state.userID = payload.id;
      state.username = payload.name;
      state.email = payload.email;
      state.isAuth = true;
    },
    clearUser(state) {
      state.userID = null;
      state.username =  null;
      state.email =  null;
      state.isAuth = false;
    }
  },
  actions: {
  },
});

export default store;
