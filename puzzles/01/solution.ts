import assert from 'node:assert/strict';
import { join } from 'node:path';
import { sum } from '../common/numbers.ts';
import type { Puzzle } from '../puzzle.ts';

function solve1(input: string[]) {
  const lines = input.map(parseLine);
  const left = lines.map(line => line.left).sort((x, y) => x - y);
  const right = lines.map(line => line.right).sort((x, y) => x - y);
  const distances = lines.map((_, i) => Math.abs(left[i]! - right[i]!));
  return sum(distances);
}

function solve2(input: string[]) {
  const lines = input.map(parseLine);
  const left = lines.map(line => line.left);
  const right = lines.map(line => line.right);
  const similarities = left.map(l => l * right.filter(r => l === r).length);
  return sum(similarities);
}

function parseLine(line: string) {
  const match = line.match(/^(?<left>\d+) +(?<right>\d+)$/);
  assert(match);
  const groups = match.groups as { left: string; right: string };
  return { left: parseInt(groups.left), right: parseInt(groups.right) };
}

export const historianHysteria: Puzzle = {
  day: 1,
  title: 'Historian Hysteria',
  input: join(import.meta.dirname, 'input.txt'),
  solve1,
  solve2,
  answer1: 1722302,
  answer2: 20373490
};
