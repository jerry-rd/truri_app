<template>
  <div>
    <h1>quilljs,Your powerful rich text editor.,参考地址:<a href="https://quilljs.com/">https://quilljs.com/</a></h1>
    <div id="editor"></div>
  </div>
</template>
<script setup>
  import { onMounted } from 'vue'
  import Quill from 'quill'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  onMounted(() => {
    const quill = new Quill('#editor', {
      debug: 'info',
      modules: {
        toolbar: true,
      },
      placeholder: 'Compose an epic...',
      theme: 'snow',
    })
  })
</script>
<style scoped>
  #editor {
    height: 600px;
    width: 100vw;
  }
</style>
