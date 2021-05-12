import Mouse, Keyboard, refreshInputs from engine.inputs;
import Vector from engine.util;

import Entity from engine;

class App {
  static frames = 0;
  static fps = 0;

  static isRunning = false;

  static works = { begin: [], middle: [], end: [] };
  static events = { key: [], keyDown: [], keyUp: [], onMouse: [] };

  static start() {
    this.isRunning = true;
    this.loop();
  }

  static stop() {
    this.isRunning = false;
  }

  static loop() {
    const endTime = (new Date).getTime();

    const delta = (endTime - this.startTime) / 1000;

    this.fps = Math.floor(1/delta);

    // if (this.frames % this.fps === 0) console.log(this.fps);

    this.startTime = (new Date).getTime();

    this.nextFrame();

    refreshInputs();

    this.frames++;

    if (this.isRunning) window.requestAnimationFrame(() => this.loop());
  }

  static nextFrame() {
    const { key, keyUp, keyDown, onMouse } = this.events;

    const { begin, middle, end } = this.works;

    for (let i=0; i<begin.length; i++) begin[i]();

    let keyList = Object.keys(Keyboard.hold);
    for (let k=0; k<keyList.length; k++) {
      const func = key[keyList[k]] || [];
      for (let i=0; i<func.length; i++) func[i]();
    }

    keyList = Object.keys(Keyboard.release);
    for (let k=0; k<keyList.length; k++) {
      const func = keyUp[keyList[k]] || [];
      for (let i=0; i<func.length; i++) func[i]();
    }

    keyList = Object.keys(Keyboard.press);
    for (let k=0; k<keyList.length; k++) {
      const func = keyDown[keyList[k]] || [];
      for (let i=0; i<func.length; i++) func[i]();
    }

    keyList = Object.keys(Mouse);
    for (let k=0; k<keyList.length; k++) {
      const func = onMouse[keyList[k]] || [];
      for (let i=0; i<func.length; i++) func[i]();
    }

    //Update Entity
    for (let entity of Object.values(Entity.instances)) {
      for (let method of Object.keys(entity.updateMethods)) entity[method]();
    }

    for (let i=0; i<middle.length; i++) middle[i]();

    for (let i=0; i<end.length; i++) end[i]();

    //Draw Entity
    for (let entity of Object.values(Entity.instances)) {
      for (let method of Object.keys(entity.drawMethods)) entity[method]();
    }
  }

  static do(when, func) {
    this.works[when].push(func);
  }

  static onKey(key, func) {
    if (!this.events.key[key]) this.events.key[key] = [];
    this.events.key[key].push(func)
  }

  static onKeyDown(key, func) {
    if (!this.events.keyDown[key]) this.events.keyDown[key] = [];
    this.events.keyDown[key].push(func)
  }

  static onKeyUp(key, func) {
    if (!this.events.keyUp[key]) this.events.keyUp[key] = [];
    this.events.keyUp[key].push(func)
  }

  static onMouse(button, func) {
    if (!this.events.onMouse[button]) this.events.onMouse[button] = [];
    this.events.onMouse[button].push(func)
  }
}

Object.defineProperty(window, 'size', { get: () => new Vector(window.innerWidth, window.InnerHeight) });

document.body.innerHTML = '';
document.body.style.padding = 0;
document.body.style.margin = 0;

window.oncontextmenu = () => false;

const gameScreen = document.createElement('div');

gameScreen.style.width = windowSize.x + 'px';
gameScreen.style.height = windowSize.y + 'px';

gameScreen.style.position = 'absolute';
gameScreen.style.overflow = 'hidden';

document.body.appendChild(gameScreen);
