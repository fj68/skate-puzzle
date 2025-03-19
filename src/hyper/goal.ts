import { Actor } from "./actor";
import { Color, Colors } from "./color";
import type { IEqualable } from "./IEqualable";
import type { IStringer } from "./IStringer";
import { Position } from "./position";

export class Goal implements IEqualable<Goal>, IStringer {
  constructor(
    public color: Color,
    public position: Position
  ) {}
  reached(actor: Actor): boolean {
    const isColorSame =
      this.color === Colors.Black || this.color === actor.color;
    const isPositionSame = this.position.equals(actor.position);
    return isColorSame && isPositionSame;
  }
  equals(other: Goal): boolean {
    return this.color === other.color && this.position.equals(other.position);
  }
  toString(): string {
    return `Goal{${this.color}, ${this.position.toString()}}`;
  }
}
