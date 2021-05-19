import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/Home.page.vue';
import { MyRouterList } from '@/constants';

// export const MyRouterList = {
//   HomePage: 'HomePage',
//   ArticlePage: 'ArticlePage',
//   PostPage: 'PostPage',
//   AlbumPage: 'AlbumPage',
//   LoginPage: 'LoginPage',
// };

export const whiteRouteList = ['/page/login'];

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: MyRouterList.HomePage,
    component: HomePage,
    // component: () => import(/* webpackChunkName: "home" */ '../views/Home.page.vue'),
    meta: {
      title: 'lxy&tsy',
      // title: 'demo',
      requireAuth: true,
    },
  },
  {
    path: '/article',
    name: MyRouterList.ArticlePage,
    component: () => import(/* webpackChunkName: "article" */ '../views/Article.page.vue'),
    meta: {
      title: 'lxy&tsy',
      // title: 'demo',
      requireAuth: true,
    },
  },
  {
    path: '/post',
    name: MyRouterList.PostPage,
    component: () => import(/* webpackChunkName: "post" */ '../views/post/Post.page.vue'),
    meta: {
      title: 'lxy&tsy',
      // title: 'demo',
      requireAuth: true,
    },
  },
  {
    path: '/album',
    name: MyRouterList.AlbumPage,
    component: () => import(/* webpackChunkName: "album" */ '../views/album/Album.page.vue'),
    meta: {
      title: 'lxy&tsy',
      // title: 'demo',
      requireAuth: true,
    },
  },
  {
    path: '/login',
    name: MyRouterList.LoginPage,
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.page.vue'),
    meta: {
      // title: 'lxy&tsy | 登录',
      title: 'lxy&tsy',
      requireAuth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory('/page'),
  routes,
});

router.beforeEach((to, from, next) => {
  // /* 该页面需要登录 */
  // if (to.meta.requireAuth) {
  // }

  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  next();
});

export default router;
