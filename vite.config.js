import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteCommonjs, esbuildCommonjs } from '@originjs/vite-plugin-commonjs';
import dns from 'dns'
// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

dns.setDefaultResultOrder('verbatim')

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
    host: 'localhost',
    open: '/',
    port: 3001,
  },
});
