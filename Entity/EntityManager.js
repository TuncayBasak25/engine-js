class EntityManager {
  static count = 0;

  static _instances = {};
  static _activeInstances = {};

  static get instances() {
    return (this.name === 'Entity') && this._instances || this[this.name + 'Instances'];
  }

  constructor() {
    this.id = ++EntityManager.count;

    EntityManager.instances[this.id] = this;


    (EntityManager[this.constructor.name + 'Instances'] || (EntityManager[this.constructor.name + 'Instances'] = {}))[this.id] = this;
  }

  get pos() {
    return this.graphic.pos;
  }

  set pos(value) {
    this.graphic.pos = value;
  }

  setPos(value) {
    this.graphic.pos = value;
    return this;
  }

  get offset() {
    return this.graphic.offset;
  }

  set offset(value) {
    this.graphic.offset = value;
  }

  setOffset(value) {
    this.graphic.offset = value;
    return this;
  }

  get scale() {
    return this.graphic.scale;
  }

  set scale(value) {
    this.graphic.scale = value;
  }

  setScale(value) {
    this.graphic.scale = value;
    return this;
  }

  get origin() {
    return this.graphic.origin;
  }

  set origin(value) {
    this.graphic.origin = value;
  }

  setOrigin(value) {
    this.graphic.origin = value;
    return this;
  }

  get rotation() {
    return this.graphic.rotation;
  }

  set rotation(value) {
    this.graphic.rotation = value;
  }

  setRotation(value) {
    this.graphic.rotation = value;
    return this;
  }

  get view() {
    return this.graphic.view;
  }

  set view(view) {
    this.graphic.view = view;
  }

  setView(view) {
    this.view = view;
    return this;
  }

  get sprite() {
    return this.graphic.sprite;
  }

  set sprite(sprite) {
    this.graphic.sprite = sprite;
  }

  setSprite(sprite) {
    this.sprite = sprite;
    return this;
  }

  setMask(mask) {
    this.mask = mask;
    return this;
  }

  setLimitBox(box) {
    this.limitBox = box;
    return this;
  }
}
