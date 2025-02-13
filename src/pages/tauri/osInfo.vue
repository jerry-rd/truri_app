<template>
  <div>
    <h1>操作系统信息</h1>
    <p>platform:{{ currentPlatform }}</p>
    <p>family:{{ familyInfo }}</p>
    <p>exeExtension:{{ exeExtensionInfo }}</p>
    <p>arch:{{ archInfo }}</p>
    <p>hostname:{{ hostnameInfo }}</p>
    <p>locale:{{ localeInfo }}</p>
    <p>type:{{ typeInfo }}</p>
    <p>version:{{ versionInfo }}</p>
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
