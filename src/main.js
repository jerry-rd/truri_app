import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'

import '@/assets/style/common.css'

const app = createApp(App)
app.use(router) // 使用路由
app.mount('#app')
