<template>
  <div id="yandexMap"></div>
</template>
<script setup>
  import { onMounted, onUnmounted } from 'vue'
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
<style scoped>
  #yandexMap {
    height: 600px;
    width: 100vw;
  }
</style>
