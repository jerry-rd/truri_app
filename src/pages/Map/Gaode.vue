<template>
  <div id="gaodeMap"></div>
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
<style scoped>
  #gaodeMap {
    height: 600px;
    width: 100vw;
  }
</style>
