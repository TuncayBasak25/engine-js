import Vector, Segment, Box from engine.util;

class Polygon {
  constructor(pointList = []) {
    this.pointList = pointList;
  }

  pointIntersect(point) {
    const inbox = this.box.pointIntersect(point);

    if (!inbox) return inbox;

    let intersection = 0;
    const origin = new Vector(this.box.minPoint.x - 1, this.box.minPoint.y - 1);
    const tester = new Segment(origin, point);

    this.segmentList.forEach(segment => segment.segmentIntersect(tester) && intersection++);

    return intersection % 2 !== 0;
  }

  rotate(angle, origin = this.center) {
    this.pointList.forEach(point => {
      point.sub(origin);
      point.rotate(angle);
      point.add(origin);
    });

    return this;
  }

  set pointList(pointList) {
    this._poinList = pointList;

    this.center = new Vector(pointList.reduce((somme, point) => somme += point.x, 0) / pointList.length, pointList.reduce((somme, point) => somme += point.y, 0) / pointList.length);

    const [min, max] = pointList.reduce(([min,max], point) => {
      min.x = min.x < point.x ? min.x : point.x;
      min.y = min.y < point.y ? min.y : point.y;
      max.x = max.x > point.x ? max.x : point.x;
      max.y = max.y > point.y ? max.y : point.y;
      return [min, max];
    }, [{...pointList[0]}, {...pointList[0]}] );

    this.box = new Box(min, max);

    this.segmentList = [];

    const length = pointList.length;

    for (let i=0; i<length; i++) this.segmentList.push(new Segment(pointList[i], (i === length-1) ? pointList[0] : pointList[i+1]));
  }

  get pointList() {
    return this._poinList;
  }
}
