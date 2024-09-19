import { createRouter, createWebHistory } from 'vue-router';
import UserInfo from '@/userInfo.vue';
import emptyComponent from '@/emptyComponent.vue';
const routes = [
  {
    path: '/guessNum/user/:id/:exp',
    name: 'UserInfo',
    component: UserInfo,
    props: true
  },{
    path: '/guessNum',
    name: 'App',
    component: emptyComponent
  },{
    path: '/',
    name: 'Home',
    redirect: '/guessNum'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
