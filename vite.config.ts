import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      /* eslint-disable-next-line */
      '@': path.resolve(process.cwd(), 'src'),
    },
  },
});
