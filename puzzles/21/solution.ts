import { join } from 'node:path';
import { assert } from '../common/assert.ts';
import { HashMap } from '../common/hashmap.ts';
import type { Point } from '../common/point.ts';
import { range, sum } from '../common/util.ts';
import type { Puzzle } from '../puzzle.ts';

function solve1(input: string[]) {
  const codes = getCodes(input);
  const counts = getNumPadCounts(2);
  const complexities = codes.map(code => getComplexity(code, counts));
  return sum(complexities);
}

function solve2(input: string[]) {
  const codes = getCodes(input);
  const counts = getNumPadCounts(25);
  const complexities = codes.map(code => getComplexity(code, counts));
  return sum(complexities);
}

function getCodes(input: string[]) {
  assert(input.length === 5);
  return input.map(getCode);
}

function getCode(line: string) {
  assert(line.match(/^\d{3}A$/));
  return { code: line, number: parseInt(line.slice(0, 3)) };
}

function getComplexity(code: Code, counts: PairMap<number>) {
  const length = getCountForKeys(code.code, counts);
  return length * code.number;
}

function getNumPadCounts(robots: number) {
  const dirPaths = getDirKeyPairMap(getDirectionalPaths);
  const numPaths = getNumKeyPairMap(getNumericalPaths);
  let dirCounts = getDirKeyPairMap(() => 1);
  for (let n = 0; n < robots; n++) {
    dirCounts = getDirKeyPairMap(pair => getCount(pair, dirPaths, dirCounts));
  }
  return getNumKeyPairMap(pair => getCount(pair, numPaths, dirCounts));
}

function getDirectionalPaths(pair: Pair) {
  const p = directional.get(pair.a)!;
  const q = directional.get(pair.b)!;
  const d = { x: q.x - p.x, y: q.y - p.y };
  const a = { x: Math.abs(d.x), y: Math.abs(d.y) };
  const v = d.x >= 0 ? 'v' : '^';
  const h = d.y >= 0 ? '>' : '<';
  if (a.x === 0) {
    return [`${h.repeat(a.y)}A`];
  }
  if (a.x === 1) {
    const options = range(a.y + 1).map(i => `${h.repeat(i)}${v}${h.repeat(a.y - i)}A`);
    p.y === 0 && q.x === 0 && options.shift();
    p.x === 0 && q.y === 0 && options.pop();
    return options;
  }
  assert.fail();
}

function getNumericalPaths(pair: Pair) {
  const p = numerical.get(pair.a)!;
  const q = numerical.get(pair.b)!;
  const d = { x: q.x - p.x, y: q.y - p.y };
  const a = { x: Math.abs(d.x), y: Math.abs(d.y) };
  const v = d.x >= 0 ? 'v' : '^';
  const h = d.y >= 0 ? '>' : '<';
  if (a.y === 0) {
    return [`${v.repeat(a.x)}A`];
  }
  if (a.y === 1) {
    const options = range(a.x + 1).map(i => `${v.repeat(i)}${h}${v.repeat(a.x - i)}A`);
    p.x === 3 && q.y === 0 && options.shift();
    p.y === 0 && q.x === 3 && options.pop();
    return options;
  }
  if (a.y === 2) {
    const options = range(a.x + 1).flatMap(i =>
      range(a.x + 1 - i).map(j => `${v.repeat(i)}${h}${v.repeat(j)}${h}${v.repeat(a.x - i - j)}A`)
    );
    p.x === 3 && q.y === 0 && options.shift();
    p.y === 0 && q.x === 3 && options.pop();
    return options;
  }
  assert.fail();
}

function getCount(pair: Pair, paths: PairMap<string[]>, costs: PairMap<number>) {
  const options = paths.get(pair)!;
  const counts = options.map(keys => getCountForKeys(keys, costs));
  return Math.min(...counts);
}

function getCountForKeys(keys: string, costs: PairMap<number>) {
  let count = 0;
  let a = 'A';
  for (const b of keys) {
    count += costs.get({ a, b })!;
    a = b;
  }
  return count;
}

function getDirKeyPairMap<T>(callback: (pair: Pair) => T) {
  return new PairMap(getPairMapEntries(directional, callback));
}

function getNumKeyPairMap<T>(callback: (pair: Pair) => T) {
  return new PairMap(getPairMapEntries(numerical, callback));
}

function* getPairMapEntries<T>(map: Map<string, Point>, callback: (pair: Pair) => T) {
  for (const a of map.keys()) {
    for (const b of map.keys()) {
      yield [{ a, b }, callback({ a, b })] as [Pair, T];
    }
  }
}

const directional = new Map<string, Point>([
  ['A', { x: 0, y: 2 }],
  ['^', { x: 0, y: 1 }],
  ['<', { x: 1, y: 0 }],
  ['v', { x: 1, y: 1 }],
  ['>', { x: 1, y: 2 }]
]);

const numerical = new Map<string, Point>([
  ['A', { x: 3, y: 2 }],
  ['0', { x: 3, y: 1 }],
  ['1', { x: 2, y: 0 }],
  ['2', { x: 2, y: 1 }],
  ['3', { x: 2, y: 2 }],
  ['4', { x: 1, y: 0 }],
  ['5', { x: 1, y: 1 }],
  ['6', { x: 1, y: 2 }],
  ['7', { x: 0, y: 0 }],
  ['8', { x: 0, y: 1 }],
  ['9', { x: 0, y: 2 }]
]);

interface Code {
  code: string;
  number: number;
}

interface Pair {
  a: string;
  b: string;
}

class PairMap<T> extends HashMap<Pair, T> {
  protected hash({ a: from, b: to }: Pair) {
    return `${from},${to}`;
  }
}

export const keypadConundrum: Puzzle = {
  day: 21,
  title: 'Keypad Conundrum',
  input: join(import.meta.dirname, 'input.txt'),
  solve1,
  solve2,
  answer1: 154208,
  answer2: 188000493837892
};
