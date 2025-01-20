export class Mold {
  constructor() {
    this.x = random(width / 2 - 20, width / 2 + 20);
    this.y = random(height / 2 - 20, height / 2 + 20);
    this.heading = random(360);
    this.sensorDist = 10;
    this.sensorAngle = 45;
    this.rotAngle = 45;
  }

  update() {
    let vx = cos(this.heading);
    let vy = sin(this.heading);

    this.x = (this.x + vx + width) % width;
    this.y = (this.y + vy + height) % height;

    if (random(1) < 0.5) {
      this.heading += this.rotAngle;
    } else {
      this.heading -= this.rotAngle;
    }
  }

  display() {
    stroke(255);
    line(this.x, this.y, this.x + cos(this.heading) * 5, this.y + sin(this.heading) * 5);
  }
}