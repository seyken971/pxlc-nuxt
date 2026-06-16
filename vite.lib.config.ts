import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { resolve } from 'path'

export default defineConfig({
  publicDir: false,
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
      dts: false,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'PxlcDS',
      fileName: 'pxlc-ds',
      formats: ['umd'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
      },
    },
    cssCodeSplit: false,
    outDir: 'dist-lib',
    emptyOutDir: true,
  },
})
