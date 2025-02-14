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
