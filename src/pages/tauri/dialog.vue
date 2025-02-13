<template>
  <div class="flex items-center justify-center h-screen">
    <button @click="askDialog" class="bg-gray-800 text-white rounded-lg px-6 py-3 shadow-md hover:bg-gray-700 transition duration-200">创建 Yes/No 对话框</button>
    <button @click="confirmDialog" class="bg-gray-800 text-white rounded-lg px-6 py-3 shadow-md hover:bg-gray-700 transition duration-200 ml-2">创建 Confirm 对话框</button>
    <button @click="messageDialog" class="bg-gray-800 text-white rounded-lg px-6 py-3 shadow-md hover:bg-gray-700 transition duration-200 ml-2">创建 Message 对话框</button>
    <button @click="openDialog" class="bg-gray-800 text-white rounded-lg px-6 py-3 shadow-md hover:bg-gray-700 transition duration-200 ml-2">打开一个文件选择对话框</button>
    <button @click="saveDialog" class="bg-gray-800 text-white rounded-lg px-6 py-3 shadow-md hover:bg-gray-700 transition duration-200 ml-2">保存到文件对话框</button>
  </div>
</template>

<script setup>
  import { ask, confirm, message, open, save } from '@tauri-apps/plugin-dialog'

  const askDialog = async () => {
    // 创建 Yes/No 对话框
    const answer = await ask('你确定要删除吗？', {
      title: '这里是一个对话框标题',
      kind: 'info',
    })
    console.log('🚀 ~ askDialog ~ answer:', answer)
  }

  const confirmDialog = async () => {
    const confirmation = await confirm('This action cannot be reverted. Are you sure?', {
      title: 'Tauri',
      kind: 'warning',
    })
    console.log('🚀 ~ confirmDialog ~ answer:', confirmation)
  }
  const messageDialog = async () => {
    await message('File not found', { title: 'Tauri', kind: 'error' })
  }

  const openDialog = async () => {
    // Open a dialog
    const file = await open({
      multiple: false,
      directory: false,
    })
    console.log('🚀 ~ openDialog ~ file:', file)
  }

  const saveDialog = async () => {
    const path = await save({
      filters: [
        {
          name: 'My Filter',
          extensions: ['png', 'jpeg'],
        },
      ],
    })
    console.log('🚀 ~ saveDialog ~ path:', path)
  }
</script>

<style lang="less"></style>
