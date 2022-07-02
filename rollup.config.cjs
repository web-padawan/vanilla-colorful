const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');
const html = require('@web/rollup-plugin-html').default;

module.exports = {
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
