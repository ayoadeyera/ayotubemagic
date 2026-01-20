
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // This allows process.env.API_KEY to be accessed at runtime 
    // without causing build-time reference errors in Vite.
    'process.env': 'window.process.env'
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
