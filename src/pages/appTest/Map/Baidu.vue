<template>
  <div class="min-h-screen">
    <div class="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800 flex flex-col md:flex-row md:items-center gap-2 dark:text-white">
        <span class="bg-blue-500 text-white px-4 py-1 rounded-full text-lg">百度地图</span>
        <span class="text-base font-normal text-gray-600">参考地址Api:</span>
        <a href="https://lbsyun.baidu.com/index.php?title=jspopular3.0" class="text-base text-blue-600 hover:text-blue-800 hover:underline transition-colors truncate" target="_blank" rel="noopener noreferrer"> https://lbsyun.baidu.com/index.php?title=jspopular3.0 </a>
      </h1>
      <div id="Baidu_map" class="h-[600px] w-full rounded-xl shadow-lg"></div>

      <div class="flex gap-2 mt-4">
        <el-input v-model="lng" placeholder="请输入经度" />
        <el-input v-model="lat" placeholder="请输入纬度" />
        <el-input v-model="address" placeholder="请输入地址" />
        <el-button type="primary" @click="searchAddress">搜索</el-button>
        <el-button type="primary" @click="markerInit">marker</el-button>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { onMounted, onUnmounted, ref } from 'vue'
  import { MapManager } from '@/libs/MapManager'

  let map = null
  let MapNameSpace = null
  const lng = ref(113.386762)
  const lat = ref(23.132214)
  const address = ref('')
  const mapType = 'baiduMap'

  const loadMap = async () => {
    await MapManager.loadMap(mapType)
    const coreObj = MapManager.getNamespace(mapType)
    MapNameSpace = coreObj.core
    console.log('🚀 ~ loadMap ~ MapNameSpace:', MapNameSpace)
  }

  const markerInit = () => {
    if (!map) return
    map.clearOverlays()
    const point = new MapNameSpace.Point(lng.value, lat.value)
    const marker = new MapNameSpace.Marker(point)
    map.addOverlay(marker)
    marker.enableDragging()
    marker.addEventListener('dragend', (e) => {
      console.log('🚀 ~ marker.addEventListener ~ e:', e.point)
      lng.value = e.point.lng
      lat.value = e.point.lat
    })
    return marker
  }

  const searchAddress = () => {
    const myGeo = new MapNameSpace.Geocoder()
    myGeo.getPoint(
      address.value,
      (point) => {
        if (point) {
          console.log('🚀 ~ searchAddress ~ point:', point)
          map.panTo(point)
        } else {
          console.log('地址解析失败')
        }
      },
      address.value
    )
  }

  onMounted(async () => {
    await loadMap()
    map = new MapNameSpace.Map('Baidu_map')
    map.centerAndZoom(new MapNameSpace.Point(113.386762, 23.132214), 23)
    map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
    map.setDisplayOptions && map.setDisplayOptions({ indoor: false })
  })

  onUnmounted(() => {
    map?.destroy()
  })
</script>
