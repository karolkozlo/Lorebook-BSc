import { createStore } from 'vuex';
import notificationsModule from './notifications.store';
import universeModule from './universe.store';
import popupModule from './popup.store';
import elementModule from './element.store';

const store = createStore({
  modules: {
    notifications: notificationsModule,
    universe: universeModule,
    popups: popupModule,
    element: elementModule
  },
  state: {
    userID: null,
    username: null,
    email: null,
    isAuth: false,
    tokenRefreshedFlag: false,
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
    tokenRefreshedFlag(state) {
      return state.tokenRefreshedFlag;
    }
  },
  mutations: {
    setTokenRefreshedFlag(state, value) {
      state.tokenRefreshedFlag = value;
    },
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
