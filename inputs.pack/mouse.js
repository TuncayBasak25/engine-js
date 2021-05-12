import Vector from engine.util;

const Mouse = {
  pos: new Vector(0,0),

  delta: new Vector(0,0),

  refresh: () => {
    delete Mouse.moved;

    Mouse.delta.x = 0;
    Mouse.delta.y = 0;

    delete Mouse.rightPressed;
    delete Mouse.rightRelased;

    delete Mouse.leftPressed;
    delete Mouse.leftRelased;

    delete Mouse.middlePressed;
    delete Mouse.middleRelased;

    delete Mouse.wheelUp;
    delete Mouse.wheelDown;
  },

  set cursor(value) {
    document.body.style.cursor = value
  }
}

window.addEventListener('mousedown', ({button, clientX, clientY}) => {
  Mouse.pos.x = clientX;
  Mouse.pos.y = clientY;

  if (button === 0) {
    Mouse.left = true;
    Mouse.leftPressed = true;
  }
  else if (button === 1) {
    Mouse.middle = true;
    Mouse.middlePressed = true;
  }
  else if (button === 2) {
    Mouse.right = true;
    Mouse.rightPressed = true;
  }
});

window.addEventListener('mouseup', ({button, clientX, clientY}) => {
  Mouse.pos.x = clientX;
  Mouse.pos.y = clientY;

  if (button === 0) {
    delete Mouse.left;
    Mouse.leftRelased = true;
  }
  else if (button === 1) {
    delete Mouse.middle;
    Mouse.middleRelased = true;
  }
  else if (button === 2) {
    delete Mouse.right;
    Mouse.rightRelased = true;
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
  Mouse.leftRelased = true;
  Mouse.touchPos = null;
}, {passive: false})
