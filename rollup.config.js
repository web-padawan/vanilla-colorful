const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');
const { copy } = require('@web/rollup-plugin-copy');
const html = require('@open-wc/rollup-plugin-html');

module.exports = {
  input: './demo/index.html',
  output: {
    dir: './dist'
  },
  plugins: [
    html(),
    nodeResolve(),
    terser(),
    copy({
      patterns: ['*.css'],
      rootDir: './demo/'
    })
  ]
};
