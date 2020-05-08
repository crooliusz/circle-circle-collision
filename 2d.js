export class Vec2D {
  /**
   * 
   * @param {number} x 
   * @param {number} y 
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  normalize() {
    const l = this.mag();
    if (l === 0) {
      return new Vec2D(0, 0);
    }
    return new Vec2D(this.x / l, this.y / l);
  }
  mult(scalar) {
    return new Vec2D(this.x * scalar, this.y * scalar);
  }
  /**
   * 
   * @param {Vec2D} vec 
   * @returns {Vec2D}
   */
  sub(vec) {
    return new Vec2D(this.x - vec.x, this.y - vec.y)
  }
  /**
   * 
   * @param {Vec2D} vec 
   * @returns {Vec2D}
   */
  add(vec) {
    return new Vec2D(this.x + vec.x, this.y + vec.y)
  }
}

export class Circle2D {
  /**
   * 
   * @param {Vec2D} pos 
   * @param {number} radius 
   */
  constructor(pos, radius) {
    this.pos = pos;
    this.radius = radius;
  }
}