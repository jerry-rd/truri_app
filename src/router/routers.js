// 路由配置
export const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/appTest/Home/index.vue'), // 假设有一个 Home 组件
  },
]
