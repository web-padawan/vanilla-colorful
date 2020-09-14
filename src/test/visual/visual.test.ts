import { visualDiff } from '@web/test-runner-visual-regression';
import { fixture } from '@open-wc/testing-helpers';
import '../../hex-color-picker.js';
import '../../hsl-color-picker.js';
import '../../hsl-string-color-picker.js';
import '../../hsla-color-picker.js';
import '../../hsla-string-color-picker.js';
import '../../hsv-color-picker.js';
import '../../hsva-color-picker.js';
import '../../rgb-color-picker.js';
import '../../rgb-string-color-picker.js';
import '../../rgba-color-picker.js';
import '../../rgba-string-color-picker.js';

describe('visual tests', () => {
  let picker: HTMLElement;

  [
    'hex',
    'hsl',
    'hsl-string',
    'hsla',
    'hsla-string',
    'hsv',
    'hsva',
    'rgb',
    'rgb-string',
    'rgba',
    'rgba-string'
  ].forEach((type) => {
    describe(`${type}-color-picker`, () => {
      beforeEach(async () => {
        picker = await fixture(`
          <div style="display: flex; justify-content: center; width: 216px; padding: 8px">
            <${type}-color-picker></${type}-color-picker>
          </div>
        `);
      });

      it('should match screenshot', async () => {
        await visualDiff(picker, type);
      });
    });
  });
});
