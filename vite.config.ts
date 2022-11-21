import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import path from 'path'
import ViteComponents from 'unplugin-vue-components/vite'
import PurgeIcons from 'vite-plugin-purge-icons'
import { imagetools } from 'vite-imagetools'
import VueI18n from '@intlify/vite-plugin-vue-i18n'

const projectRootDir = path.resolve(__dirname)

const mode = process.env.NODE_ENV

// https://vitejs.dev/config/
export default defineConfig({
  mode: mode,
  publicDir: 'public',

  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'Vue3BeakDataTable',
      fileName: (format) => `vue3-beakdatatable-lib.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      // preserveEntrySignatures: 'allow-extension',
      preserveEntrySignatures: 'strict',
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'vue',
        },
      },
    },
  },

  resolve: {
    alias: [
      {
        find: '/~/',
        replacement: `/src/assets/`,
      },
      {
        find: '/@src/',
        replacement: `/src/`,
      },
    ],
    dedupe: ['vue'],
  },
  plugins: [
    Vue({
      include: [/\.vue$/],
    }),

    // https://github.com/intlify/vite-plugin-vue-i18n
    VueI18n({
      include: path.resolve(__dirname, './src/locales/**'),
    }),

    // https://github.com/antfu/purge-icons/tree/main/packages/vite-plugin-purge-icons
    PurgeIcons(),

    // https://github.com/antfu/vite-plugin-components
    ViteComponents({
      extensions: ['vue'],
      dirs: ['src/components', 'src/layouts'],
    }),

    // https://github.com/stafyniaksacha/vite-plugin-fonts
    // VitePluginFonts({
    //       google: {
    //         families: [
    //           {
    //             name: 'Fira Code',
    //             styles: 'wght@400;600',
    //           },
    //           {
    //             name: 'Montserrat',
    //             styles: 'wght@500;600;700;800;900',
    //           },
    //           {
    //             name: 'Roboto',
    //             styles: 'wght@300;400;500;600;700',
    //           },
    //         ],
    //       },
    // }),

    // https://github.com/JonasKruckenberg/vite-imagetools
    imagetools(),

    //   Eslint({
    //     include: [ 'src/**/*.ts',  'src/**/*.vue',  'src/*.ts',  'src/*.vue'],
    //  }),
  ],
})
