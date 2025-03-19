import type { IEqualable } from "./IEqualable";
import type { IStringer } from "./IStringer";
import { Size } from "./size";
import { Rectangle } from "./rectangle";
import * as Arrays from "./arrays";
import { Position } from "./position";

export class Mapdata implements IEqualable<Mapdata>, IStringer {
  horizontalWalls: Set<number>[];
  verticalWalls: Set<number>[];
  constructor(public size: Size) {
    this.horizontalWalls = new Array(size.width)
      .fill(0)
      .map(() => new Set<number>());
    this.verticalWalls = new Array(size.height)
      .fill(0)
      .map(() => new Set<number>());
  }
  static from(input: number[][]): Mapdata | undefined {
    const h = input.length;
    if (h <= 4) {
      return undefined;
    }
    const w = input[0].length;
    if (w <= 4) {
      return undefined;
    }
    const mapdata = new Mapdata(new Size(w, h));

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const v = input[y][x];

        if ((v & 1) != 0) {
          mapdata.putHorizontalWall(new Position(x, y));
        }
        if ((v & 2) != 0) {
          mapdata.putVerticalWall(new Position(x, y));
        }
      }
    }

    return mapdata;
  }
  putHorizontalWall(position: Position): void {
    this.horizontalWalls[position.x].add(position.y);
  }
  putVerticalWall(position: Position): void {
    this.verticalWalls[position.y].add(position.x);
  }
  get center(): Rectangle {
    return Rectangle.of(this.size.center.floor(), new Size(2, 2));
  }
  equals(other: Mapdata): boolean {
    const setEquals =
      <T>(eq: (x: T, y: T) => boolean) =>
      (xs: Set<T>, ys: Set<T>): boolean =>
        xs.size === ys.size && Array.from(xs.values()).every((x) => ys.has(x));
    return (
      this.size.equals(other.size) &&
      Arrays.equals(setEquals((x, y) => x === y))(
        this.horizontalWalls,
        other.horizontalWalls
      ) &&
      Arrays.equals(setEquals((x, y) => x === y))(
        this.verticalWalls,
        other.verticalWalls
      )
    );
  }
}
