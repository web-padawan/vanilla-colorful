export const colorPickerStyles = `
:host {
  display: block;
  position: relative;
  width: 200px;
  height: 200px;
  user-select: none;
  cursor: default;
}`;

export const interactiveStyles = `
#interactive {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  touch-action: none;
}`;

export const pointerStyles = `
#pointer {
  position: absolute;
  z-index: 1;
  box-sizing: border-box;
  width: 24px;
  height: 24px;
  transform: translate(-50%, -50%);
  border: 2px solid #fff;
  border-radius: 50%;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
}`;

export const hueStyles = `
:host {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  border-radius: 0 0 8px 8px;
  background: linear-gradient(
    to right,
    #f00 0%,
    #ff0 17%,
    #0f0 33%,
    #0ff 50%,
    #00f 67%,
    #f0f 83%,
    #f00 100%
  );
}

#pointer {
  top: 50%;
}
`;

export const saturationStyles = `
:host {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 20px;
  border-bottom: 10px solid #000;
  border-radius: 8px 8px 0 0;
}

:host::after,
:host::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  border-radius: inherit;
}

:host::before {
  background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0));
}

:host::after {
  background: linear-gradient(to top, #000, rgba(0, 0, 0, 0));
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05);
}`;
