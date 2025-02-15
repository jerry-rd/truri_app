// 路由配置
export const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/appTest/Home',
  },
  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: () => import('../pages/error/404.vue'),
  },
]
