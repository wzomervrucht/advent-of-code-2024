export interface Point {
  x: number;
  y: number;
}

export type Direction = '^' | '<' | 'v' | '>';

export interface Position extends Point {
  direction: Direction;
}

const left: Record<Direction, Direction> = {
  '^': '<',
  '<': 'v',
  'v': '>',
  '>': '^'
};

const right: Record<Direction, Direction> = {
  '^': '>',
  '<': '^',
  'v': '<',
  '>': 'v'
};

const offset: Record<Direction, Point> = {
  '^': { x: -1, y: 0 },
  '<': { x: 0, y: -1 },
  'v': { x: 1, y: 0 },
  '>': { x: 0, y: 1 }
};

const offsets = Object.values(offset);

export function turnLeft({ x, y, direction }: Position) {
  return { x, y, direction: left[direction] };
}

export function turnRight({ x, y, direction }: Position) {
  return { x, y, direction: right[direction] };
}

export function forward({ x, y, direction }: Position) {
  const d = offset[direction];
  return { x: x + d.x, y: y + d.y, direction };
}

export function neighbors({ x, y }: Point) {
  return offsets.map(d => ({ x: x + d.x, y: y + d.y }));
}
