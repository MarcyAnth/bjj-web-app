import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './src/components/HomePage.vue';
import SignIn from './src/components/SignIn.vue';

const routes = [
  { path: '/', redirect: '/signin' },
  { path: '/signin', component: SignIn },
  { path: '/home', name: 'home', component: HomePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
