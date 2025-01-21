<template>
  <RouterView />
</template>
<script setup>
  import { ref } from 'vue'
  // import { invoke } from '@tauri-apps/api/core'
  // import { getName } from '@tauri-apps/api/app'
  // const greetMsg = ref('')
  // const name = ref('')

  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  //   greetMsg.value = await invoke('greet', { name: name.value })
  //   const appName = await getName()
  //   console.log('🚀 ~ greet ~ greetMsg.value:', greetMsg.value)
  //   console.log('🚀 ~ greet ~ appName:', appName)
  // }
</script>
<style lang="less">
  @import './assets/style/common.css';
</style>
