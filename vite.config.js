/* eslint-disable node/no-path-concat */
import { fileURLToPath, URL } from 'url'
import path, { resolve } from 'path-browserify'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import { viteMockServe } from 'vite-plugin-mock'
import vueJsx from '@vitejs/plugin-vue-jsx'
import WindiCSS from 'vite-plugin-windicss'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import stylelint from 'vite-plugin-stylelint'
import vueI18n from '@intlify/vite-plugin-vue-i18n'

const fs = require('fs')

const https = () => {
  const useHttps = (process.env.npm_lifecycle_event || '').includes(':https')
  const keyPem = `${__dirname}/localhost-key.pem`
  const certPem = `${__dirname}/localhost.pem`
  if (!useHttps) return {}
  if (!fs.existsSync(keyPem) || !fs.existsSync(certPem)) return {}
  return {
    https: {
      key: fs.readFileSync(keyPem),
      cert: fs.readFileSync(certPem),
    },
  }
}

const localMockEnabled = process.env.USE_LOCAL_MOCK || true
const prodMockEnabled = process.env.USE_PROD_MOCK || false

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    viteMockServe({
      mockPath: './server/mock',
      localEnabled: localMockEnabled, // 開發打包開關
      prodEnabled: prodMockEnabled, // 生產打包開關
      injectCode: 'setupProdMockServer()',
      logger: false, // 是否在控制台顯示請求日誌
      supportTs: false,
    }),
    vueJsx(),
    WindiCSS(),
    stylelint(),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      // Specify symbolId format
      symbolId: 'icon-[name]',
    }),
    vueI18n({
      compositionOnly: false,
      include: path.resolve(__dirname, 'src/locales/**'),
    }),
    quasar({
      sassVariables: 'src/styles/abstracts/quasar-variables.scss',
    }),
  ],
  test: {
    environment: 'happy-dom',
  },
  server: {
    ...https(),
    cors: true,
    port: 3000,
    host: true,
    hmr: {
      port: 3000,
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      path: 'path-browserify',
    },
  },
  rollupOptions: {
    input: {
      main: resolve(__dirname, 'index.html'),
      nested: resolve(__dirname, 'dist/index.html'),
    },
  },
})
