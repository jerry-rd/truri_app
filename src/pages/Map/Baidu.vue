<template>
  <div id="Baidu_map"></div>
</template>
<script setup>
  import { onMounted, onUnmounted } from 'vue'
  import { MapManager } from '@/libs/MapManager'

  let map = null
  let MapNameSpace = null
  const mapType = 'baiduMap'

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
<style scoped>
  #Baidu_map {
    height: 600px;
    width: 100vw;
  }
</style>
