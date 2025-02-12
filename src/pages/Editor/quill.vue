<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800 flex flex-col md:flex-row md:items-center gap-2">
        <span class="bg-blue-500 text-white px-4 py-1 rounded-full text-lg">Quill Editor</span>
        <span class="text-base font-normal text-gray-600">参考地址:</span>
        <a href="https://quilljs.com/" class="text-base text-blue-600 hover:text-blue-800 hover:underline transition-colors truncate" target="_blank" rel="noopener noreferrer"> https://quilljs.com/ </a>
      </h1>
      <div id="editor" class="shadow-lg border border-gray-200 text-gray-900"></div>
    </div>
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
    width: 100%;
  }
</style>
