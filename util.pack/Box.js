import Vector from engine.util;

class Box {
  constructor(pointA, pointB) {
    this.pointA = pointA || new Vector;
    this.pointB = pointB || new Vector;
  }

  pointIntersect(point) {
    return point.x >= this.left && point.x <= this.right && point.y >= this.top && point.y <= this.bot;
  }

  jointBox(box) {
    const left = this.left > box.left ? this.left : box.left;
    const right = this.right < box.right ? this.right : box.right;
    const top = this.top > box.top ? this.top : box.top;
    const bot = this.bot < box.bot ? this.bot : box.bot;


    return (left <= right && top <= bot) && new Box(new Vector(left, top), new Vector(right, bot));
  }

  get left() {
    const test = this.pointA.x < this.pointB.x;
    return  test * this.pointA.x + !test * this.pointB.x;
  }

  get right() {
    const test = this.pointA.x > this.pointB.x;
    return  test * this.pointA.x + !test * this.pointB.x;
  }

  get top() {
    const test = this.pointA.y < this.pointB.y;
    return  test * this.pointA.y + !test * this.pointB.y;
  }

  get bot() {
    const test = this.pointA.y > this.pointB.y;
    return  test * this.pointA.y + !test * this.pointB.y;
  }

  get minPoint() {
    return new Vector(this.left, this.top);
  }

  get maxPoint() {
    return new Vector(this.right, this.bot);
  }
}
