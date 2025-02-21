const modules = {}

// 使用Vite的glob导入
const moduleFiles = import.meta.glob('./modules/*.js', { eager: true })

console.log('🚀 ~ moduleFiles:', moduleFiles)
Object.entries(moduleFiles).forEach(([path, module]) => {
  // 提取模块名称
  const moduleName = path.replace(/(\.\/modules\/|\.js)/g, '')
  // 获取模块内容
  modules[moduleName] = module.default || module
})

export default { ...modules }
