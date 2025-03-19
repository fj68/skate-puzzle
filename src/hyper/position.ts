import type { IEqualable } from "./IEqualable";
import type { IStringer } from "./IStringer";

export class Position implements IEqualable<Position>, IStringer {
  constructor(
    public x: number,
    public y: number
  ) {}
  copy(): Position {
    return new Position(this.x, this.y);
  }
  add(other: Position): Position {
    this.x += other.x;
    this.y += other.y;
    return this;
  }
  sub(other: Position): Position {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  }
  mul(other: Position): Position {
    this.x *= other.x;
    this.y *= other.y;
    return this;
  }
  scale(n: number): Position {
    this.x *= n;
    this.y *= n;
    return this;
  }
  abs(): Position {
    this.x = Math.abs(this.x);
    this.y = Math.abs(this.y);
    return this;
  }
  floor(): Position {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
  }
  ceil(): Position {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this;
  }
  equals(other: Position): boolean {
    return this.x === other.x && this.y === other.y;
  }
  toString(): string {
    return `Position{${this.x}, ${this.y}}`;
  }
}
