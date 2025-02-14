<template>
  <div class="notification-view">
    <h1>通知</h1>
    <button @click="sendNotificationSubmit">发送通知</button>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/plugin-notification'

  let permissionGranted = false

  onMounted(async () => {
    // 你有发送通知的权限吗？
    permissionGranted = await isPermissionGranted()
    // 如果没有，我们需要请求它
    if (!permissionGranted) {
      const permission = await requestPermission()
      permissionGranted = permission === 'granted'
    }
  })
  const sendNotificationSubmit = () => {
    // 一旦获得许可，我们就可以发送通知
    if (permissionGranted) {
      sendNotification({ title: 'Tauri', body: 'Tauri is awesome!' })
    }
  }
</script>
