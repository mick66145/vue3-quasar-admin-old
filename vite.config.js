/* eslint-disable node/no-path-concat */
import { fileURLToPath, URL } from 'url'
import path, { resolve } from 'path-browserify'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import { viteMockServe } from 'vite-plugin-mock'
import vueJsx from '@vitejs/plugin-vue-jsx'
import WindiCSS from 'vite-plugin-windicss'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import stylelint from 'vite-plugin-stylelint'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import { VitePWA } from 'vite-plugin-pwa'

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
const root = process.cwd()
export default defineConfig(({ command, mode }) => {
  let env = {}
  const isBuild = command === 'build'
  if (!isBuild) {
    env = loadEnv((process.argv[3] === '--mode' ? process.argv[4] : process.argv[3]), root)
  } else {
    env = loadEnv(mode, root)
  }
  return {
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
      VitePWA({
        includeAssets: ['favicon.svg'],
        manifest: false,
        registerType: 'autoUpdate',
        workbox: {
          runtimeCaching: [
            {
              urlPattern: /someInterface/i, // 接口存儲此處填寫你想存儲的接口正則匹配
              handler: 'CacheFirst',
              options: {
                cacheName: 'interface-cache',
              },
            },
            {
              urlPattern: /(.*?)\.(js|css|ts)/, // js /css /ts靜態資源保存
              handler: 'CacheFirst',
              options: {
                cacheName: 'js-css-cache',
              },
            },
            {
              urlPattern: /(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/, // 圖片存檔
              handler: 'CacheFirst',
              options: {
                cacheName: 'image-cache',
              },
            },
          ],
        },
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
  }
})
