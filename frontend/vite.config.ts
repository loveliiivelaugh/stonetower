import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
// import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
  },
  plugins: [
    // TanStackRouterVite(),
    viteReact(),
    // react(),
    // ...,
  ],
})
