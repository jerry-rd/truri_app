<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800 flex flex-col md:flex-row md:items-center gap-2">
        <span class="bg-blue-500 text-white px-4 py-1 rounded-full text-lg">Editor.js</span>
        <span class="text-base font-normal text-gray-600">参考地址:</span>
        <a href="https://editorjs.io/" class="text-base text-blue-600 hover:text-blue-800 hover:underline transition-colors truncate" target="_blank" rel="noopener noreferrer"> https://editorjs.io/ </a>
      </h1>
      <div id="editorjs" class="h-[600px] w-full rounded-xl shadow-lg border border-gray-200 bg-white p-4"></div>
    </div>
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
  /* Remove the previous style block as we're using Tailwind classes now */
</style>
