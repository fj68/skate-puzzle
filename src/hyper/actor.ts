import type { IEqualable } from "./IEqualable";
import type { IStringer } from "./IStringer";
import { Color } from "./color";
import { Position } from "./position";

export class Actor implements IEqualable<Actor>, IStringer {
  constructor(
    public color: Color,
    public position: Position
  ) {}
  equals(other: Actor): boolean {
    return this.color === other.color && this.position.equals(other.position);
  }
  toString(): string {
    return `Actor{${this.color}, ${this.position.toString()}}`;
  }
}
