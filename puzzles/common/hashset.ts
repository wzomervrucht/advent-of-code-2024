import type { Point, Position } from './point.ts';

export abstract class HashSet<T> {
  private set: Set<string>;

  constructor(values?: Iterable<T>) {
    this.set = new Set(this.hashMap(values ?? []));
  }

  has(value: T) {
    return this.set.has(this.hash(value));
  }

  add(value: T) {
    this.set.add(this.hash(value));
  }

  protected abstract hash(value: T): string;

  private *hashMap(values: Iterable<T>) {
    for (const value of values) {
      yield this.hash(value);
    }
  }
}

export class PointSet extends HashSet<Point> {
  protected hash({ x, y }: Point) {
    return `${x},${y}`;
  }
}

export class PositionSet extends HashSet<Position> {
  protected hash({ x, y, direction }: Position) {
    return `${x},${y},${direction}`;
  }
}
