import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
// import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // TanStackRouterVite(),
    viteReact(),
    // react(),
    // ...,
  ],
})
