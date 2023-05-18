import dts from 'vite-plugin-dts';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

import pkg from './package.json';

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {};
  }

  return {
    build: {
      lib: {
        entry: 'src/index.ts',
        formats: ['cjs', 'es'],
        fileName: (fileName) => (fileName === 'cjs' ? 'index.js' : 'index.es.js')
      },
      rollupOptions: {
        external: [...Object.keys(pkg.peerDependencies), /@emotion/g],
        output: {
          exports: 'named',
          interop: 'auto'
        }
      }
    },
    plugins: [
      react({
        jsxImportSource: '@emotion/react'
      }),
      dts({ insertTypesEntry: true })
    ],
    define: {
      'process.env.NODE_ENV': '"production"'
    }
  };
});
