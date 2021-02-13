import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/Home.page.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/article',
    name: 'ArticlePage',
    component: () => import(/* webpackChunkName: "article" */ '../views/Article.page.vue'),
  },
  {
    path: '/post',
    name: 'PostPage',
    component: () => import(/* webpackChunkName: "post" */ '../views/Post.page.vue'),
  },
  {
    path: '/album',
    name: 'AlbumPage',
    component: () => import(/* webpackChunkName: "album" */ '../views/Album.page.vue'),
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory(),
  routes,
});

export default router;
