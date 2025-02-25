<template>
  <div class="min-h-screen bg-linear-to-b from-gray-50 to-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800 flex flex-col md:flex-row md:items-center gap-2">
        <span class="bg-blue-500 text-white px-4 py-1 rounded-full text-lg">天地图</span>
        <span class="text-base font-normal text-gray-600">参考地址Api:</span>
        <a href="http://lbs.tianditu.gov.cn/api/js4.0/guide.html" class="text-base text-blue-600 hover:text-blue-800 hover:underline transition-colors truncate" target="_blank" rel="noopener noreferrer"> http://lbs.tianditu.gov.cn/api/js4.0/guide.html </a>
      </h1>
      <div id="tianditu" class="h-[600px] w-full rounded-xl shadow-lg border border-gray-200 bg-white"></div>
    </div>
  </div>
</template>
<script setup>
  import { MapManager } from '@/libs/MapManager'

  let map = null
  let MapNameSpace = null
  const mapType = 'tiandituMap'

  const loadMap = async () => {
    await MapManager.loadMap(mapType)
    const coreObj = MapManager.getNamespace(mapType)
    MapNameSpace = coreObj.core
    console.log('🚀 ~ loadMap ~ MapNameSpace:', MapNameSpace)
  }

  onMounted(async () => {
    await loadMap()
    map = new MapNameSpace.Map('tianditu')
    map.centerAndZoom(new MapNameSpace.LngLat(113.386762, 23.132214), 20)
  })

  onUnmounted(() => {
    map?.destroy()
  })
</script>
<style scoped>
  /* 移除之前的样式，因为现在完全使用 Tailwind 类 */
</style>
