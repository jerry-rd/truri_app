<template>
  <div id="tianditu"></div>
</template>
<script setup>
  import { onMounted, onUnmounted } from 'vue'
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
  #tianditu {
    height: 600px;
    width: 100vw;
  }
</style>
