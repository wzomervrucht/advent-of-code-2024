import { join } from 'node:path';
import { assert } from '../common/assert.ts';
import { PointSet } from '../common/hashset.ts';
import type { Point } from '../common/point.ts';
import { pairs } from '../common/util.ts';
import type { Puzzle } from '../puzzle.ts';

function solve1(input: string[]) {
  const size = getSize(input);
  const antennas = getAntennas(input, size);
  return getAntinodesV1(antennas, size).size;
}

function solve2(input: string[]) {
  const size = getSize(input);
  const antennas = getAntennas(input, size);
  return getAntinodesV2(antennas, size).size;
}

function getSize(input: string[]) {
  assert(input.every(line => line.length === input[0]!.length));
  return {
    x: input.length,
    y: input[0]?.length ?? 0
  };
}

function getAntennas(input: string[], size: Point) {
  const antennas = new Map<string, Point[]>();
  for (let x = 0; x < size.x; x++) {
    for (let y = 0; y < size.y; y++) {
      const frequency = input[x]![y]!;
      if (frequency !== '.') {
        antennas.has(frequency) || antennas.set(frequency, []);
        antennas.get(frequency)!.push({ x, y });
      }
    }
  }
  return antennas;
}

function getAntinodesV1(antennas: Map<string, Point[]>, size: Point) {
  const antinodes = new PointSet();
  for (const frequencyGroup of antennas.values()) {
    for (const [p, q] of pairs(frequencyGroup)) {
      const antinode1 = { x: 2 * q.x - p.x, y: 2 * q.y - p.y };
      const antinode2 = { x: 2 * p.x - q.x, y: 2 * p.y - q.y };
      isInRange(antinode1, size) && antinodes.add(antinode1);
      isInRange(antinode2, size) && antinodes.add(antinode2);
    }
  }
  return antinodes;
}

function getAntinodesV2(antennas: Map<string, Point[]>, size: Point) {
  const antinodes = new PointSet();
  for (const frequencyGroup of antennas.values()) {
    for (const [p, q] of pairs(frequencyGroup)) {
      const d = { x: q.x - p.x, y: q.y - p.y };
      let antinode = q;
      while (isInRange(antinode, size)) {
        antinodes.add(antinode);
        antinode = { x: antinode.x + d.x, y: antinode.y + d.y };
      }
      antinode = p;
      while (isInRange(antinode, size)) {
        antinodes.add(antinode);
        antinode = { x: antinode.x - d.x, y: antinode.y - d.y };
      }
    }
  }
  return antinodes;
}

function isInRange({ x, y }: Point, size: Point) {
  return 0 <= x && x < size.x && 0 <= y && y < size.y;
}

export const resonantCollinearity: Puzzle = {
  day: 8,
  title: 'Resonant Collinearity',
  input: join(import.meta.dirname, 'input.txt'),
  solve1,
  solve2,
  answer1: 293,
  answer2: 934
};
