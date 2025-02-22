export interface Point {
  x: number;
  y: number;
}

export const directions = ['^', '<', 'v', '>'] as const;

export type Direction = (typeof directions)[number];

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

const opposite: Record<Direction, Direction> = {
  '^': 'v',
  '<': '>',
  'v': '^',
  '>': '<'
};

const offset: Record<Direction, Point> = {
  '^': { x: -1, y: 0 },
  '<': { x: 0, y: -1 },
  'v': { x: 1, y: 0 },
  '>': { x: 0, y: 1 }
};

export function turnLeft({ x, y, direction }: Position) {
  return { x, y, direction: left[direction] };
}

export function turnRight({ x, y, direction }: Position) {
  return { x, y, direction: right[direction] };
}

export function turnBack({ x, y, direction }: Position) {
  return { x, y, direction: opposite[direction] };
}

export function forward({ x, y, direction }: Position) {
  const d = offset[direction];
  return { x: x + d.x, y: y + d.y, direction };
}

export function neighbors({ x, y }: Point) {
  return directions.map(direction => forward({ x, y, direction }));
}
