// 路由配置
export const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/appTest/Home',
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../components/layout/index.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: () => import('../pages/error/404.vue'),
  },
]
