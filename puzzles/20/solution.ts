import { join } from 'node:path';
import { assert } from '../common/assert.ts';
import { Grid } from '../common/grid.ts';
import { neighbors, type Point } from '../common/point.ts';
import type { Puzzle } from '../puzzle.ts';

function solve1(input: string[], config?: RaceConditionConfig) {
  const grid = getGrid(input);
  const start = getStart(input);
  const distances = getDistances(grid, start);
  const threshold = config?.threshold ?? 100;
  return countCheats(distances, 2, threshold);
}

function solve2(input: string[], config?: RaceConditionConfig) {
  const grid = getGrid(input);
  const start = getStart(input);
  const distances = getDistances(grid, start);
  const threshold = config?.threshold ?? 100;
  return countCheats(distances, 20, threshold);
}

function getGrid(input: string[]) {
  assert(input.every(line => line.length === input[0]!.length));
  assert(input.every(line => line.startsWith('#') && line.endsWith('#')));
  assert(input[0]?.match(/^#+$/) && input.at(-1)?.match(/^#+$/));
  return Grid.from(input);
}

function getStart(input: string[]) {
  assert(input.join('').match(/^[.#]*(?:S[.#]*E|E[.#]*S)[.#]*$/));
  const x = input.findIndex(line => line.includes('S'));
  const y = input[x]!.indexOf('S');
  return { x, y };
}

function getDistances(grid: Grid<string>, start: Point) {
  const distances = grid.map(() => Infinity);
  let point = start;
  let distance = 0;
  distances.set(point, distance);
  while (grid.get(point) !== 'E') {
    point = getNext(point, grid, distances);
    distance++;
    distances.set(point, distance);
  }
  return distances;
}

function getNext(point: Point, grid: Grid<string>, distances: Grid<number>) {
  const next = neighbors(point).filter(q => grid.get(q) !== '#' && distances.get(q) === Infinity);
  assert(next.length === 1);
  return next[0]!;
}

function countCheats(distances: Grid<number>, max: number, threshold: number) {
  let cheats = 0;
  distances.forEach((distanceP, p) => {
    if (distanceP < Infinity) {
      const minX = Math.max(p.x - max, 1);
      const maxX = Math.min(p.x + max, distances.size.x - 2);
      for (let x = minX; x <= maxX; x++) {
        const dx = Math.abs(x - p.x);
        const minY = Math.max(p.y - max + dx, 1);
        const maxY = Math.min(p.y + max - dx, distances.size.y - 2);
        for (let y = minY; y <= maxY; y++) {
          const dy = Math.abs(y - p.y);
          const distanceQ = distances.get({ x, y })!;
          const save = distanceQ - distanceP - dx - dy;
          if (distanceQ < Infinity && save >= threshold) {
            cheats++;
          }
        }
      }
    }
  });
  return cheats;
}

export interface RaceConditionConfig {
  threshold: number;
}

export const raceCondition: Puzzle<RaceConditionConfig> = {
  day: 20,
  title: 'Race Condition',
  input: join(import.meta.dirname, 'input.txt'),
  solve1,
  solve2
};
