import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/styles.css' // 确保导入了包含 Tailwind CSS 的样式文件

import '@/assets/style/common.css'

const app = createApp(App)
app.use(router) // 使用路由
app.mount('#app')
