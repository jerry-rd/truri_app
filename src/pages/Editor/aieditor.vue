<template>
  <div>
    <h1>AiEditor，一个面向 AI 的富文本编辑器,参考地址:<a href="https://aieditor.dev/zh/">https://aieditor.dev/zh/</a></h1>
  </div>
  <div ref="divRef" style="height: 600px" />
</template>

<script lang="ts">
  import { AiEditor } from 'aieditor'
  import 'aieditor/dist/style.css'
  export default {
    mounted() {
      new AiEditor({
        element: this.$refs.divRef as Element,
        placeholder: '点击输入内容...',
        content: 'AiEditor 是一个面向 AI 的开源富文本编辑器。 ',
      })
    },
  }
</script>
