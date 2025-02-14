<template>
  <div>
    <h1>Store</h1>
    <button @click="setStoreIssue" class="bg-gray-800 text-white rounded-lg px-6 py-3 shadow-md hover:bg-gray-700 transition duration-200">存储</button>
    <button @click="getStoreIssue" class="bg-gray-800 text-white rounded-lg px-6 py-3 shadow-md hover:bg-gray-700 transition duration-200 ml-2">获取</button>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { Store } from '@tauri-apps/plugin-store'
  let store = null
  // Store 会在 JavaScript 绑定时自动加载。
  onMounted(async () => {
    store = await Store.load('settings.json')
  })

  const setStoreIssue = async () => {
    // 设置一个值
    await store.set('some-key', { value: 12 })
    // 您可以在进行更改后手动保存存储
    // 否则如上所述，它将在正常退出时保存。
    await store.save()
  }

  const getStoreIssue = async () => {
    const val = await store.get('some-key')
    console.log('🚀 ~ getStore ~ val:', val)
  }
</script>
