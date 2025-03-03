import { join } from 'node:path';
import { assert } from '../common/assert.ts';
import { sum } from '../common/util.ts';
import type { Puzzle } from '../puzzle.ts';

function solve1(input: string[]) {
  const { towels, designs } = parseInput(input);
  const possible = designs.filter(design => isPossible(design, towels));
  return possible.length;
}

function solve2(input: string[]) {
  const { towels, designs } = parseInput(input);
  const record = new Map([['', 1]]);
  const options = designs.map(design => countOptions(design, towels, record));
  return sum(options);
}

function parseInput(input: string[]) {
  assert(input[0]?.match(/^[wubrg]+(?:, [wubrg]+)*$/));
  assert(input[1] === '');
  assert(input.slice(2).every(line => line.match(/^[wubrg]+$/)));
  return {
    towels: input[0]!.split(', '),
    designs: input.slice(2)
  };
}

function isPossible(design: string, towels: string[]): boolean {
  return !design.length || towels.some(t => design.startsWith(t) && isPossible(design.slice(t.length), towels));
}

function countOptions(design: string, towels: string[], record: Map<string, number>) {
  if (record.has(design)) {
    return record.get(design)!;
  }
  const start = towels.filter(t => design.startsWith(t));
  const count = sum(start.map(t => countOptions(design.slice(t.length), towels, record)));
  record.set(design, count);
  return count;
}

export const linenLayout: Puzzle = {
  day: 19,
  title: 'Linen Layout',
  input: join(import.meta.dirname, 'input.txt'),
  solve1,
  solve2,
  answer1: 233,
  answer2: 691316989225259
};
