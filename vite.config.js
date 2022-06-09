import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      { find: '~', replacement: `${__dirname}/src` },
      // { find: '@', replacement: `${__dirname}/src` }, // 별칭만 다르게 사용할 수 있다.
    ]
  }
})
