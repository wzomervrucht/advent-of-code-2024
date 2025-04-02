import { join } from 'node:path';
import { assert } from '../common/assert.ts';
import { Grid } from '../common/grid.ts';
import { forward, type Direction, type Point, type Position } from '../common/point.ts';
import { sum } from '../common/util.ts';
import type { Puzzle } from '../puzzle.ts';

function solve1(input: string[]) {
  const { map, robot, moves } = parseInput(input, false);
  moveRobot(map, robot, moves);
  const boxes = getBoxes(map);
  return sum(boxes.map(getCoordinate));
}

function solve2(input: string[]) {
  const { map, robot, moves } = parseInput(input, true);
  moveRobot(map, robot, moves);
  const boxes = getBoxes(map);
  return sum(boxes.map(getCoordinate));
}

function parseInput(input: string[], expand: boolean) {
  const blank = input.indexOf('');
  assert(blank >= 0);
  return {
    map: getGrid(input.slice(0, blank), expand),
    robot: getRobot(input.slice(0, blank), expand),
    moves: getMoves(input.slice(blank + 1))
  };
}

function getGrid(lines: string[], expand: boolean) {
  assert(lines.every(line => line.length === lines[0]!.length));
  assert(lines.every(line => line.startsWith('#') && line.endsWith('#')));
  assert(lines[0]?.match(/^#+$/) && lines.at(-1)?.match(/^#+$/));
  return Grid.from(expand ? expandMap(lines) : lines);
}

function expandMap(lines: string[]) {
  return lines.map(line => [...line].map(expandTile).join(''));
}

function expandTile(tile: string) {
  return { '.': '..', '#': '##', 'O': '[]', '@': '@.' }[tile];
}

function getRobot(lines: string[], expand: boolean) {
  assert(lines.join('').match(/^[.#O]*@[.#O]*$/));
  const x = lines.findIndex(line => line.includes('@'));
  const y = lines[x]!.indexOf('@');
  return { x, y: expand ? 2 * y : y };
}

function getMoves(lines: string[]) {
  assert(lines.every(line => line.match(/^[>v<^]*$/)));
  return lines.join('') as Iterable<Direction>;
}

function moveRobot(map: Grid<string>, robot: Point, moves: Iterable<Direction>) {
  let position = robot;
  for (const direction of moves) {
    position = move(map, position, direction);
  }
}

function move(map: Grid<string>, robot: Point, direction: Direction) {
  const moving: Position[] = [];
  let next = [{ ...robot, direction }];
  while (next.length) {
    moving.push(...next);
    next = next.map(forward).filter(p => map.get(p) !== '.');
    if (next.some(p => map.get(p) === '#')) {
      return robot;
    }
    if (['^', 'v'].includes(direction)) {
      [...next].forEach(p => {
        map.get(p) === '[' && next.every(q => q.y !== p.y + 1) && next.push({ ...p, y: p.y + 1 });
        map.get(p) === ']' && next.every(q => q.y !== p.y - 1) && next.push({ ...p, y: p.y - 1 });
      });
    }
  }
  moving.reverse().forEach(p => {
    map.set(forward(p), map.get(p)!);
    map.set(p, '.');
  });
  return forward({ ...robot, direction });
}

function getBoxes(map: Grid<string>) {
  const boxes: Point[] = [];
  map.forEach((value, p) => ['O', '['].includes(value) && boxes.push(p));
  return boxes;
}

function getCoordinate({ x, y }: Point) {
  return 100 * x + y;
}

export const warehouseWoes: Puzzle = {
  day: 15,
  title: 'Warehouse Woes',
  input: join(import.meta.dirname, 'input.txt'),
  solve1,
  solve2
};
