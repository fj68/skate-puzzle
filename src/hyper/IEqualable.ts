export interface IEqualable<T> {
  equals(other: T): boolean;
}
