<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-3xl font-bold mb-4">我的应用程序</h1>
    <h2 class="text-xl mb-6">欢迎回来，请登录您的账户</h2>
    <form @submit.prevent="handleLogin" class="bg-white p-8 rounded-lg shadow-lg w-96">
      <div class="mb-6">
        <label for="username" class="block text-sm font-medium text-gray-700"> 用户名: </label>
        <input type="text" id="username" v-model="username" required class="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" />
      </div>
      <div class="mb-6">
        <label for="password" class="block text-sm font-medium text-gray-700"> 密码: </label>
        <input type="password" id="password" v-model="password" required class="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" />
      </div>
      <button type="submit" class="w-full py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition duration-200"> 登录 </button>
    </form>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { invoke } from '@tauri-apps/api/core'
  const username = ref('')
  const password = ref('')

  async function handleLogin() {
    const result = await invoke('login', {
      username: username.value,
      password: password.value,
    })
    console.log('登录结果:', result)
  }
</script>
