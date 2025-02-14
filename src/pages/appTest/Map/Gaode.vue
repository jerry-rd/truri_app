<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800 flex flex-col md:flex-row md:items-center gap-2">
        <span class="bg-green-500 text-white px-4 py-1 rounded-full text-lg">高德地图</span>
        <span class="text-base font-normal text-gray-600">参考地址Api:</span>
        <a href="https://lbs.amap.com/api/javascript-api-v2/summary" class="text-base text-blue-600 hover:text-blue-800 hover:underline transition-colors truncate" target="_blank" rel="noopener noreferrer"> https://lbs.amap.com/api/javascript-api-v2/summary </a>
      </h1>
      <div id="gaodeMap" class="h-[600px] w-full rounded-xl shadow-lg border border-gray-200 bg-white"></div>
    </div>
  </div>
</template>
<script setup>
  import { onMounted, onUnmounted } from 'vue'
  import { MapManager } from '@/libs/MapManager'

  let map = null
  let MapNameSpace = null
  const mapType = 'aMap'

  const loadMap = async () => {
    await MapManager.loadMap(mapType)
    const coreObj = MapManager.getNamespace(mapType)
    MapNameSpace = coreObj.core
    console.log('🚀 ~ loadMap ~ MapNameSpace:', MapNameSpace)
  }

  onMounted(async () => {
    await loadMap()
    map = new MapNameSpace.Map('gaodeMap', {
      zoom: 17,
      center: [116.397428, 39.90923],
      pitch: 65, // 地图俯仰角度，有效范围 0 度- 83 度
      viewMode: '3D', // 地图模式
      rotateEnable: true, // 是否开启地图旋转交互 鼠标右键 + 鼠标画圈移动 或 键盘Ctrl + 鼠标左键画圈移动
      pitchEnable: true, // 是否开启地图倾斜交互 鼠标右键 + 鼠标上下移动或键盘Ctrl + 鼠标左键上下移动
      zooms: [1, 20], // 地图显示的缩放级别范围
    })
    map.on('complete', () => {})
  })

  onUnmounted(() => {
    map?.destroy()
  })
</script>
