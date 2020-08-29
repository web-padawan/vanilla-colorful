const { esbuildPlugin } = require('@web/dev-server-esbuild');

module.exports = {
  nodeResolve: true,
  plugins: [esbuildPlugin({ ts: true })],
  coverage: true,
  coverageConfig: {
    threshold: {
      statements: 90,
      branches: 70,
      functions: 90,
      lines: 90
    }
  },
};
