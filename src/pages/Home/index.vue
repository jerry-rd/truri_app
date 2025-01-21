<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-blue-50">
    <h1 class="text-4xl font-bold text-gray-800 mb-5 animate-fade-in">欢迎使用本系统软件</h1>
    <router-link class="text-lg text-blue-600 hover:text-blue-800 transition-colors" to="/login">去登录</router-link>
  </div>
</template>

<script setup>
  // 这里可以添加主页的逻辑
</script>

<style>
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .animate-fade-in {
    animation: fade-in 2s ease-in-out;
  }
</style>
