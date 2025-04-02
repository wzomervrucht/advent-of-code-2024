import { join } from 'node:path';
import { assert } from '../common/assert.ts';
import { Grid } from '../common/grid.ts';
import { PointSet } from '../common/hashset.ts';
import { neighbors, type Point } from '../common/point.ts';
import { sum } from '../common/util.ts';
import type { Puzzle } from '../puzzle.ts';

function solve1(input: string[]) {
  const map = parseMap(input);
  const trailheads = getTrailheads(map);
  const scores = trailheads.map(p => getScore(map, p));
  return sum(scores);
}

function solve2(input: string[]) {
  const map = parseMap(input);
  const trailheads = getTrailheads(map);
  const ratings = trailheads.map(p => getRating(map, p));
  return sum(ratings);
}

function parseMap(input: string[]) {
  assert(input.every(line => line.length === input[0]!.length));
  assert(input.every(line => line.match(/^\d*$/)));
  return Grid.from(input).map(n => ({ height: parseInt(n) }));
}

function getTrailheads(map: Grid<Square>) {
  const trailheads: Point[] = [];
  map.forEach((square, point) => square.height || trailheads.push(point));
  return trailheads;
}

function getScore(map: Grid<Square>, p: Point) {
  return new PointSet(getEndpoints(map, p)).size;
}

function getEndpoints(map: Grid<Square>, p: Point): Point[] {
  const square = map.get(p)!;
  if (!square.endpoints) {
    if (square.height === 9) {
      square.endpoints = [p];
    } else {
      square.endpoints = getNext(map, p).flatMap(q => getEndpoints(map, q));
    }
  }
  return square.endpoints;
}

function getRating(map: Grid<Square>, p: Point) {
  const square = map.get(p)!;
  if (square.rating === undefined) {
    if (square.height === 9) {
      square.rating = 1;
    } else {
      const ratings = getNext(map, p).map(q => getRating(map, q));
      square.rating = sum(ratings);
    }
  }
  return square.rating;
}

function getNext(map: Grid<Square>, p: Point) {
  return neighbors(p).filter(q => map.get(q)?.height === map.get(p)!.height + 1);
}

interface Square {
  height: number;
  endpoints?: Point[];
  rating?: number;
}

export const hoofIt: Puzzle = {
  day: 10,
  title: 'Hoof It',
  input: join(import.meta.dirname, 'input.txt'),
  solve1,
  solve2
};
