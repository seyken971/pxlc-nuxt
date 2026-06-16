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
      entry: resolve(__dirname, 'lib/custom-elements.ts'),
      name: 'PxlcDS',
      fileName: 'pxlc-ds',
      formats: ['es'],
    },
    // Vue runtime is intentionally bundled in — custom elements need it standalone
    cssCodeSplit: false,
    outDir: 'dist-ce',
    emptyOutDir: true,
  },
})
