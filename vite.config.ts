import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';
import { vueI18n } from '@intlify/vite-plugin-vue-i18n'
import path from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
    css: {
      postcss: {
        plugins: [
          tailwindcss,
          autoprefixer
        ],
      },
  },
  server: {
    port: 3000,
  },
  plugins: [
    vue(),
    VitePWA(),
    vueI18n({
      include: path.resolve(__dirname, './locales/**')
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
