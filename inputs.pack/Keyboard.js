const Keyboard = {
  hold: {},
  press: {},
  release: {},

  refresh: () => {
    Keyboard.press = {},
    Keyboard.release = {}
  }
};

window.addEventListener('keydown', ({ keyCode, key }) => {console.log(key);
  if (!Keyboard.hold[key]) Keyboard.press[key] = true;
  Keyboard.hold[key] = true;
});

window.addEventListener('keyup', ({ keyCode, key }) => {
  if (Keyboard.hold[key]) Keyboard.release[key] = true;
  delete Keyboard.hold[key];
});
