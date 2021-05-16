import Vector from engine.util;

Object.defineProperty(window, 'size', { get: () => new Vector(window.innerWidth, window.innerHeight) });

document.body.innerHTML = '';
document.body.style.padding = 0;
document.body.style.margin = 0;

window.oncontextmenu = () => false;

const appScreen = document.createElement('div');

appScreen.style.width = window.size.x + 'px';
appScreen.style.height = window.size.y + 'px';

appScreen.style.position = 'absolute';
appScreen.style.overflow = 'hidden';

document.body.appendChild(appScreen);

window.appScreen = appScreen;

class View {
  constructor(size = window.size, offset = new Vector(0,0)) {
    this.size = size;
    this.offset = offset;

    this.element = document.createElement('canvas');
    window.appScreen.appendChild(this.element);

    this.element.width = this.size.x;
    this.element.height = this.size.y;

    this.style = this.element.style;

    this.style.position = 'absolute';

    this.updatePosition();

    this.context = this.element.getContext('2d');
  }

  move(vector) {
    this.offset.add(vector);
    this.updatePosition();

    return this;
  }

  updatePosition() {
    this.style.left = this.offset.x + 'px';
    this.style.top = this.offset.y + 'px';

    return this;
  }

  clear() {
    this.context.clearRect(0, 0, this.size.x, this.size.y);

    return this;
  }

  clearRect(pos, size) {
    this.context.clearRect(pos.x, pos.y, size.x, size.y);

    return this;
  }

  drawText(text, pos) {
    this.context.font = '48px serif';
    this.context.fillText(text, pos.x, pos.y);
    return this;
  }

  drawGraphic(graphic) {
    const { context } = this;
    const { image } = graphic.sprite;
    const { pos, offset, scale, origin, rotation } = graphic;

    context.setTransform(scale.x, 0, 0, scale.y, pos.x + offset.x, pos.y + offset.y); // sets scales and origin
    context.rotate(rotation);

    context.drawImage(image, -origin.x, -origin.y);

    context.setTransform(1, 0, 0, 1, 0, 0);

    return this;
  }

  drawLine(a, b, color = 'black') {
    const { context } = this;

    context.strokeStyle = color;

    context.beginPath();
    context.moveTo(a.x,a.y);
    context.lineTo(b.x, b.y);
    context.stroke();

    return this;
  }

  drawCircle(center, rayon, color) {
    this.context.beginPath();
    this.fillStyle = color;
    this.context.arc(center.x, center.y, rayon, 0, 2 * Math.PI);
    this.context.fill();
  }

  drawRect(a, b, color) {
    this.context.beginPath();
    this.context.strokeStyle = color;
    this.context.rect(a.x, a.y, b.x - a.x, b.y - a.y);
    this.context.stroke();

    return this;
  }

  drawPolygon(polygon, color) {
    polygon.segmentList.forEach(segment => this.drawLine(segment.start, segment.end, color));

    return this;
  }

  drawFillRect(a, b, color = 'black') {
    this.context.fillStyle = color;
    this.context.fillRect(a.x, a.y, b.x-a.x, b.y-a.y);

    return this;
  }

  set zIndex(value) {
    this.style.zIndex = value;
  }

  get zIndex() {
    return this.style.zIndex;
  }

  set fillStyle(value) {
    this.context.fillStyle = value;
  }

}
