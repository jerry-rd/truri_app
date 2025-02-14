<template>
  <div class="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-10">
    <h1 class="text-2xl font-semibold text-gray-800 mb-4">操作系统信息</h1>
    <p class="text-gray-700">
      platform: <span class="font-medium">{{ currentPlatform }}</span>
    </p>
    <p class="text-gray-700">
      family: <span class="font-medium">{{ familyInfo }}</span>
    </p>
    <p class="text-gray-700">
      exeExtension: <span class="font-medium">{{ exeExtensionInfo }}</span>
    </p>
    <p class="text-gray-700">
      arch: <span class="font-medium">{{ archInfo }}</span>
    </p>
    <p class="text-gray-700">
      hostname: <span class="font-medium">{{ hostnameInfo }}</span>
    </p>
    <p class="text-gray-700">
      locale: <span class="font-medium">{{ localeInfo }}</span>
    </p>
    <p class="text-gray-700">
      type: <span class="font-medium">{{ typeInfo }}</span>
    </p>
    <p class="text-gray-700">
      version: <span class="font-medium">{{ versionInfo }}</span>
    </p>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { platform, family, exeExtension, arch, hostname, locale, type, version } from '@tauri-apps/plugin-os'

  const currentPlatform = platform()
  const familyInfo = family()
  const exeExtensionInfo = exeExtension()
  const archInfo = arch()
  const hostnameInfo = ref('')
  const localeInfo = ref('')
  const typeInfo = type()
  const versionInfo = version()

  const getHostnameInfo = async () => {
    hostnameInfo.value = await hostname()
    console.log('🚀 ~ getHostnameInfo ~ hostnameInfo.value:', hostnameInfo.value)
  }
  const getLocaleInfo = async () => {
    localeInfo.value = await locale()
    console.log('🚀 ~ getHostnameInfo ~ hostnameInfo.value:', localeInfo.value)
  }

  onMounted(() => {
    getHostnameInfo()
    getLocaleInfo()
  })
</script>
