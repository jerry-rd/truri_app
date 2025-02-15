<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h1 class="text-6xl font-bold text-gray-800">404</h1>
    <p class="mt-4 text-lg text-gray-600">页面未找到</p>
    <router-link to="/" class="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"> 返回首页 </router-link>
  </div>
</template>

<script>
  export default {
    name: 'NotFound',
  }
</script>

<style scoped>
  /* 这里可以添加自定义样式 */
</style>
