import { join } from 'node:path';
import { assert } from '../common/assert.ts';
import { Grid } from '../common/grid.ts';
import { PositionMap } from '../common/hashmap.ts';
import { PointSet, PositionSet } from '../common/hashset.ts';
import { forward, turnBack, turnLeft, turnRight, type Position } from '../common/point.ts';
import { Queue } from '../common/queue.ts';
import type { Puzzle } from '../puzzle.ts';

function solve1(input: string[]) {
  const map = getGrid(input);
  const start = getStart(input);
  const queue = getQueue(start);
  const visited = new PositionSet();
  let position = queue.pop();
  while (position) {
    if (map.get(position) === 'E') {
      return position.score;
    }
    if (!visited.has(position)) {
      visited.add(position);
      queue.push(...getNext(position, map));
    }
    position = queue.pop();
  }
  assert.fail();
}

function solve2(input: string[]) {
  const map = getGrid(input);
  const start = getStart(input);
  const queue = getQueue(start);
  const visited = new PositionMap<number>();
  const seats = new PointSet();
  let minScore = Infinity;
  let position = queue.pop();
  while (position && position.score <= minScore) {
    if (map.get(position) === 'E') {
      addSeats(seats, position);
      minScore = position.score;
    }
    visited.has(position) || visited.set(position, position.score);
    if (visited.get(position) === position.score) {
      queue.push(...getNext(position, map));
    }
    position = queue.pop();
  }
  assert(minScore < Infinity);
  return seats.size;
}

function getGrid(input: string[]) {
  assert(input.every(line => line.length === input[0]!.length));
  assert(input.every(line => line.startsWith('#') && line.endsWith('#')));
  assert(input[0]?.match(/^#+$/) && input.at(-1)?.match(/^#+$/));
  return Grid.from(input);
}

function getStart(input: string[]): Position {
  assert(input.join('').match(/^[.#]*(?:S[.#]*E|E[.#]*S)[.#]*$/));
  const x = input.findIndex(line => line.includes('S'));
  const y = input[x]!.indexOf('S');
  return { x, y, direction: '>' };
}

function getQueue(start: Position) {
  return new Queue(compare, [
    { ...start, score: 0 },
    { ...turnLeft(start), score: 1000 },
    { ...turnRight(start), score: 1000 },
    { ...turnBack(start), score: 2000 }
  ]);
}

function getNext(position: ScoredPosition, map: Grid<string>) {
  const next = forward(position);
  return map.get(next) !== '#'
    ? [
        { ...next, score: position.score + 1, previous: position },
        { ...turnLeft(next), score: position.score + 1001, previous: position },
        { ...turnRight(next), score: position.score + 1001, previous: position }
      ]
    : [];
}

function addSeats(seats: PointSet, position: ScoredPosition) {
  seats.add(position);
  position.previous && addSeats(seats, position.previous);
}

function compare(a: ScoredPosition, b: ScoredPosition) {
  return a.score - b.score;
}

interface ScoredPosition extends Position {
  score: number;
  previous?: ScoredPosition;
}

export const reindeerMaze: Puzzle = {
  day: 16,
  title: 'Reindeer Maze',
  input: join(import.meta.dirname, 'input.txt'),
  solve1,
  solve2
};
