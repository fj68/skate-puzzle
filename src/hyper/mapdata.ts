import type { IEqualable } from "./IEqualable";
import type { IStringer } from "./IStringer";
import { Size } from "./size";
import { Rectangle } from "./rectangle";
import * as Arrays from "./arrays";

export class Mapdata implements IEqualable<Mapdata>, IStringer {
  horizontalWalls: number[][];
  verticalWalls: number[][];
  constructor(public size: Size) {
    this.horizontalWalls = new Array(size.width).fill(0).map(() => []);
    this.verticalWalls = new Array(size.height).fill(0).map(() => []);
  }
  get center(): Rectangle {
    return Rectangle.of(this.size.center.floor(), new Size(2, 2));
  }
  equals(other: Mapdata): boolean {
    return (
      this.size.equals(other.size) &&
      Arrays.equals(Arrays.equals((x, y) => x === y))(
        this.horizontalWalls,
        other.horizontalWalls
      ) &&
      Arrays.equals(Arrays.equals((x, y) => x === y))(
        this.verticalWalls,
        other.verticalWalls
      )
    );
  }
}
