<template>
  <div class="flex flex-col items-center justify-center min-h-screen animate-fade-in">
    <h1 class="text-4xl font-bold mb-5 mt-16">欢迎使用本系统软件</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4">
      <div v-for="r in allRouter" :key="r.path" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center overflow-hidden">
            <div class="w-10 h-10 dark:bg-blue-100 dark:text-blue-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <el-icon :size="20">
                <List />
              </el-icon>
            </div>
            <div class="flex-1 overflow-hidden">
              <h3 class="text-base font-semibold text-gray-800 truncate dark:text-white">{{ r.name?.replace('appTest-', '') }}</h3>
              <p class="w-full text-xs text-gray-500 truncate dark:text-gray-500">{{ r?.meta?.title }}</p>
            </div>
          </div>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600 truncate flex-1 dark:text-gray-500">{{ r.path?.replace('/apptest', '') }}</span>
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
  const allRouter = [...autoRoutes].sort((a, b) => a.meta.parent.localeCompare(b.meta.parent))
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
