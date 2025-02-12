<template>
  <div id="GoogleMap"></div>
</template>
<script setup>
  import { onMounted, onUnmounted } from 'vue'
  import { MapManager, GOOGLE_MAP_CONFIG } from '@/libs/MapManager'

  let map = null
  let MapNameSpace = null
  const mapType = 'googleMap'

  const loadMap = async () => {
    await MapManager.loadMap(mapType)
    const coreObj = MapManager.getNamespace(mapType)
    MapNameSpace = coreObj.core
    console.log('🚀 ~ loadMap ~ MapNameSpace:', MapNameSpace)
  }

  onMounted(async () => {
    await loadMap()
    const { Map } = await MapNameSpace.importLibrary('maps')
    map = new Map(document.getElementById('GoogleMap'), { ...GOOGLE_MAP_CONFIG, zoom: 10, mapTypeControl: false, fullscreenControl: false })
    map.addListener('tilesloaded', () => {})
  })
  onUnmounted(() => {
    map = null
  })
</script>
<style scoped>
  #GoogleMap {
    height: 600px;
    width: 100vw;
  }
</style>
