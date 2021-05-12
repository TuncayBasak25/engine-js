import EntityManager from engine;
import Vector from engine.util;
import Graphic from engine.graphic;

class Entity extends EntityManager {
  constructor() {
    super();

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

  setMoveToPosition(pos, speed) {
    this.moveToPos = pos;
    const direction = this.pos.directionTo(this.moveToPos);
    this.moveToPosSpeed.setNorme(speed).setDirection(direction);

    this.updateMethods.applyMoveToPosition = true;

    return this;
  }

  applyMoveToPosition() {
    if (!this.moveToPos) return this;

    const distance = this.pos.distanceToPoint(this.moveToPos);
    const speedPerFrame = this.moveToPosSpeed.copy.div(Game.game.fps);

    (distance > speedPerFrame.norme) && this.pos.add(speedPerFrame)
    || this.pos.setTo(this.moveToPos) && (this.moveToPos = null) && (delete this.updateMethods.applyMoveToPosition);
  }

  setSpeed(speed) {
    this.speed = speed;

    this.speed.isNull() && (delete this.updateMethods.applySpeed) || (this.updateMethods.applySpeed = true);

    return this;
  }

  applySpeed() {
    this.pos.add(this.speed);
  }
}
