import type { IEqualable } from "./IEqualable";
import type { IStringer } from "./IStringer";
import { Position } from "./position";
import { Size } from "./size";

export class Rectangle implements IEqualable<Rectangle>, IStringer {
  constructor(
    public topLeft: Position,
    public bottomRight: Position
  ) {}
  static of(topLeft: Position, size: Size): Rectangle {
    return new Rectangle(
      topLeft,
      new Position(topLeft.x + size.width, topLeft.y + size.height)
    );
  }
  get size(): Size {
    return new Size(
      this.bottomRight.x - this.topLeft.x,
      this.bottomRight.y - this.topLeft.y
    );
  }
  get center(): Position {
    return this.size.center.add(this.topLeft);
  }
  contains(position: Position): boolean {
    return (
      this.topLeft.x <= position.x &&
      position.x < this.bottomRight.x &&
      this.topLeft.y <= position.y &&
      position.y < this.bottomRight.y
    );
  }
  equals(other: Rectangle): boolean {
    return (
      this.topLeft.equals(other.topLeft) &&
      this.bottomRight.equals(other.bottomRight)
    );
  }
  toString(): string {
    return `Rectangle{${this.topLeft.toString()}, ${this.bottomRight.toString()}}`;
  }
}
