import { build } from 'esbuild';
import { polyfillNode } from 'esbuild-plugin-polyfill-node';

build({
  entryPoints: ['build/index.js'],
  bundle: true,
  outfile: 'build/onml.js',
  platform: 'browser',
  format: 'iife',
  globalName: 'onml',
  minify: true,
  plugins: [
    polyfillNode(),
  ],
}).catch(() => process.exit(1));
