import { join } from 'node:path';
import { assert } from '../common/assert.ts';
import { array, range } from '../common/util.ts';
import type { Puzzle } from '../puzzle.ts';

function solve1(input: string[]) {
  const { locks, keys } = parseSchematics(input);
  let count = 0;
  for (const lock of locks) {
    for (const key of keys) {
      fits(lock, key) && count++;
    }
  }
  return count;
}

function solve2() {
  return 'Deliver the Chronicle';
}

function parseSchematics(input: string[]) {
  assert(input.length % 8 === 7);
  const schematics = array((input.length + 1) / 8, i => {
    assert(!input[8 * i + 7]);
    return parseSchematic(input.slice(8 * i, 8 * i + 7));
  });
  return {
    locks: schematics.filter(s => s.type === 'lock').map(s => s.heights),
    keys: schematics.filter(s => s.type === 'key').map(s => s.heights)
  };
}

function parseSchematic(lines: string[]) {
  assert(lines.every(line => line.length === 5));
  const columns = array(5, i => lines.map(line => line[i]!).join());
  return columns[0]![0]! === '#'
    ? { type: 'lock', heights: parseLock(columns) }
    : { type: 'key', heights: parseKey(columns) };
}

function parseLock(columns: string[]) {
  assert(columns.every(col => col.match(/^#+.+$/)));
  return columns.map(col => col.indexOf('.') - 1);
}

function parseKey(columns: string[]) {
  assert(columns.every(col => col.match(/^.+#+$/)));
  return columns.map(col => 6 - col.indexOf('#'));
}

function fits(lock: number[], key: number[]) {
  return range(5).every(y => lock[y]! + key[y]! <= 5);
}

export const codeChronicle: Puzzle = {
  day: 25,
  title: 'Code Chronicle',
  input: join(import.meta.dirname, 'input.txt'),
  solve1,
  solve2,
  answer1: 3301,
  answer2: 'Deliver the Chronicle'
};
