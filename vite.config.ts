import path from 'path';

import dts from 'vite-plugin-dts';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

import pkg from './package.json';

export default defineConfig(({ command }) => {
  const alias = [
    { find: '@', replacement: path.resolve(__dirname, 'src') },
    {
      find: '@components',
      replacement: path.resolve(__dirname, 'src/components')
    },
    {
      find: '@context',
      replacement: path.resolve(__dirname, 'src/context')
    },
    {
      find: '@hooks',
      replacement: path.resolve(__dirname, 'src/hooks')
    },
    {
      find: '@provider',
      replacement: path.resolve(__dirname, 'src/provider')
    },
    {
      find: '@types',
      replacement: path.resolve(__dirname, 'src/types')
    }
  ];

  if (command === 'serve') {
    return {
      resolve: {
        alias
      }
    };
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
    resolve: {
      alias
    },
    define: {
      'process.env.NODE_ENV': '"production"'
    }
  };
});
