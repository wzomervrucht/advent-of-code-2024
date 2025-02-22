import type { Point, Position } from './point.ts';

export abstract class HashMap<T, U> {
  private map: Map<string, U>;

  constructor(entries?: Iterable<[T, U]>) {
    this.map = new Map(this.hashMap(entries ?? []));
  }

  has(key: T) {
    return this.map.has(this.hash(key));
  }

  get(key: T) {
    return this.map.get(this.hash(key));
  }

  set(key: T, value: U) {
    this.map.set(this.hash(key), value);
  }

  protected abstract hash(value: T): string;

  private *hashMap(entries: Iterable<[T, U]>) {
    for (const [key, value] of entries) {
      yield [this.hash(key), value] as [string, U];
    }
  }
}

export class PointMap<T> extends HashMap<Point, T> {
  protected hash({ x, y }: Point) {
    return `${x},${y}`;
  }
}

export class PositionMap<T> extends HashMap<Position, T> {
  protected hash({ x, y, direction }: Position) {
    return `${x},${y},${direction}`;
  }
}
