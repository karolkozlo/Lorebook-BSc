import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import MainPage from "../pages/MainPage.vue";
import ChapterPage from "../pages/ChapterPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import UserPage from "../pages/UserPage.vue";

const routes = [
  { path: '/', name: 'Main', component: MainPage },
  { path: '/chapter', name: 'Chapter', component: ChapterPage, meta: {requiresAuth: true} },
  { path: '/register', name: 'Register', component: RegisterPage, meta: {requiresUnAuth: true} },
  { path: '/login', name: 'Login', component: LoginPage, meta: {requiresUnAuth: true} },
  { path: '/user', name: 'User', component: UserPage, meta: {requiresAuth: true} },
  { path: '/:notFound(.*)', redirect: `/` }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, _, next) => {
  if(to.meta.requiresAuth && !store.getters.isAuth) {
      next('/login');
  } else if(to.meta.requiresUnAuth && store.getters.isAuth) {
      next('/user');
  } else {
      next();
  }
});

export default router;
