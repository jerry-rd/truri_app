// 路由配置
export const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home/index.vue'), // 假设有一个 Home 组件
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Login/index.vue'), // 假设有一个 Login 组件
  },
]
