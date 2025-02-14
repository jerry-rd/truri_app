import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Pages from 'vite-plugin-pages'

const host = process.env.TAURI_DEV_HOST

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    vue(),
    Pages({
      // 配置路由文件夹, 你可以根据需要更改路径,自动导入页面
      dirs: [
        { dir: 'src/pages/Test', baseRoute: 'test' },
        { dir: 'src/pages/Editor', baseRoute: 'editor' },
        { dir: 'src/pages/Map', baseRoute: 'map' },
        { dir: 'src/pages/Style', baseRoute: 'Style' },
        { dir: 'src/pages/WebApi', baseRoute: 'WebApi' },
        { dir: 'src/pages/tauri', baseRoute: 'tauri' },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host ? { protocol: 'ws', host, port: 1421 } : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ['**/src-tauri/**'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
}))
