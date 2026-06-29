import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets-compiled', // compiles JS/CSS into assets-compiled to avoid conflict with public/assets
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three'], // Three.js split into its own lazy chunk
        }
      }
    }
  }
});
