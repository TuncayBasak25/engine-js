import Vector from engine.util;

class Sprite {

  constructor(image) {
    this.imageList = [];
    image && this.addImage(image);

    this.imageIndex = 0;
    this.frames = 0;
    this.framePerImage = 1;
  }

  update() {
    this.nextFrame();

    this.graph.canvas.drawSprite(this);
  }

  nextImage() {
    this.imageIndex++;

    if (this.imageIndex === this.imageList.length) this.imageIndex = 0;

    this.image = this.imageList[this.imageIndex];
    return this;
  }

  nextFrame() {
    this.frames++;

    if (this.frames === this.framePerImage) {
      this.frames = 0;
      this.nextImage();
    }
  }

  addImage(image) {
    this.imageList.push(image);
    if (!this.image) this.image = image;

    return this;
  }

  get imageSize() {
    return this.image && new Vector(this.image.width, this.image.height);
  }
}
