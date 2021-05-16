import Vector from engine.util;


class VectorArray {
  constructor(xLength = 0, yLength = 0, initialValue = null) {
    const cols = [];
    const rows = [];

    for (let y=0; y<yLength; y++) rows[y] = [];

    for (let x=0; x<xLength; x++) {
      cols[x] = [];
      for (let y=0; y<yLength; y++) {
        const cell = { value: initialValue, pos: new Vector(x,y) };
        cols[x][y] = cell;
        rows[y][x] = cell;
      }
    }

    this.cols = cols;
    this.rows = rows;

    this.xLength = xLength;
    this.yLength = yLength;
  }

  get copy() {
    const copy = new VectorArray(this.xLength, this.yLength);

    for (let x=0; x<this.xLength; x++) {
      for (let y=0; y<this.yLength; y++) {
        const value = this.getXY(x,y);
        copy.setXY(x, y, (typeof value === 'object') && value.copy || value);
      }
    }

    return copy;
  }

  forEachColOfRows(func) {
    for (let col of this.rows) {
      for (let cell of col) {
        cell.value = func(cell.value, cell.pos) || cell.value;
      }
    }
  }

  forEachRowOfCols(func) {
    for (let row of this.cols) {
      for (let { value } of row) {
        func(value);
      }
    }
  }

  set(pos, value) {
    this.cols[pos.x][pos.y].value = value;
    return this;
  }
  setXY(x, y, value) {
    this.cols[x][y].value = value;
    return this;
  }

  get(pos) {
    return this.cols[pos.x][pos.y].value;
  }
  getXY(x, y) {
    return this.cols[x][y].value;
  }
}


export VectorArray;
