<template>
  <div v-if="isLoading" class="flex flex-col justify-center items-center h-screen">
    <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
    <p class="mt-4 text-lg">Loading, please wait...</p>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { getGblInfo } from '@/api/dunwu/common'
  import { useSystemStore } from '@/hooks/useSystemStore'
  import store from '@/store'

  const globalStore = store.useGlobalStore()
  console.log('🚀 ~ globalStore:', globalStore)

  const isLoading = ref(true) // Set to true to show loading initially
  const startLoading = () => {
    isLoading.value = true
  }

  const stopLoading = () => {
    isLoading.value = false
  }

  const init = async () => {
    const { setStore } = await useSystemStore()
    const res = await getGblInfo()
    if (res.code === 0) {
      setStore('gblInfo', res.data)
      globalStore.setInfo(res.data)
    }
  }

  onMounted(() => {
    init()
  })
</script>
