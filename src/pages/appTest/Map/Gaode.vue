<template>
  <div class="min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800 flex flex-col md:flex-row md:items-center gap-2">
        <span class="bg-green-500 text-white px-4 py-1 rounded-full text-lg">高德地图</span>
        <span class="text-base font-normal text-gray-600">参考地址Api:</span>
        <a href="https://lbs.amap.com/api/javascript-api-v2/summary" class="text-base text-blue-600 hover:text-blue-800 hover:underline transition-colors truncate" target="_blank" rel="noopener noreferrer"> https://lbs.amap.com/api/javascript-api-v2/summary </a>
      </h1>
      <div id="gaodeMap" class="h-[600px] w-full rounded-xl shadow-lg border border-gray-200 bg-white"></div>

      <div class="flex gap-2 mt-4">
        <el-input v-model="lng" placeholder="请输入经度" />
        <el-input v-model="lat" placeholder="请输入纬度" />
        <el-button type="primary" @click="markerInit">marker</el-button>
        <el-input v-model="address" placeholder="请输入地址" />
        <el-button type="primary" @click="searchAddress">搜索</el-button>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { MapManager } from '@/libs/MapManager'
  let map = null
  let MapNameSpace = null
  let marker = null
  const lng = ref(116.397428)
  const lat = ref(39.90923)
  const address = ref('')
  const mapType = 'aMap'
  const loadMap = async () => {
    await MapManager.loadMap(mapType)
    const coreObj = MapManager.getNamespace(mapType)
    MapNameSpace = coreObj.core
    console.log('🚀 ~ loadMap ~ MapNameSpace:', MapNameSpace)
  }

  const markerInit = () => {
    if (!map) return
    marker = new MapNameSpace.Marker({
      position: new MapNameSpace.LngLat(lng.value, lat.value),
      offset: new MapNameSpace.Pixel(-12, -17),
      icon: new MapNameSpace.Icon({
        size: new MapNameSpace.Size(24, 34),
        imageOffset: new MapNameSpace.Pixel(0, 0),
        imageSize: new MapNameSpace.Size(24, 34),
        image: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png',
      }),
      draggable: true,
      cursor: 'move',
    })
    marker.setMap(map)
    marker.on('dragend', (e) => {
      console.log('🚀 ~ this.marker.on ~ e:', e)
      const position = { ...e.lnglat }
      lng.value = position.lng
      lat.value = position.lat
      console.log('🚀 ~ this.marker.on ~ position:', position)
    })
  }

  const searchAddress = () => {
    const geocoder = new MapNameSpace.Geocoder()
    geocoder.getLocation(address.value, (status, result) => {
      if (status === 'complete' && result.geocodes.length) {
        console.log('🚀 ~ geocoder.getLocation ~ result.geocodes:', result.geocodes)
        const { lat, lng } = result.geocodes[0].location
        map.panTo(new MapNameSpace.LngLat(lng, lat))
      } else {
        console.log('地址解析失败')
      }
    })
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
