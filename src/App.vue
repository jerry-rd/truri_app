<script>
  import { defineComponent } from 'vue'
  import { ElConfigProvider } from 'element-plus'
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs' //启用element 中文
  export default defineComponent({
    components: {
      ElConfigProvider,
    },
    setup() {
      /** 阻止默认的拖拽事件 */
      document.body.ondrop = function (event) {
        event.preventDefault()
        event.stopPropagation()
      }
      /** 判断是不是黑色主题设置html 属性 */
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('class', 'dark')
      }
      return {
        locale: zhCn,
      }
    },
  })
</script>
<template>
  <el-config-provider :locale="locale">
    <router-view v-slot="{ Component }">
      <transition name="el-fade-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </el-config-provider>
</template>
