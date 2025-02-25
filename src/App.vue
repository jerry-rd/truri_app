<script setup>
  import { ElConfigProvider } from 'element-plus'
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs' //启用element 中文
  import { Window } from '@tauri-apps/api/window'
  const appWindow = new Window('main')
  const locale = zhCn
  /** 阻止默认的拖拽事件 */
  document.body.ondrop = function (event) {
    event.preventDefault()
    event.stopPropagation()
  }
  /** 判断是不是黑色主题设置html 属性 */
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('class', 'dark')
  }
</script>
<template>
  <div data-tauri-drag-region class="title-bar">
    <div class="title-bar-button" id="titlebar-minimize" @click="appWindow.minimize()">
      <img src="https://api.iconify.design/mdi:window-minimize.svg" alt="minimize" />
    </div>
    <div class="title-bar-button" id="titlebar-maximize" @click="appWindow.toggleMaximize()">
      <img src="https://api.iconify.design/mdi:window-maximize.svg" alt="maximize" />
    </div>
    <div class="title-bar-button" id="titlebar-close" @click="appWindow.close()">
      <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
    </div>
  </div>
  <el-config-provider :locale="locale">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </el-config-provider>
</template>

<style scoped>
  /* 创建自定义标题栏 */
  .title-bar {
    height: 30px;
    background: #329ea3;
    user-select: none;
    display: flex;
    justify-content: flex-end;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999999;
  }
  .title-bar-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    user-select: none;
    -webkit-user-select: none;
  }
  .title-bar-button:hover {
    background: #5bbec3;
  }
</style>
