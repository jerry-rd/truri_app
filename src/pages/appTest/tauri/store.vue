<template>
  <div>
    <h1>Store</h1>
    <button @click="setStoreIssue" class="bg-gray-800 text-white rounded-lg px-6 py-3 shadow-md hover:bg-gray-700 transition duration-200">存储</button>
    <button @click="getStoreIssue" class="bg-gray-800 text-white rounded-lg px-6 py-3 shadow-md hover:bg-gray-700 transition duration-200 ml-2">获取</button>
    <button @click="deleteStoreIssue" class="bg-gray-800 text-white rounded-lg px-6 py-3 shadow-md hover:bg-gray-700 transition duration-200 ml-2">删除</button>
  </div>
</template>

<script setup>
  import { useStore } from '@/hooks/useStore'
  const storeName = 'settings.json'
  const { getStore, setStore, deleteStore } = useStore(storeName)
  const setStoreIssue = async () => {
    await setStore('some-key', { value: 12 })
  }
  const getStoreIssue = async () => {
    const val = await getStore('some-key')
    console.log('🚀 ~ getStore ~ val:', val)
  }
  const deleteStoreIssue = async () => {
    await deleteStore('some-key')
  }
</script>
