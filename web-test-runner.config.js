const { esbuildPlugin } = require('@web/dev-server-esbuild');
const { visualRegressionPlugin } = require('@web/test-runner-visual-regression/plugin');

module.exports = {
  nodeResolve: true,
  plugins: [
    esbuildPlugin({ ts: true }),
    visualRegressionPlugin({
      baseDir: 'src/test/visual/screenshots',
      diffOptions: {
        threshold: 0.2
      },
      update: process.env.UPDATE_REFS === 'true'
    })
  ],
  coverageConfig: {
    threshold: {
      statements: 100,
      branches: 73,
      functions: 100,
      lines: 100
    }
  },
};
