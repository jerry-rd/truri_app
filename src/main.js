import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { setupI18n } from '@/i18n'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import '@/assets/style/common.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { Window } from '@tauri-apps/api/window'

const appWindow = new Window('main')

function initApp() {
  const pinia = createPinia()
  const app = createApp(App)
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  setupI18n(app)
  app.use(pinia) // 使用pinia
  app.use(router) // 使用路由
  app.mount('#app')
}

function createTitleBar() {
  document.getElementById('titlebar-minimize')?.addEventListener('click', () => appWindow.minimize())
  document.getElementById('titlebar-maximize')?.addEventListener('click', () => appWindow.toggleMaximize())
  document.getElementById('titlebar-close')?.addEventListener('click', () => appWindow.close())
}

createTitleBar()
initApp()
