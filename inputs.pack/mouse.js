import Vector from engine.util;

class Mouse {
  static pos = new Vector(0,0);

  static delta =  new Vector(0,0);

  static leftReleaseFrame = 0;
  static leftPressFrame = 0;

  static middleReleaseFrame = 0;
  static middlePressFrame = 0;

  static rightReleaseFrame = 0;
  static rightPressFrame = 0;

  static refresh() {
    delete Mouse.moved;

    Mouse.delta.x = 0;
    Mouse.delta.y = 0;

    delete Mouse.rightPressed;
    delete Mouse.rightReleased;

    delete Mouse.leftPressed;
    delete Mouse.leftReleased;

    delete Mouse.middlePressed;
    delete Mouse.middleReleased;

    delete Mouse.wheelUp;
    delete Mouse.wheelDown;
  }

  static set cursor(value) {
    document.body.style.cursor = value
  }

  static leftClick(deltaMaxTime) {
    const { App } = Mouse;

    const deltaMaxFrame = Math.round(deltaMaxTime / App.delta);
    const deltaFrame = Mouse.leftReleaseFrame - Mouse.leftPressFrame;

    return Mouse.leftReleased && (deltaFrame < deltaMaxFrame);
  }

  static leftTimeout(deltaMinTime, deltaMaxTime = Infinity) {
    const { App } = Mouse;

    const deltaMaxFrame = Math.round(deltaMinTime / App.delta);
    const deltaMinFrame = Math.round(deltaMaxTime / App.delta);
    const deltaFrame = App.frames - Mouse.leftPressFrame;

    return Mouse.left && (deltaFrame > deltaMinFrame) && (deltaFrame < deltaMaxFrame);
  }

  static leftPressedTimeout(deltaMaxTime) {
    const { App } = Mouse;

    const deltaMaxFrame = Math.round(deltaMaxTime / App.delta);
    const deltaFrame = App.frames - Mouse.leftPressFrame;

    return Mouse.left && (deltaFrame === deltaMaxFrame);
  }
}


window.addEventListener('mousedown', ({button, clientX, clientY}) => {
  const { App } = Mouse;

  Mouse.pos.x = clientX;
  Mouse.pos.y = clientY;

  if (button === 0) {
    Mouse.left = true;
    Mouse.leftPressed = true;
    Mouse.leftPressFrame = App.frames;
  }
  else if (button === 1) {
    Mouse.middle = true;
    Mouse.middlePressed = true;
    Mouse.middlePressFrame = App.frames;
  }
  else if (button === 2) {
    Mouse.right = true;
    Mouse.rightPressed = true;
    Mouse.rightPressFrame = App.frames;
  }
});

window.addEventListener('mouseup', ({button, clientX, clientY}) => {
  const { App } = Mouse;

  Mouse.pos.x = clientX;
  Mouse.pos.y = clientY;

  if (button === 0) {
    delete Mouse.left;
    Mouse.leftReleased = true;
    Mouse.leftReleaseFrame = App.frames;
  }
  else if (button === 1) {
    delete Mouse.middle;
    Mouse.middleReleased = true;
    Mouse.middleReleaseFrame = App.frames;
  }
  else if (button === 2) {
    delete Mouse.right;
    Mouse.rightReleased = true;
    Mouse.rightReleaseFrame = App.frames;
  }
});

window.addEventListener('mousemove', ({clientX, clientY}) => {
  Mouse.delta.setXY(clientX, clientY).sub(Mouse.pos);

  Mouse.pos.setXY(clientX, clientY)

  Mouse.moved = true;
});

window.addEventListener('mousewheel', ({deltaY}) => {
  if (deltaY > 0) Mouse.wheelUp = true;
  else Mouse.wheelDown = true;
});

window.addEventListener('touchmove', ({touches, preventDefault}) => {
  Mouse.tactile = true;
  (touches.length > 1) && preventDefault();

  const { clientX, clientY } = touches[0];

  Mouse.delta.setXY(clientX, clientY).sub(Mouse.pos);

  Mouse.pos.setXY(clientX, clientY)

  Mouse.moved = true;
}, {passive: false})

window.addEventListener('touchstart', ({touches, preventDefault}) => {
  Mouse.tactile = true;
  const { clientX, clientY } = touches[0];

  Mouse.pos.x = clientX;
  Mouse.pos.y = clientY;
  Mouse.left = true;
  Mouse.leftPressed = true;
  Mouse.touchPos = Mouse.pos.copy;
}, {passive: false})

window.addEventListener('touchend', ({touches, preventDefault}) => {console.log('test');
  delete Mouse.left;
  Mouse.leftReleased = true;
  Mouse.touchPos = null;
}, {passive: false})
