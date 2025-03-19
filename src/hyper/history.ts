import { Color } from "./color";
import { Direction } from "./direction";
import type { IEqualable } from "./IEqualable";
import type { IStringer } from "./IStringer";
import { Position } from "./position";

export class Record implements IEqualable<Record>, IStringer {
  constructor(
    public color: Color,
    public direction: Direction,
    public start: Position,
    public end: Position
  ) {}
  equals(other: Record): boolean {
    return (
      this.color === other.color &&
      this.direction === other.direction &&
      this.start.equals(other.start) &&
      this.end.equals(other.end)
    );
  }
  toString(): string {
    return `Record{${this.color}, ${this.direction}, ${this.start.toString()}, ${this.end.toString()}}`;
  }
}

export class History implements IStringer {
  #records: Record[];
  #length: number;
  constructor() {
    this.#records = [];
    this.#length = 0;
  }
  push(record: Record): void {
    this.#records = this.#records.slice(0, this.#length);
    this.#records.push(record);
    this.#length++;
  }
  reset(): void {
    this.#length = 0;
  }
  undo(): Record | undefined {
    const record = this.#records.at(this.#length - 1);
    if (!record) {
      return undefined;
    }
    this.#length--;
    return record;
  }
  redo(): Record | undefined {
    const record = this.#records.at(this.#length);
    if (!record) {
      return undefined;
    }
    this.#length++;
    return record;
  }
  get length(): number {
    return this.#length;
  }
  toString(): string {
    return `History{${this.#length}, [${this.#records.map((it) => it.toString()).join(", ")}]}`;
  }
}
