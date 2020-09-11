import { visualDiff } from '@web/test-runner-visual-regression';
import { fixture, html } from '@open-wc/testing-helpers';
import '../../hex-color-picker.js';
describe('visual test', () => {
  let picker: HTMLElement;

  beforeEach(async () => {
    picker = await fixture(
      html`
        <div style="width: 220px; padding: 10px">
          <hex-color-picker></hex-color-picker>
        </div>
      `
    );
  });

  it('cross renders properly by default', async () => {
    await visualDiff(picker, 'hex');
  });
});
