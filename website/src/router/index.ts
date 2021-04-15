import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/Home.page.vue';
// import { useUserInfo } from '@/context';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    meta: {
      title: 'lxy&tsy | 首页',
      requireAuth: true,
    },
  },
  {
    path: '/article',
    name: 'ArticlePage',
    component: () => import(/* webpackChunkName: "article" */ '../views/Article.page.vue'),
    meta: {
      title: 'lxy&tsy | 文章',
      requireAuth: true,
    },
  },
  {
    path: '/post',
    name: 'PostPage',
    component: () => import(/* webpackChunkName: "post" */ '../views/post/Post.page.vue'),
    meta: {
      title: 'lxy&tsy | 帖子',
      requireAuth: true,
    },
  },
  {
    path: '/album',
    name: 'AlbumPage',
    component: () => import(/* webpackChunkName: "album" */ '../views/Album.page.vue'),
    meta: {
      title: 'lxy&tsy | 相册',
      requireAuth: true,
    },
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.page.vue'),
    meta: {
      title: 'lxy&tsy | 登录',
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
  //   const { userInfo } = useUserInfo();
  //   console.log(userInfo);
  // }

  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  next();
});

export default router;
