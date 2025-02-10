<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-blue-50">
    <h1 class="text-4xl font-bold text-gray-800 mb-5 animate-fade-in">欢迎使用本系统软件</h1>
    <div class="w-screen flex gap-4 p-4">
      <table class="w-1/4 bg-white border border-gray-300 rounded-lg shadow-md mb-5">
        <thead>
          <tr class="bg-gray-200 text-gray-800">
            <th class="px-4 py-2 border-b border-gray-300">页面名称</th>
            <th class="px-4 py-2 border-b border-gray-300">路由地址</th>
            <th class="px-4 py-2 border-b border-gray-300">跳转</th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-gray-100" v-for="r in systemRouters">
            <td class="px-4 py-2 border-b border-gray-300 text-gray-700">{{ r.name }}</td>
            <td class="px-4 py-2 border-b border-gray-300 text-gray-700">{{ r.path }}</td>
            <td class="px-4 py-2 border-b border-gray-300">
              <router-link class="text-blue-600 hover:text-blue-800" :to="r.path">跳转</router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <table class="w-1/4 bg-white border border-gray-300 rounded-lg shadow-md mb-5">
        <thead>
          <tr class="bg-gray-200 text-gray-800">
            <th class="px-4 py-2 border-b border-gray-300">页面名称</th>
            <th class="px-4 py-2 border-b border-gray-300">路由地址</th>
            <th class="px-4 py-2 border-b border-gray-300">跳转</th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-gray-100" v-for="r in brainRouters">
            <td class="px-4 py-2 border-b border-gray-300 text-gray-700">{{ r.name }}</td>
            <td class="px-4 py-2 border-b border-gray-300 text-gray-700">{{ r.path }}</td>
            <td class="px-4 py-2 border-b border-gray-300">
              <router-link class="text-blue-600 hover:text-blue-800" :to="r.path">跳转</router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <table class="w-1/4 bg-white border border-gray-300 rounded-lg shadow-md mb-5">
        <thead>
          <tr class="bg-gray-200 text-gray-800">
            <th class="px-4 py-2 border-b border-gray-300">页面名称</th>
            <th class="px-4 py-2 border-b border-gray-300">路由地址</th>
            <th class="px-4 py-2 border-b border-gray-300">跳转</th>
            <th class="px-4 py-2 border-b border-gray-300">备注</th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-gray-100" v-for="r in testRouter">
            <td class="px-4 py-2 border-b border-gray-300 text-gray-700">{{ r.name }}</td>
            <td class="px-4 py-2 border-b border-gray-300 text-gray-700">{{ r.path }}</td>
            <td class="px-4 py-2 border-b border-gray-300">
              <router-link class="text-blue-600 hover:text-blue-800" :to="r.path">跳转</router-link>
            </td>
            <td class="px-4 py-2 border-b border-gray-300 text-gray-700">{{ r.meta.title }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
  import { ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import autoRoutes from '@/router/autoRoutes'
  const router = useRouter()
  const systemRouters = [{ name: '登录', path: '/login' }]
  const brainRouters = [{ name: 'brain.js', path: '/brain' }]
  const testRouter = [...autoRoutes]
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
