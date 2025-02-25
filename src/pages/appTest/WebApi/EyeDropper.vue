<template>
  <div class="flex flex-col items-center">
    <h1 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800 flex flex-col md:flex-row md:items-center gap-2">
      <span class="bg-blue-500 text-white px-4 py-1 rounded-full text-lg">EyeDropper</span>
      <span class="text-base font-normal text-gray-600">参考地址:</span>
      <a :href="apiUrl" class="text-base text-blue-600 hover:text-blue-800 hover:underline transition-colors truncate" target="_blank" rel="noopener noreferrer"> {{ apiUrl }} </a>
    </h1>
    <button @click="pickColor" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-xs shadow-xs hover:bg-blue-600 transition duration-200"> 选择颜色 </button>
    <div v-if="color" :style="{ backgroundColor: color }" class="mt-4 w-24 h-24 rounded-xs border border-gray-300 flex items-center justify-center">
      <span class="text-lg text-gray-800">选中的颜色: {{ color }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        color: null,
        apiUrl: 'https://developer.mozilla.org/zh-CN/docs/Web/API/EyeDropper',
      }
    },
    methods: {
      async pickColor() {
        if (!window.EyeDropper) {
          alert('您的浏览器不支持 EyeDropper API')
          return
        }
        const eyeDropper = new EyeDropper()
        try {
          const result = await eyeDropper.open()
          this.color = result.sRGBHex // 获取选中的颜色
        } catch (error) {
          console.error('颜色选择失败:', error)
        }
      },
    },
  }
</script>

<style scoped>
  /* 这里可以添加其他自定义样式 */
</style>
