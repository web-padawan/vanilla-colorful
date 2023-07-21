import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import { rollupPluginHTML as html } from '@web/rollup-plugin-html';

export default {
  input: './index.html',
  output: {
    dir: './dist'
  },
  plugins: [
    html(),
    nodeResolve(),
    terser()
  ]
};
