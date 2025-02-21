<script setup>
  import { ElConfigProvider } from 'element-plus'
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs' //启用element 中文
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
  <el-config-provider :locale="locale">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </el-config-provider>
</template>
