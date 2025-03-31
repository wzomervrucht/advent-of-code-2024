import { join } from 'node:path';
import { assert } from '../common/assert.ts';
import { Grid } from '../common/grid.ts';
import { forward, neighbors, turnLeft, turnRight, type Point, type Position } from '../common/point.ts';
import { sum } from '../common/util.ts';
import type { Puzzle } from '../puzzle.ts';

function solve1(input: string[]) {
  const map = parseMap(input);
  const regions = getRegions(map);
  return sum(regions.map(getPrice));
}

function solve2(input: string[]) {
  const map = parseMap(input);
  const regions = getRegions(map);
  return sum(regions.map(getDiscountPrice));
}

function parseMap(input: string[]) {
  assert(input.every(line => line.length === input[0]!.length));
  return Grid.from(input);
}

function getRegions(map: Grid<string>) {
  const regions: Point[][] = [];
  const visited = map.map(() => false);
  map.forEach((plant, point) => {
    if (!visited.get(point)) {
      visited.set(point, true);
      const region = [point];
      const queue = [point];
      while (queue.length) {
        const p = queue.pop()!;
        const next = neighbors(p).filter(q => !visited.get(q) && map.get(q) === plant);
        next.forEach(q => visited.set(q, true));
        region.push(...next);
        queue.push(...next);
      }
      regions.push(region);
    }
  });
  return regions;
}

function getPrice(region: Point[]) {
  const area = region.length;
  const perimeter = getFences(region).length;
  return area * perimeter;
}

function getDiscountPrice(region: Point[]) {
  const area = region.length;
  const fences = getFences(region);
  const sides = getSides(fences).length;
  return area * sides;
}

function getFences(region: Point[]) {
  return region.flatMap(p => neighbors(p).filter(q => !hasPoint(region, q)));
}

function getSides(fences: Position[]) {
  return fences.filter(fence => !hasPosition(fences, turnLeft(forward(turnRight(fence)))));
}

function hasPoint(points: Point[], p: Point) {
  return points.some(q => q.x === p.x && q.y === p.y);
}

function hasPosition(positions: Position[], p: Position) {
  return positions.some(q => q.x === p.x && q.y === p.y && q.direction === p.direction);
}

export const gardenGroups: Puzzle = {
  day: 12,
  title: 'Garden Groups',
  input: join(import.meta.dirname, 'input.txt'),
  solve1,
  solve2
};
