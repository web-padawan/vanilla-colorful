import { throttle } from '../node_modules/throttle-debounce/esm/index.js';

const ICON_SIZE = 64;
const OUTLINE_RADIUS = 28;
const POINTER_RADIUS = 22;

const createCanvas = () => {
  const canvas = document.createElement('canvas');
  canvas.width = ICON_SIZE;
  canvas.height = ICON_SIZE;
  return canvas;
};

const createBackgroundCanvas = () => {
  const canvas = createCanvas();
  const ctx = canvas.getContext('2d');

  ctx.beginPath();
  ctx.arc(ICON_SIZE * 0.5, ICON_SIZE * 0.5, OUTLINE_RADIUS, 0, 2 * Math.PI, false);
  ctx.closePath();

  ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
  ctx.shadowOffsetY = 1;
  ctx.shadowBlur = 6;
  ctx.fillStyle = '#fff';
  ctx.fill();

  return canvas;
};

let faviconNode;
let canvas;
let backgroundCanvas;

// generate a favicon only once on mobiles in order to improve performance
const shouldReplace = () => {
  if (window.innerWidth < 768 && faviconNode) return false;
  return true;
};

export const setFaviconColor = (color) => {
  // create canvases only once
  if (!canvas) {
    canvas = createCanvas();
    backgroundCanvas = createBackgroundCanvas();
  }

  return throttle(500, () => {
    if (shouldReplace()) {
      // draw a new favicon and replace `link` tag
      const ctx = canvas.getContext('2d');

      // wipe out the canvas
      ctx.clearRect(0, 0, ICON_SIZE, ICON_SIZE);

      // draw the cached background
      ctx.drawImage(backgroundCanvas, 0, 0);

      // draw a pointer
      ctx.beginPath();
      ctx.arc(ICON_SIZE * 0.5, ICON_SIZE * 0.5, POINTER_RADIUS, 0, 2 * Math.PI, false);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      // create a new favicon tag
      const link = document.createElement('link');
      link.rel = 'shortcut icon';
      link.href = canvas.toDataURL('image/x-icon');

      // remove the old favicon from the document
      if (faviconNode) document.head.removeChild(faviconNode);

      document.head.appendChild(link);
      faviconNode = link;
    }
  });
};
