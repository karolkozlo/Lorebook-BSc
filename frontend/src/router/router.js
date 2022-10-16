import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import MainPage from "../pages/MainPage.vue";
import ChapterPage from "../pages/ChapterPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import UserPage from "../pages/UserPage.vue";
import UniversePage from "../pages/universePage/UniversePage.vue";
import UniverseMainPage from '@/pages/universePage/UniverseMainPage.vue';
import LbUniverseNav from "../components/LbUniverseNav.vue";
import CategoryPage from '@/pages/universeElementPages/CategoryPage.vue';
import CategoryElementsPage from '@/pages/universeElementPages/CategoryElementsPage.vue';
import ElementPage from '@/pages/elementPage/ElementPage.vue';
import ElementNotFoundPage from '@/pages/ElementNotFoundPage.vue';
import SearchPage from '@/pages/SearchPage.vue';
import StoryPage from '@/pages/storyPage/StoryPage.vue';

import { refreshToken } from '../httpLayers/login.http.js';

const categoryRoute = {
  path: 'category/:categoryID/',
  name: 'Category',
  props: true,
  components: {
    default: CategoryPage
  },
  children: [
    {
      path: '',
      name: 'CategoryElements',
      component: CategoryElementsPage,
      props: true,
    },
    {
      path: 'element/:elementID',
      name: 'ElementPage',
      component: ElementPage,
      props: true,
    }
  ]
};

const universeMainRoute = {
  path: '',
  name: 'UniverseMainPage',
  component: UniverseMainPage,
  props: true
};

const elementNotFoundRoute = {
  path: 'not-found',
  name: 'ElementNotFoundPage',
  component: ElementNotFoundPage,
};

const searchRoute = {
  path: 'search/',
  name: 'SearchPage',
  component: SearchPage
};

const storyPage = {
  path: 'story/:storyID',
  name: 'StoryPage',
  component: StoryPage,
  props: true,
};



const routes = [
  { path: '/', name: 'Main', component: MainPage },
  { path: '/chapter', name: 'Chapter', component: ChapterPage, meta: { requiresAuth: true}},
  { path: '/register', name: 'Register', component: RegisterPage, meta: { requiresUnAuth: true }},
  { path: '/login', name: 'Login', component: LoginPage, meta: { requiresUnAuth: true }},
  { path: '/user', name: 'User', component: UserPage, meta: { requiresAuth: true }},
  { path: '/universe/:universeID', name: 'Universe',
    components: {
      default: UniversePage,
      header: LbUniverseNav,
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
    },
    children: [
      categoryRoute,
      universeMainRoute,
      elementNotFoundRoute,
      searchRoute,
      storyPage
    ]
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
