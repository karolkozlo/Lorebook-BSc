import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import MainPage from "../pages/MainPage.vue";
import ChapterPage from "../pages/ChapterPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import UserPage from "../pages/UserPage.vue";
import UniversePage from "../pages/UniversePage.vue";
import LbUniverseNav from "../components/LbUniverseNav.vue";
import { refreshToken } from '../httpLayers/login.http.js';

const routes = [
  { path: '/', name: 'Main', component: MainPage },
  { path: '/chapter', name: 'Chapter', component: ChapterPage, meta: {requiresAuth: true} },
  { path: '/register', name: 'Register', component: RegisterPage, meta: {requiresUnAuth: true} },
  { path: '/login', name: 'Login', component: LoginPage, meta: {requiresUnAuth: true} },
  { path: '/user', name: 'User', component: UserPage, meta: {requiresAuth: true} },
  { path: '/universe/:universeID', name: 'Universe',
    components: {
      default: UniversePage,
      header: LbUniverseNav
    },
    meta: {
      requiresAuth: true,
      universeRelated: true,
    },
    async beforeEnter(to, from, next) {
      if(!store.getters['universe/universesFetchedFlag']) {
        await store.dispatch('universe/fetchUserUniverses');
      }
      if(store.getters['universe/checkIfUserOwnsUniverse']({ universeID: to.params.universeID })) {
        next();
      } else {
        next('/user');
      }
    }
  },
  { path: '/:notFound(.*)', redirect: `/` }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(async (to, _, next) => {
  if(!store.getters.tokenRefreshedFlag) {
    let user = await refreshToken();
    if (user && user.data.name && user.data.email && user.data.id) {
      store.commit('setUser', user.data);
    }
    store.commit('setTokenRefreshedFlag', true);
  }

  if(to.meta.requiresAuth && !store.getters.isAuth) {
      next('/login');
  } else if(to.meta.requiresUnAuth && store.getters.isAuth) {
      next('/user');
  } else {
      next();
  }
});

export default router;
