<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800 flex flex-col md:flex-row md:items-center gap-2">
        <span class="bg-blue-500 text-white px-4 py-1 rounded-full text-lg">百度地图GL</span>
        <span class="text-base font-normal text-gray-600">参考地址Api:</span>
        <a href="https://lbsyun.baidu.com/index.php?title=jspopularGL" class="text-base text-blue-600 hover:text-blue-800 hover:underline transition-colors truncate" target="_blank" rel="noopener noreferrer"> https://lbsyun.baidu.com/index.php?title=jspopularGL </a>
      </h1>
      <div id="Baidu_map" class="h-[600px] w-full rounded-xl shadow-lg border border-gray-200 bg-white"></div>
    </div>
  </div>
</template>
<script setup>
  import { onMounted, onUnmounted } from 'vue'
  import { MapManager } from '@/libs/MapManager'

  let map = null
  let MapNameSpace = null
  const mapType = 'baiduMapGL'

  const loadMap = async () => {
    await MapManager.loadMap(mapType)
    const coreObj = MapManager.getNamespace(mapType)
    MapNameSpace = coreObj.core
    console.log('🚀 ~ loadMap ~ MapNameSpace:', MapNameSpace)
  }

  onMounted(async () => {
    await loadMap()
    map = new MapNameSpace.Map('Baidu_map')
    map.centerAndZoom(new MapNameSpace.Point(113.386762, 23.132214), 20)
    map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
    map.setDisplayOptions && map.setDisplayOptions({ indoor: false })
  })

  onUnmounted(() => {
    map?.destroy()
  })
</script>
