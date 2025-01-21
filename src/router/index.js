import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routers'

// 创建路由实例
export default createRouter({
  history: createWebHistory(),
  routes,
})
