import Vector, Box from util;

class Mask {
  constructor(data) {
    this.data = data;

    const cache = [];
    for (let i=3; i<this.data.data.length; i+=4) cache.push(this.data.data[i] !== 0);

    this.mask = [];
    for (let x=0; x<=this.data.width; x++) {
      this.mask.push([]);
      for (let y=0; y<=this.data.height; y++) {
        this.mask[x].push(cache[x + y * this.data.height]);
      }
    }

    this.box = new Box(new Vector(0, 0), new Vector(this.mask.length -1, this.mask[0].length -1));
  }

  pointIntersect(point, graph) {
    const { box, mask } = this;
    const { pos, offset, scale, rotation, origin } = graph;

    point = point.copy.sub(pos, offset).divXY(scale).rotate(-rotation).add(origin).floor();
    return box.pointIntersect(point) && mask[point.x][point.y];
  }
}
