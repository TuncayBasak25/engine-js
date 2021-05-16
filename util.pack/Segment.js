import Box, Vector from engine.util;

class Segment {
  constructor(start, end) {
    this.start = start || new Vector;
    this.end = end || new Vector;

    (this.start.x > this.end.x) && ([this.end, this.start] = [this.start, this.end]);
  }

  segmentIntersect(segment) {
    const jointBox = this.box.jointBox(segment.box);

    if (!jointBox) return false;

    const parallelle = this.coef === segment.coef;
    const superpose = parallelle && (this.gradient === segment.gradient)

    if (parallelle) return superpose;

    // Formule: ax + b = cx + d <=> (a - c)x = d - b <=> x = (d - b) / (a - c)

    const x = (this.coef === Infinity) && this.gradient || (segment.coef === Infinity) && segment.gradient || (segment.gradient - this.gradient) / (this.coef - segment.coef);

    const y = (this.coef === Infinity) && segment.coef * x + segment.gradient || this.coef * x + this.gradient;

    const point = new Vector(x,y);

    return jointBox.pointIntersect(point) && point;
  }

  get box() {
    return new Box(this.start, this.end);
  }

  get coef() {
    return (this.end.y - this.start.y) / (this.end.x - this.start.x);
  }

  get gradient() {
    return (this.coef === Infinity) && this.start.x || this.start.y - this.coef * this.start.x;
  }
}
