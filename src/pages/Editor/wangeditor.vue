<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800 flex flex-col md:flex-row md:items-center gap-2">
        <span class="bg-blue-500 text-white px-4 py-1 rounded-full text-lg">wangEditor 5</span>
        <span class="text-base font-normal text-gray-600">开源 Web 富文本编辑器，开箱即用，配置简单</span>
        <a href="https://www.wangeditor.com/" class="text-base text-blue-600 hover:text-blue-800 hover:underline transition-colors truncate" target="_blank" rel="noopener noreferrer"> https://www.wangeditor.com/ </a>
      </h1>
      <div class="rounded-xl shadow-lg border border-gray-200 bg-white overflow-hidden">
        <Toolbar class="border-b border-gray-200" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
        <Editor class="h-[500px] overflow-y-hidden" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" />
      </div>
    </div>
  </div>
</template>
<script setup>
  import '@wangeditor/editor/dist/css/style.css' // 引入 css
  import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
  // 编辑器实例，必须用 shallowRef
  const editorRef = shallowRef()
  // 内容 HTML
  const valueHtml = ref('<p>hello</p>')
  // 模拟 ajax 异步获取内容
  onMounted(() => {
    setTimeout(() => {
      valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
    }, 1500)
  })
  const toolbarConfig = {}
  const editorConfig = { placeholder: '请输入内容...' }
  // 组件销毁时，也及时销毁编辑器
  onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
  })
  const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
  }
</script>
