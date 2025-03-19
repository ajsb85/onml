import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import nodePolyfills from 'rollup-plugin-polyfill-node';

export default {
  input: 'build/index.js',
  output: {
    file: 'build/onml.js',
    format: 'umd',
    name: 'onml',
    sourcemap: true,
    exports: 'named'
  },
  plugins: [
    nodeResolve({preferBuiltins: false}),
    commonjs(),
    nodePolyfills(),
    terser()
  ]
};
