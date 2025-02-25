<template>
  <div class="min-h-screen bg-linear-to-b from-gray-50 to-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800 flex flex-col md:flex-row md:items-center gap-2">
        <span class="bg-blue-500 text-white px-4 py-1 rounded-full text-lg">AiEditor</span>
        <span class="text-base font-normal text-gray-600">参考地址:</span>
        <a href="https://aieditor.dev/zh/" class="text-base text-blue-600 hover:text-blue-800 hover:underline transition-colors truncate" target="_blank" rel="noopener noreferrer"> https://aieditor.dev/zh/ </a>
      </h1>
      <div ref="divRef" class="h-[600px] w-full rounded-xl shadow-lg border border-gray-200 bg-white" />
    </div>
  </div>
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
