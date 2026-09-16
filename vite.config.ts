import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Rango amplio de navegadores: el QR lo escanea gente con telefonos muy distintos.
    target: ['es2019', 'chrome87', 'safari14', 'firefox78', 'edge88'],
  },
  server: {
    host: true,
    port: 5173,
  },
});
