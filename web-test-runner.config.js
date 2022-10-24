import { esbuildPlugin } from '@web/dev-server-esbuild';
import { visualRegressionPlugin } from '@web/test-runner-visual-regression/plugin';

export default {
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
      branches: 100,
      functions: 100,
      lines: 100
    }
  },
};
