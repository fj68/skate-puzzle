import type { IEqualable } from "./IEqualable";
import type { IStringer } from "./IStringer";
import { Position } from "./position";

export class Size implements IEqualable<Size>, IStringer {
  constructor(
    public width: number,
    public height: number
  ) {}
  get center(): Position {
    return new Position(this.width / 2, this.height / 2);
  }
  equals(other: Size): boolean {
    return this.width === other.width && this.height === other.height;
  }
  toString(): string {
    return `Size{${this.width}, ${this.height}}`;
  }
}
