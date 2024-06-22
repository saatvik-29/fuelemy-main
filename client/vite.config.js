import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    outDir: 'build', // Specify the output directory for production build
    assetsDir: '', // Specify assets directory relative to outDir (optional)
    sourcemap: false, // Set to true if you need source maps
  },
});
