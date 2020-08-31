const { esbuildPlugin } = require('@web/dev-server-esbuild');

module.exports = {
  nodeResolve: true,
  plugins: [esbuildPlugin({ ts: true })],
  coverage: true,
  coverageConfig: {
    threshold: {
      statements: 99,
      branches: 77,
      functions: 100,
      lines: 99
    }
  },
};
