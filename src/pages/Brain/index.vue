<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-blue-50">
    <h1 class="text-2xl font-bold text-gray-800 mb-5">brain.js 正是这一趋势下的佼佼者，它不仅支持基本的神经网络功能，还具备良好的性能表现，能够在资源受限的设备上高效运行。 </h1>
    <h1 class="text-1xl font-bold text-gray-800 mb-5">选择文件</h1>
    <div class="flex items-center gap-4">
      <input type="file" accept=".json" @change="handleFileChange" class="border rounded px-4 py-2 h-10" />
      <button @click="trainNetwork" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10"> 训练网络 </button>
      <button @click="stopTrain" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded h-10"> 停止训练 </button>
    </div>
    <div class="w-full max-w-lg mt-4">
      <div class="w-full bg-gray-200 rounded-full h-4">
        <div class="bg-blue-600 h-4 rounded-full" :style="{ width: `${progress}%` }"></div>
      </div>
      <div class="text-sm text-gray-600 mt-1"> 训练进度: {{ progress }}% </div>
    </div>
    <div v-if="fileName" class="mt-4">
      <p class="text-gray-700">已选择文件: {{ fileName }}</p>
    </div>
    <div class="mt-4 w-full max-w-lg">
      <textarea v-model="inputText" placeholder="请输入要预测的文本..." class="w-full h-32 p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-800"></textarea>
    </div>
    <button @click="predictText" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"> 预测文本 </button>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import * as brain from 'brain.js'
  // 初始化神经网络
  const network = new brain.recurrent.LSTM()

  const fileName = ref('')
  const fileContent = ref('')
  const progress = ref(0)
  const inputText = ref('')

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      fileName.value = file.name
      const reader = new FileReader()
      reader.onload = (e) => {
        fileContent.value = e.target.result
        console.log('🚀 ~ handleFileChange ~ fileContent.value:', fileContent.value)
      }
      reader.readAsText(file)
    }
  }

  const trainNetwork = () => {
    // 训练数据
    const data = [
      { input: 'implementing a caching mechanism improves performance', output: 'backend' },
      { input: 'hover effects on buttons', output: 'frontend' },
      { input: 'optimizing SQL queries', output: 'backend' },
      { input: 'using flexbox for layout', output: 'frontend' },
      { input: 'setting up a CI/CD pipeline', output: 'backend' },
      { input: 'SVG animations for interactive graphics', output: 'frontend' },
      { input: 'authentication using OAuth', output: 'backend' },
      { input: 'responsive images for different screen sizes', output: 'frontend' },
      { input: 'creating REST API endpoints', output: 'backend' },
      { input: 'CSS grid for complex layouts', output: 'frontend' },
      { input: 'database normalization for efficiency', output: 'backend' },
      { input: 'custom form validation', output: 'frontend' },
      { input: 'implementing web sockets for real-time communication', output: 'backend' },
      { input: 'parallax scrolling effect', output: 'frontend' },
      { input: 'securely storing user passwords', output: 'backend' },
      { input: 'creating a theme switcher (dark/light mode)', output: 'frontend' },
      { input: 'load balancing for high traffic', output: 'backend' },
      { input: 'accessibility features for disabled users', output: 'frontend' },
      { input: 'scalable architecture for growing user base', output: 'backend' },
    ]
    // iterations: 20000, // 训练迭代次数
    // errorThresh: 0.005, // 错误阈值
    // log: true, // 是否记录训练过程
    // logPeriod: 10, // 记录间隔
    // learningRate: 0.3, // 学习率
    // momentum: 0.1, // 动量
    // callback: function (error) {}, // 回调函数
    // callbackPeriod: 10, // 回调间隔

    // 训练 花蛮长时间
    network.train(data, {
      iterations: 1000, // 最大训练轮数
      log: true, // 训练日志,
      logPeriod: 10,
    })
  }

  const predictText = () => {
    const output = network.run(inputText.value)
    console.log(output)
  }
</script>

<style>
  /* 这里可以添加其他样式 */
</style>
