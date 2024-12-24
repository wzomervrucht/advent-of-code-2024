import assert from 'node:assert/strict';
import { join } from 'node:path';
import { array } from '../common/arrays.ts';
import type { Puzzle } from '../puzzle.ts';

function solve1(input: string[]) {
  const size = getSize(input);
  let count = 0;
  for (let x = 0; x < size.x; x++) {
    for (let y = 0; y < size.y; y++) {
      for (const dx of [-1, 0, 1]) {
        for (const dy of [-1, 0, 1]) {
          const word = array(4, i => input[x + i * dx]?.[y + i * dy]).join('');
          if (word === 'XMAS') {
            count++;
          }
        }
      }
    }
  }
  return count;
}

function solve2(input: string[]) {
  const size = getSize(input);
  let count = 0;
  for (let x = 1; x < size.x - 1; x++) {
    for (let y = 1; y < size.y - 1; y++) {
      if (input[x]![y]! === 'A') {
        const diagonal1 = [input[x - 1]![y - 1]!, input[x + 1]![y + 1]!].sort().join('A');
        const diagonal2 = [input[x + 1]![y - 1]!, input[x - 1]![y + 1]!].sort().join('A');
        if (diagonal1 === 'MAS' && diagonal2 === 'MAS') {
          count++;
        }
      }
    }
  }
  return count;
}

function getSize(input: string[]) {
  assert(input.every(line => line.length === input[0]!.length));
  return {
    x: input.length,
    y: input[0]?.length ?? 0
  };
}

export const ceresSearch: Puzzle = {
  day: 4,
  title: 'Ceres Search',
  input: join(import.meta.dirname, 'input.txt'),
  solve1,
  solve2,
  answer1: 2370,
  answer2: 1908
};
