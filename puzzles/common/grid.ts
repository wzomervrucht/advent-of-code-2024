import type { Point } from './point.ts';
import { array } from './util.ts';

export class Grid<T> {
  private size: Point;
  private grid: T[][];

  constructor(size: Point, callback: (x: number, y: number) => T) {
    this.size = size;
    this.grid = array(size.x, x => array(size.y, y => callback(x, y)));
  }

  has({ x, y }: Point) {
    return 0 <= x && x < this.size.x && 0 <= y && y < this.size.y;
  }

  get({ x, y }: Point) {
    return this.grid[x]?.[y];
  }

  set({ x, y }: Point, value: T) {
    this.grid[x]![y] = value;
  }

  static from(lines: string[]) {
    const size = {
      x: lines.length,
      y: lines[0]?.length ?? 0
    };
    return new Grid(size, (x, y) => lines[x]![y]!);
  }
}
