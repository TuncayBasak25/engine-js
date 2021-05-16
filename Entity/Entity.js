import EntityManager, App from engine;
import Vector, Mask from engine.util;
import Graphic, Sprite from engine.graphic;

import Mouse, Keyboard from engine.inputs;

class Entity extends EntityManager {
  constructor() {
    super();

    this.graphic = new Graphic;

    this.listenMethods = {};
    this.updateMethods = {
      update: true
    }; //Append and delete methods to execute every frame
    this.drawMethods = {
      draw: true
    };
  }

  draw() {
    this.graphic.draw();
  }

  update() {

  }

  beforeUpdate() {

  }

  afterUpdate() {
    
  }

  listenMouseOnMask() {
    if (Mouse.moved) {
      this.mouseWasOnMask = this.isMouseOnMask;
      this.isMouseOnMask = this.mask.pointIntersect(Mouse.pos, this.graphic);

      this.mouseEnteredMask = this.isMouseOnMask && !this.mouseWasOnMask;
      this.mouseLeavedMask = !this.isMouseOnMask && this.mouseWasOnMask;
    }
  }



  setMoveToPosition(pos, speed) {
    this.moveToPos = pos;
    this.moveToPosSpeed = new Vector;
    const direction = this.pos.directionTo(this.moveToPos);
    this.moveToPosSpeed.setNorme(speed).setDirection(direction);

    this.updateMethods.applyMoveToPosition = true;

    return this;
  }

  applyMoveToPosition() {
    const distance = this.pos.distanceToPoint(this.moveToPos);
    const speedPerFrame = this.moveToPosSpeed.copy.div(App.fps);

    (distance > speedPerFrame.norme) && this.pos.add(speedPerFrame)
    || this.pos.setTo(this.moveToPos) && (delete this.updateMethods.applyMoveToPosition);
  }

  setSpeed(speed) {
    this.speed = speed;

    this.speed.isNull() && (delete this.updateMethods.applySpeed) || (this.updateMethods.applySpeed = true);

    return this;
  }

  applySpeed() {
    this.pos.add(this.speed);
  }

  createSprite(image) {
    this.sprite = new Sprite(image);
  }

  createMask(image) {
    this.mask = new Mask(image);
  }
}
