<template>
  <div class="min-h-screen bg-linear-to-b from-gray-50 to-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800 flex flex-col md:flex-row md:items-center gap-2">
        <span class="bg-blue-500 text-white px-4 py-1 rounded-full text-lg">yandex地图</span>
        <span class="text-base font-normal text-gray-600">参考地址Api:</span>
        <a href="https://yandex.com/maps-api/docs/js-api/index.html?from=mapsapi" class="text-base text-blue-600 hover:text-blue-800 hover:underline transition-colors truncate" target="_blank" rel="noopener noreferrer"> https://yandex.com/maps-api/docs/js-api/index.html?from=mapsapi </a>
      </h1>
      <div id="yandexMap" class="h-[600px] w-full rounded-xl shadow-lg border border-gray-200 bg-white"></div>
    </div>
  </div>
</template>
<script setup>
  import { MapManager, YANDEX_MAP_CONFIG } from '@/libs/MapManager'

  let map = null
  let MapNameSpace = null
  const mapType = 'yandexMap'
  const loadMap = async () => {
    await MapManager.loadMap(mapType)
    const coreObj = MapManager.getNamespace(mapType)
    MapNameSpace = coreObj.core
    console.log('🚀 ~ loadMap ~ MapNameSpace:', MapNameSpace)
  }
  onMounted(async () => {
    await loadMap()
    map = new MapNameSpace.Map('yandexMap', { ...YANDEX_MAP_CONFIG }, { suppressMapOpenBlock: true, minZoom: 2 })
    map.copyrights._onMapDestroy() // 清除版权信息
    map.layers.events.once('tileloadchange', (e) => {})
  })

  onUnmounted(() => {
    map?.destroy()
  })
</script>
