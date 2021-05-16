import init from engine;

import Mouse, Keyboard, refreshInputs from engine.inputs;
import Vector from engine.util;

import EntityManager from engine;
import ViewManager from engine.graphic;

class App {
  static frames = 0;

  static spf = 0;
  static fps = 0;

  static delta = 0;
  static deltaList = [];
  static deltaAccumulator = 0;

  static startTime = 0;

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

    const delta = (endTime - this.startTime);

    this.deltaList.push(delta);

    this.deltaAccumulator += delta;

    if (this.deltaList.length === 100) this.deltaAccumulator -= this.deltaList.shift();

    this.delta = this.deltaAccumulator / this.deltaList.length;
    this.fps = Math.round(1000/this.delta);
    this.spf = this.delta/1000;

    //if (this.frames % 120 === 0) console.log(this.delta);

    this.startTime = (new Date).getTime();

    this.nextFrame();

    refreshInputs();

    this.frames++;

    if (this.isRunning) window.requestAnimationFrame(() => this.loop());
  }

  static nextFrame() {
    ViewManager.clearAll();

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

    //Update EntityManager
    for (let entity of Object.values(EntityManager.instances)) {
      for (let method of Object.keys(entity.listenMethods)) entity[method]();
    }

    for (let entity of Object.values(EntityManager.instances)) {
      entity.beforeUpdate();
      for (let method of Object.keys(entity.updateMethods)) entity[method]();
      entity.afterUpdate();
    }

    for (let i=0; i<middle.length; i++) middle[i]();

    for (let i=0; i<end.length; i++) end[i]();

    //Draw EntityManager
    for (let entity of Object.values(EntityManager.instances)) {
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

Mouse.App = App;
