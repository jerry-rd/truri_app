<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-blue-50">
    <h1 class="text-4xl font-bold text-gray-800 mb-5 animate-fade-in">欢迎使用本系统软件</h1>
    <div class="mb-5 flex justify-end w-screen px-4">
      <button @click="toggleView" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center">
        <span v-if="isTableView">切换到卡片视图</span>
        <span v-else>切换到表格视图</span>
      </button>
    </div>
    <div class="w-screen flex justify-center gap-4 p-4" v-if="isTableView">
      <table class="w-1/2 bg-white border border-gray-300 rounded-lg shadow-md mb-5 text-left">
        <thead>
          <tr class="bg-gray-200 text-gray-800">
            <th class="px-4 py-2 border-b border-gray-300">页面名称</th>
            <th class="px-4 py-2 border-b border-gray-300">路由地址</th>
            <th class="px-4 py-2 border-b border-gray-300">备注</th>
            <th class="px-4 py-2 border-b border-gray-300 text-center">跳转</th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-gray-100" v-for="r in allRouter">
            <td class="px-4 py-2 border-b border-gray-300 text-gray-700">{{ r.name }}</td>
            <td class="px-4 py-2 border-b border-gray-300 text-gray-700">{{ r.path }}</td>
            <td class="px-4 py-2 border-b border-gray-300 text-gray-700">{{ r?.meta?.title }}</td>
            <td class="px-4 py-2 border-b border-gray-300 text-center">
              <router-link class="text-blue-600 hover:text-blue-800" :to="r.path">跳转</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4" v-else>
      <div v-for="r in allRouter" :key="r.path" class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center overflow-hidden">
            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div class="flex-1 overflow-hidden">
              <h3 class="text-base font-semibold text-gray-800 truncate">{{ r.name }}</h3>
              <p class="w-full text-xs text-gray-500 truncate">{{ r?.meta?.title }}</p>
            </div>
          </div>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600">{{ r.path }}</span>
          <router-link :to="r.path" class="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"> 访问 </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import autoRoutes from '@/router/autoRoutes'
  const router = useRouter()
  const systemRouters = [{ name: '登录', path: '/login', meta: { title: '后台系统' } }]
  const brainRouters = [{ name: 'brain.js', path: '/brain', meta: { title: '神经网络功能训练' } }]
  const testRouter = [...autoRoutes]
  const allRouter = [...systemRouters, ...brainRouters, ...testRouter]
  const isTableView = ref(false)
  const toggleView = () => {
    isTableView.value = !isTableView.value
  }
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
