import routes from 'virtual:generated-pages' // 自动生成的路由

const testRouteMap = {
  Page1: '测试页面1',
  Page9: '图片裁剪',
  Page8: '网站首页案例',
  Page7: '网站首页案例2',
  Page6: '写字板',
  Page5: '复制与粘贴剪切板',
  Page4: '3D立体背景',
  Page3: '图片背景缩放',
  Page2: '旋转显示页面',
  Page10: '二维码生成',
  Page11: '引导式访问driver组件的使用',
  Page12: 'plyr视频播放组件的使用',
  Page13: '图片放大镜显示效果',
  Page14: '图片滚动加载，且砌体布局',
  monaco: 'monaco代码编辑器',
  aieditor: 'AiEditor 是一个面向 AI 的下一代富文本编辑器',
  wangeditor: 'wangeditor编译器',
  Baidu: '百度地图',
  Gaode: '高德地图',
  Google: '谷歌地图',
  Yandex: 'Yandex地图',
  BaiduGL: '百度地图GL',
  tianditu: '天地图',
}

routes.forEach((item) => {
  const fileName = item.name.split('-')[1]
  item.meta = {
    title: testRouteMap?.[fileName] || '',
    parent: item?.name?.split('-')?.[0],
  }
})

export default routes
