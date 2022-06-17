class Turtle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.trackPoints = [[this.x, this.y]];
  }

  //        270 deg.
  // 180 deg.      0 deg.
  //        90 deg.
  forward(steps) {
    this.resetAngle();
    for (let i = 0; i < steps; i++) {
      switch (this.angle) {
        case 0:
          this.x += 1;
          break;
        case 90:
          this.y += 1;
          break;
        case 180:
          this.x -= 1;
          break;
        case 270:
          this.y -= 1;
          break;
      }
      this.trackPoints.push([this.x, this.y]);
    }
    return this;
  }

  //make sure angel is between 0 - 360
  resetAngle() {
    if (this.angle >= 360) {
      this.angle = this.angle % 360;
    }
    if (this.angle < 0) {
      this.angle += 360;
    }
  }

  right() {
    this.angle += 90;
    return this;
  }

  left() {
    this.angle -= 90;
    return this;
  }

  allPoints() {
    return this.trackPoints;
  }

  isTrackPoint(x, y) {
    return this.allPoints().some((p) => p[0] === x && p[1] === y);
  }

  calcGrid() {
    const startPoint = this.allPoints()[0];
    const extendX = startPoint[0] + 2;
    const extendY = startPoint[1] + 2;
    const rowSet = new Set();
    const columnSet = new Set();
    this.allPoints().forEach((p) => {
      columnSet.add(p[0]);
      rowSet.add(p[1]);
    });
    return { rows: rowSet.size + extendY, columns: columnSet.size + extendX };
  }

  print() {
    const { rows, columns } = this.calcGrid();
    let string = "";
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        string += this.isTrackPoint(j, i) ? "■ " : "□ ";
      }
      string += "\n";
    }
    console.log(string);
    return this;
  }
}
new Turtle(0, 4)
  .forward(3)
  .left()
  .forward(3)
  .right()
  .forward(5)
  .right()
  .forward(8)
  .right()
  .forward(5)
  .right()
  .forward(3)
  .left()
  .forward(3)
  .print();
