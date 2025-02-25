<template>
  <div class="flex flex-col items-center">
    <h1 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800 flex flex-col md:flex-row md:items-center gap-2">
      <span class="bg-blue-500 text-white px-4 py-1 rounded-full text-lg">selectAudioOutput</span>
      <span class="text-base font-normal text-gray-600">参考地址:</span>
      <a :href="apiUrl" class="text-base text-blue-600 hover:text-blue-800 hover:underline transition-colors truncate" target="_blank" rel="noopener noreferrer"> {{ apiUrl }} </a>
    </h1>
    <button @click="selectAudioOutput" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-xs shadow-xs hover:bg-blue-600 transition duration-200"> 选择音频播放 </button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        apiUrl: 'https://developer.mozilla.org/zh-CN/docs/Web/API/Audio_Output_Devices_API',
      }
    },
    methods: {
      async selectAudioOutput() {
        if (!navigator.mediaDevices.selectAudioOutput) {
          console.log('不支持 selectAudioOutput()，或不在安全上下文中。')
          return
        }
        // 显示选择设备的提示
        const audioDevice = await navigator.mediaDevices.selectAudioOutput()
        // 创建音频元素并在默认设备上开始播放音频
        const audio = document.createElement('audio')
        audio.src = 'https://example.com/audio.mp3'
        audio.play()
        // 将输出更改为所选的音频输出设备。
        audio.setSinkId(audioDevice.deviceId)
      },
    },
  }
</script>

<style scoped>
  /* 这里可以添加其他自定义样式 */
</style>
