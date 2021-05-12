class Vector {
  static range(xRange, yRange, step = 1) {
    const table = [];
    for (let x=0; x<xRange; x+=step) {
      table.push([]);
      for (let y=0; y<yRange; y+=step) {
        table[x/step].push(new Vector(x,y));
      }
    }
    return table;
  }

  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  equal(vector) {
    return this.x === vector.x && this.y === vector.y;
  }

  isNull() {
    return this.x === 0 && this.y === 0;
  }

  setX(value) {
    this.x = value;
    this._updateNorme = true;
    this._updateDirection = true;

    return this;
  }

  setY(value) {
    this.y = value;
    this._updateNorme = true;
    this._updateDirection = true;

    return this;
  }

  setXY(x, y) {
    this.x = x;
    this.y = y;
    this._updateNorme = true;
    this._updateDirection = true;

    return this;
  }

  setTo(vector) {
    this.x = vector.x;
    this.y = vector.y;
    this._updateNorme = true;
    this._updateDirection = true;

    return this;
  }

  add(...vectors) {
    vectors.forEach(({x,y}) => { this.x += x; this.y += y });
    this._updateNorme = true;
    this._updateDirection = true;
    return this;
  }

  addXY(x, y) {
    this.x += x;
    this.y += y;
    this._updateNorme = true;
    this._updateDirection = true;
    return this;
  }

  subXY(x, y) {
    this.x -= x;
    this.y -= y;
    this._updateNorme = true;
    this._updateDirection = true;
    return this;
  }

  addX(x) {
    this.x += x;
    this._updateNorme = true;
    this._updateDirection = true;
    return this;
  }

  addY(y) {
    this.y += y;
    this._updateNorme = true;
    this._updateDirection = true;
    return this;
  }

  subX(x) {
    this.x -= x;
    this._updateNorme = true;
    this._updateDirection = true;
    return this;
  }

  subY(y) {
    this.y -= y;
    this._updateNorme = true;
    this._updateDirection = true;
    return this;
  }

  sub(...vectors) {
    vectors.forEach(({x,y}) => { this.x -= x; this.y -= y });
    this._updateNorme = true;
    this._updateDirection = true;
    return this;
  }

  mulX(value) {
    this.x *= value;
    this._updateNorme = true;
    this._updateDirection = true;
    return this;
  }

  mulY(value) {
    this.y *= value;
    this._updateNorme = true;
    this._updateDirection = true;
    return this;
  }

  mulXY(vector) {
    this.x *= vector.x;
    this.y *= vector.y;
    this._updateNorme = true;
    this._updateDirection = true;
    return this;
  }

  mul(value) {
    this.x *= value;
    this.y *= value;
    this._norme *= value;
    return this;
  }

  div(value) {
    this.x /= value;
    this.y /= value;
    this._norme /= value;
    return this;
  }

  divXY(vector) {
    this.x /= vector.x;
    this.y /= vector.y;
    this._updateNorme = true;
    this._updateDirection = true;
    return this;
  }

  divX(value) {
    this.x /= value;
    this._updateNorme = true;
    this._updateDirection = true;
    return this;
  }

  divY(value) {
    this.y /= value;
    this._updateNorme = true;
    this._updateDirection = true;
    return this;
  }

  floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);

    this._updateNorme = true;
    this._updateDirection = true;

    return this;
  }

  round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);

    this._updateNorme = true;
    this._updateDirection = true;

    return this;
  }

  roundTo(value) {
    this.div(value);
    this.round();
    this.mul(value);

    return this;
  }


  distanceToPoint(vector) {
    return this.copy.sub(vector).norme;
  }

  directionTo(vector) {
    return vector.copy.sub(this).direction;
  }


  rotate(angle) {
    this.direction = this.direction + angle;
    return this;
  }

  setDirection(angle) {
    this.direction = angle;
    return this;
  }

  setNorme(value) {
    this.norme = value;
    return this;
  }

  get norme() {
    this._norme = !this._updateNorme && this._norme || (this.x ** 2 + this.y ** 2) ** 0.5;
    this._updateNorme = false;
    return this._norme;
  }

  set norme(value) {
    const { norme } = this;
    this._norme = value;
    this._updateNorme = false;
    (norme === 0) && (this.x = value) || this.mul(value/norme);
  }

  get direction() {
    this._direction = !this._updateDirection && this._direction || Math.atan2(this.y, this.x);
    this._updateDirection = false;
    return this._direction;
  }

  set direction(angle) {
    const { norme } = this;

    this._direction = angle;
    this._updateDirection = false;

    this.x = Math.cos(angle) * norme;
    this.y = Math.sin(angle) * norme;
  }
}

export Vector;
