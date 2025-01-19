import { join } from 'node:path';
import { assert } from '../common/assert.ts';
import { HashMap } from '../common/hashmap.ts';
import { parseIntegers, sum } from '../common/util.ts';
import type { Puzzle } from '../puzzle.ts';

function solve1(input: string[]) {
  const numbers = parseNumbers(input);
  const record = new StoneMap<number>();
  const counts = numbers.map(number => countStones(number, 25, record));
  return sum(counts);
}

function solve2(input: string[]) {
  const numbers = parseNumbers(input);
  const record = new StoneMap<number>();
  const counts = numbers.map(number => countStones(number, 75, record));
  return sum(counts);
}

function parseNumbers(input: string[]) {
  assert(input.length === 1);
  assert(input[0]!.match(/^\d+(?: \d+)*$/));
  return parseIntegers(input[0]!);
}

function countStones(number: number, blinks: number, record: StoneMap<number>) {
  if (record.has({ number, blinks })) {
    return record.get({ number, blinks })!;
  }
  let count: number;
  if (blinks === 0) {
    count = 1;
  } else if (number === 0) {
    count = countStones(1, blinks - 1, record);
  } else {
    const digits = `${number}`;
    if (digits.length % 2 === 0) {
      const left = parseInt(digits.slice(0, digits.length / 2));
      const right = parseInt(digits.slice(digits.length / 2));
      count = countStones(left, blinks - 1, record) + countStones(right, blinks - 1, record);
    } else {
      count = countStones(number * 2024, blinks - 1, record);
    }
  }
  record.set({ number, blinks }, count);
  return count;
}

interface Stone {
  number: number;
  blinks: number;
}

class StoneMap<T> extends HashMap<Stone, T> {
  protected hash({ number, blinks }: Stone) {
    return `${number},${blinks}`;
  }
}

export const plutonianPebbles: Puzzle = {
  day: 11,
  title: 'Plutonian Pebbles',
  input: join(import.meta.dirname, 'input.txt'),
  solve1,
  solve2,
  answer1: 187738,
  answer2: 223767210249237
};
