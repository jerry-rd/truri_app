<template>
  <div>
    <h1>Editor.js,A Free, Block-Style Editor with Universal JSON Output,参考地址:<a href="https://editorjs.io/">https://editorjs.io/</a></h1>
    <div id="editorjs"></div>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import EditorJS from '@editorjs/editorjs'
  import Header from '@editorjs/header'
  import List from '@editorjs/list'
  onMounted(() => {
    const editor = new EditorJS({
      tools: {
        header: Header,
        list: List,
        // ... your tools
      },
    })
  })
</script>
<style>
  #editorjs {
    width: 100vw;
    height: 600px;
  }
</style>
