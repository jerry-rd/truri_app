<template>
  <div class="min-h-screen">
    <div class="mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800 flex flex-col md:flex-row md:items-center gap-2">
        <span class="bg-blue-500 text-white px-4 py-1 rounded-full text-lg">谷歌地图</span>
        <span class="text-base font-normal dark:text-gray-400">参考地址Api:</span>
        <a href="https://developers.google.com/maps/documentation/javascript?hl=zh-cn" class="text-blue-600 hover:text-blue-800 hover:underline transition-colors truncate" target="_blank" rel="noopener noreferrer"> https://developers.google.com/maps/documentation/javascript?hl=zh-cn </a>
      </h1>
      <div id="GoogleMap" class="h-[600px] w-full rounded-xl shadow-lg"></div>
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
  import { MapManager, GOOGLE_MAP_CONFIG } from '@/libs/MapManager'

  let map = null
  let MapNameSpace = null
  let marker = null
  const lng = ref(114.066_144)
  const lat = ref(22.548_362)
  const address = ref('')
  const mapType = 'googleMap'

  const loadMap = async () => {
    await MapManager.loadMap(mapType)
    const coreObj = MapManager.getNamespace(mapType)
    MapNameSpace = coreObj.core
    console.log('🚀 ~ loadMap ~ MapNameSpace:', MapNameSpace)
  }

  // marker
  const markerInit = async () => {
    if (marker && marker.map) {
      marker.map = null
    }
    const { AdvancedMarkerElement } = await MapNameSpace.importLibrary('marker')
    marker = new AdvancedMarkerElement({ position: { lat: 22.548_362, lng: 114.066_144 }, map: map, gmpDraggable: true, title: 'address-project' })
    marker.addListener('dragend', (event) => {
      const position = marker.position
      lng.value = position.lng
      lat.value = position.lat
      console.log('🚀 ~ markerInit ~ position:', position)
    })
  }

  // 搜索
  const searchAddress = () => {
    const geoCoder = new MapNameSpace.Geocoder()
    geoCoder.geocode({ address: address.value }, (results, status) => {
      if (status === 'OK') {
        const { geometry } = results[0]
        map.panTo(geometry.location)
        console.log('🚀 ~ geoCoder.geocode ~ geometry:', geometry)
      } else {
        console.log('Geocode was not successful for the following reason: ' + status)
      }
    })
  }

  onMounted(async () => {
    await loadMap()
    const { Map } = await MapNameSpace.importLibrary('maps')
    map = new Map(document.getElementById('GoogleMap'), { ...GOOGLE_MAP_CONFIG, zoom: 10, mapTypeControl: false, fullscreenControl: false })
    map.addListener('tilesloaded', () => {
      console.log('map had loaded')
    })
  })

  onUnmounted(() => {
    map = null
    marker = null
  })
</script>
