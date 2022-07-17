import { createRouter, createWebHistory } from 'vue-router';
import MainPage from "../pages/MainPage.vue";
import ChapterPage from "../pages/ChapterPage.vue";

const routes = [
  { path: '/', name: 'Main', component: MainPage },
  { path: '/chapter', name: 'Chapter', component: ChapterPage },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
