import AMapLoader from '@amap/amap-jsapi-loader'
import { Loader } from '@googlemaps/js-api-loader'
import { loadScript } from './common'

/**
 * 谷歌地图样式以及初始化配置
 */
export const GOOGLE_MAP_CONFIG = {
  // backgroundColor: '#1a202e',
  center: { lat: 22.548_362, lng: 114.066_144 },
  controlSize: 24,
  fullscreenControl: false,
  gestureHandling: 'greedy',
  mapId: '9472f1820066bc70',
  zoom: 16,
  zoomControl: true,
}

/**
 * YANDEX地图样式配置以及初始化配置
 * controls:['default']  可选 'default'|'geolocationControl'|'fullscreenControl'|'searchControl'|'trafficControl'|'typeSelector'|'zoomControl'|'routeButtonControl'|'routePanelControl'
 *  文档参考 https://yandex.com/dev/jsapi-v2-1/doc/en/v2-1/ref/reference/control.Manager
 */
export const YANDEX_MAP_CONFIG = {
  center: [55.76, 37.64], // 定位中心  [lat, lng]
  controls: [], // 控制器
  zoom: 10, // 缩放比例
}

/**
 * 高德地图样式配置以及初始化配置
 * 文档参考 https://lbs.amap.com/api/javascript-api-v2/documentation#map
 */
export const GAODE_MAP_CONFIG = {
  center: [116.397_428, 39.909_23],
  // mapStyle: 'amap://styles/darkblue', // 设置地图的显示样式
  pitch: 0, // 地图俯仰角度，有效范围 0 度- 83 度
  pitchEnable: true, // 是否开启地图倾斜交互 鼠标右键 + 鼠标上下移动或键盘Ctrl + 鼠标左键上下移动
  rotateEnable: true, // 是否开启地图旋转交互 鼠标右键 + 鼠标画圈移动 或 键盘Ctrl + 鼠标左键画圈移动
  viewMode: '3D', // 地图模式
  zoom: 16,
}

const clamp = (num, min, max) => {
  return Math.min(Math.max(num, min), max)
}

export const clampLng = (num) => {
  return clamp(num, -180, 180)
}

export const clampLat = (num) => {
  return clamp(num, -90, 90)
}

export const MapManager = {
  getAk(type) {
    const akMap = {
      aMap: {
        ak: '42bcbd40eb6b7f7831b13d6874794d06',
        securityJsCode: '09a772e9c47ea7b0b1faa37fd01e6b7c',
      },
      googleMap: 'AIzaSyBMjaJ7_fQU-p2KIho28em8YpyilEeUSUM',
      baiduMap: 'vZGBPFRiVu94CE9SQjS5gTPH2Vy0PmWI',
      baiduMapGL: 'vZGBPFRiVu94CE9SQjS5gTPH2Vy0PmWI',
      yandexMap: '9be63d75-5531-4ad3-b6be-56ccd4388463',
    }
    return akMap[type]
  },
  getNamespace(type) {
    switch (type) {
      case 'googleMap': {
        return { core: window.google.maps }
      }
      case 'baiduMap': {
        return { core: window.BMap }
      }
      case 'baiduMapGL': {
        return { core: window.BMapGL }
      }
      case 'yandexMap': {
        return { core: window.ymaps }
      }
      case 'aMap': {
        return { core: window.AMap }
      }
      default: {
        return new Error('unknown namespace')
      }
    }
  },
  getStatus(type) {
    return MapManager.status[type]
  },
  loaders: {
    async aMap(type, config) {
      const { ak, securityJsCode } = config
      return new Promise((resolve) => {
        if (window.AMap) {
          MapManager.setStatus(type, 'loaded')
          return resolve()
        }
        window._AMapSecurityConfig = { securityJsCode }
        MapManager.setStatus(type, 'loading')
        AMapLoader.load({
          key: ak,
          plugins: ['AMap.Scale', 'AMap.Geocoder'], //  需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
          version: '2.0',
        }).then((aMap) => {
          window.AMap = aMap
          MapManager.setStatus(type, 'loaded')
          resolve()
        })
      })
    },
    async googleMap(type) {
      const loader = new Loader({
        apiKey: 'AIzaSyBMjaJ7_fQU-p2KIho28em8YpyilEeUSUM',
        language: 'zh-CN',
        version: 'weekly',
      })
      return new Promise((resolve) => {
        if (window.google) {
          MapManager.setStatus(type, 'loaded')
          return resolve()
        }
        MapManager.setStatus(type, 'loading')
        loader.load().then(() => {
          MapManager.setStatus(type, 'loaded')
          resolve()
        })
      })
    },
    async baiduMap(type, ak = 'vZGBPFRiVu94CE9SQjS5gTPH2Vy0PmWI') {
      MapManager.setStatus(type, 'loading')
      await new Promise((resolve) => {
        window.onlineMapLoaded = resolve
        loadScript(`//api.map.baidu.com/api?v=3.0&ak=${ak}&callback=onlineMapLoaded`)
      })
      MapManager.setStatus(type, 'loaded')
    },
    baiduMapGL(type, ak = 'vZGBPFRiVu94CE9SQjS5gTPH2Vy0PmWI') {
      return new Promise((resolve) => {
        MapManager.setStatus(type, 'loading')
        window.onlineMapGLLoaded = () => {
          MapManager.setStatus(type, 'loaded')
          resolve()
        }
        loadScript(`//api.map.baidu.com/api?v=3.0&&type=webgl&ak=${ak}&callback=onlineMapGLLoaded`)
      })
    },
    async yandexMap(type, ak = '9be63d75-5531-4ad3-b6be-56ccd4388463') {
      return new Promise((resolve) => {
        MapManager.setStatus(type, 'loading')
        window.yandexMapLoaded = () => {
          MapManager.setStatus(type, 'loaded')
          resolve()
        }
        loadScript(`//api-maps.yandex.ru/2.1/?apikey=${ak}&lang=zh-CN&onload=yandexMapLoaded`)
      })
    },
  },
  /**
   *
   * @param {('offlineMap' | 'baiduMap' | 'baiduMapGL'| 'googleMap' |'yandexMap'| 'aMap')} type
   */
  async loadMap(type) {
    const config = MapManager.getAk(type)
    const status = MapManager.getStatus(type)
    if (status === 'loaded') {
      return
    }
    if (status === 'loading') {
      return MapManager.pollStatus(type)
    }
    const loader = MapManager.loaders[type]
    if (!loader) {
      throw new Error('unknown loader')
    }
    await MapManager.loaders[type](type, config)
    return MapManager.getNamespace(type)
  },
  pollStatus(type, interval = 300, timeout = 60e3) {
    return new Promise((resolve) => {
      const start = Date.now()
      const timer = setInterval(() => {
        const now = Date.now()
        if (now - start > timeout) {
          clearInterval(timer)
        }
        if (MapManager.getStatus(type) === 'loaded') {
          clearInterval(timer)
          resolve()
        }
      }, interval)
    })
  },
  setStatus(type, status) {
    MapManager.status[type] = status
  },
  status: {
    aMap: 'unloaded',
    googleMap: 'unloaded',
    baiduMap: 'unloaded',
    baiduMapGL: 'unloaded',
    yandexMap: 'unloaded',
  },
}
