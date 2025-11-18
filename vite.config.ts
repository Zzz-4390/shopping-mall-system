import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    // 自动导入 Element Plus 组件 + 组件专属样式
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'css', // 关键！自动导入组件的 CSS 样式（也可设为 'scss' 用 SCSS 源文件）
          // 注意：如果用 SCSS，需额外安装 sass 依赖（npm i sass -D）
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
