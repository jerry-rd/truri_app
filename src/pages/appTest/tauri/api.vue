<template>
  <div class="flex justify-center space-x-2 flex-wrap">
    <button @click="getIcon" class="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-700 w-full md:w-auto">defaultWindowIcon</button>
    <button @click="getAppName" class="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-700 w-full md:w-auto">getAppName</button>
    <button @click="hideAPP" class="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-700 w-full md:w-auto">hide </button>
    <button @click="setThemeApp" class="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-700 w-full md:w-auto">setTheme </button>
  </div>
</template>
<script setup>
  import { onMounted } from 'vue'
  import { defaultWindowIcon, getName, getTauriVersion, getVersion, hide, setTheme } from '@tauri-apps/api/app'

  const getIcon = () => {
    defaultWindowIcon().then((res) => {
      console.log('🚀 ~ getIcon ~ icon:', res)
    })
  }
  const getAppName = async () => {
    const appName = await getName()
    const tauriVersion = await getTauriVersion()
    const appVersion = await getVersion()
    console.log('🚀 ~ getAppName ~ appVersion:', appVersion)
    console.log('🚀 ~ getAppName ~ appName:', appName)
    console.log('🚀 ~ getAppName ~ tauriVersion:', tauriVersion)
  }

  const hideAPP = async () => {
    await hide()
  }

  const setThemeApp = async () => {
    await setTheme('light')
  }

  onMounted(() => {})
</script>
