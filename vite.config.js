import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteCommonjs, esbuildCommonjs } from '@originjs/vite-plugin-commonjs';

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
      views: "/src/views",
      core: "/src/core",
    },

    // alias: [
    //   {
    //     find: "common",
    //     replacement: resolve(__dirname, "src/common"),
    //   },
    // ],
    mainfield: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildCommonjs(['react-moment'])],
    },
  },
  server: {
    open: '/',
    port: 3001,
  },
});
