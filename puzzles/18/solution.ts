import { join } from 'node:path';
import { assert } from '../common/assert.ts';
import { Grid } from '../common/grid.ts';
import { PointSet } from '../common/hashset.ts';
import { neighbors, type Point } from '../common/point.ts';
import type { Puzzle } from '../puzzle.ts';

function solve1(input: string[], config?: RamRunConfig) {
  const size = config?.size ?? 70;
  const count = config?.count ?? 1024;
  const bytes = input.map(parseByte);
  const { grid, start, end } = getSetup(size, bytes);
  return countSteps(grid, start, end, count);
}

function solve2(input: string[], config?: RamRunConfig) {
  const size = config?.size ?? 70;
  const bytes = input.map(parseByte);
  const { grid, start, end } = getSetup(size, bytes);
  let min = 0;
  let max = bytes.length;
  assert(!isConnected(grid, start, end, max));
  while (max - min > 1) {
    const mid = Math.floor((max + min) / 2);
    [min, max] = isConnected(grid, start, end, mid) ? [mid, max] : [min, mid];
  }
  const { x, y } = bytes[max - 1]!;
  return `${x},${y}`;
}

function parseByte(line: string) {
  const match = line.match(/^(?<x>\d+),(?<y>\d+)$/);
  assert(match);
  const groups = match.groups as { x: string; y: string };
  return { x: parseInt(groups.x), y: parseInt(groups.y) };
}

function getSetup(size: number, bytes: Point[]) {
  const grid = new Grid({ x: size + 1, y: size + 1 }, () => Infinity);
  bytes.forEach((p, n) => {
    assert(grid.has(p));
    grid.set(p, n + 1);
  });
  return {
    grid,
    start: { x: 0, y: 0 },
    end: { x: size, y: size }
  };
}

function countSteps(grid: Grid<number>, start: Point, end: Point, threshold: number) {
  const distance = getDistance(grid, start, end, threshold);
  assert(distance < Infinity);
  return distance;
}

function isConnected(grid: Grid<number>, start: Point, end: Point, threshold: number) {
  return getDistance(grid, start, end, threshold) < Infinity;
}

function getDistance(grid: Grid<number>, start: Point, end: Point, threshold: number) {
  const visited = new PointSet([start]);
  let points = [start];
  let distance = 0;
  while (points.length) {
    if (points.some(p => p.x === end.x && p.y === end.y)) {
      return distance;
    }
    points = points.flatMap(p => {
      const next = neighbors(p).filter(q => grid.has(q) && grid.get(q)! > threshold && !visited.has(q));
      next.forEach(q => visited.add(q));
      return next;
    });
    distance++;
  }
  return Infinity;
}

export interface RamRunConfig {
  size: number;
  count: number;
}

export const ramRun: Puzzle<RamRunConfig> = {
  day: 18,
  title: 'RAM Run',
  input: join(import.meta.dirname, 'input.txt'),
  solve1,
  solve2,
  answer1: 310,
  answer2: '16,46'
};
