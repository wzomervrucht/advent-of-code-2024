import { join } from 'node:path';
import { assert } from '../common/assert.ts';
import { Grid } from '../common/grid.ts';
import { PositionSet } from '../common/hashset.ts';
import { forward, turnRight, type Position } from '../common/point.ts';
import type { Puzzle } from '../puzzle.ts';

function solve1(input: string[]) {
  const grid = getGrid(input);
  const start = getStart(input);
  let count = 0;
  for (const position of getPath(grid, start)) {
    if (grid.get(position) !== 'X') {
      count++;
      grid.set(position, 'X');
    }
  }
  return count;
}

function solve2(input: string[]) {
  const grid = getGrid(input);
  const start = getStart(input);
  let count = 0;
  let previous = start;
  for (const position of getPath(grid, start)) {
    if (grid.get(position) === '.') {
      grid.set(position, '#');
      isLooping(grid, previous) && count++;
      grid.set(position, 'X');
    }
    previous = position;
  }
  return count;
}

function getGrid(input: string[]) {
  assert(input.every(line => line.length === input[0]!.length));
  return Grid.from(input);
}

function getStart(input: string[]): Position {
  assert(input.join('').match(/^[.#]*\^[.#]*$/));
  const x = input.findIndex(line => line.includes('^'));
  const y = input[x]!.indexOf('^');
  return { x, y, direction: '^' };
}

function* getPath(grid: Grid<string>, start: Position) {
  const visited = new PositionSet();
  let position = start;
  while (grid.has(position)) {
    assert(!visited.has(position));
    visited.add(position);
    yield position;
    position = getNext(grid, position);
  }
}

function isLooping(grid: Grid<string>, start: Position) {
  const visited = new PositionSet();
  let position = start;
  while (grid.has(position) && !visited.has(position)) {
    visited.add(position);
    position = getNext(grid, position);
  }
  return visited.has(position);
}

function getNext(grid: Grid<string>, position: Position) {
  const next = forward(position);
  return grid.get(next) === '#' ? turnRight(position) : next;
}

export const guardGallivant: Puzzle = {
  day: 6,
  title: 'Guard Gallivant',
  input: join(import.meta.dirname, 'input.txt'),
  solve1,
  solve2,
  answer1: 4665,
  answer2: 1688
};
