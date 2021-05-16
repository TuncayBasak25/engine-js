import Vector from engine.util;

class Graphic {
  constructor(params = {}) {
    const { pos = new Vector, offset = new Vector, origin = new Vector, scale = new Vector(1,1), rotation = 0, view = null, sprite = null } = params;

    this.pos = pos;
    this.offset = offset;
    this.origin = origin;
    this.scale = scale;
    this.rotation = rotation;
    this.view = view;
    this.sprite = sprite;
  }

  draw() {
    this.sprite.nextFrame();
    this.view.drawGraphic(this);
  }
}
