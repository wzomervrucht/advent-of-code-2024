import { join } from 'node:path';
import { assert, assume } from '../common/assert.ts';
import type { Point } from '../common/point.ts';
import { array, sum } from '../common/util.ts';
import type { Puzzle } from '../puzzle.ts';

function solve1(input: string[]) {
  const machines = parseMachines(input);
  const tokens = machines.map(getTokens);
  return sum(tokens);
}

function solve2(input: string[]) {
  const machines = parseMachines(input, 10000000000000);
  const tokens = machines.map(getTokens);
  return sum(tokens);
}

function parseMachines(input: string[], offset = 0) {
  assert(input.length % 4 === 3);
  return array((input.length + 1) / 4, i => {
    const lines = input.slice(4 * i, 4 * i + 4);
    return parseMachine(lines, offset);
  });
}

function parseMachine(lines: string[], offset: number) {
  const matchA = lines[0]!.match(/^Button A: X\+(?<x>\d+), Y\+(?<y>\d+)$/);
  const matchB = lines[1]!.match(/^Button B: X\+(?<x>\d+), Y\+(?<y>\d+)$/);
  const matchPrize = lines[2]!.match(/^Prize: X=(?<x>\d+), Y=(?<y>\d+)$/);
  assert(matchA && matchB && matchPrize && !lines[3]);
  const groupsA = matchA.groups as { x: string; y: string };
  const groupsB = matchB.groups as { x: string; y: string };
  const groupsPrize = matchPrize.groups as { x: string; y: string };
  return {
    a: { x: parseInt(groupsA.x), y: parseInt(groupsA.y) },
    b: { x: parseInt(groupsB.x), y: parseInt(groupsB.y) },
    prize: { x: parseInt(groupsPrize.x) + offset, y: parseInt(groupsPrize.y) + offset }
  };
}

function getTokens({ a, b, prize }: Machine) {
  const d = a.x * b.y - b.x * a.y;
  if (d !== 0) {
    const m = (b.y * prize.x - b.x * prize.y) / d;
    const n = (a.x * prize.y - a.y * prize.x) / d;
    if (m >= 0 && n >= 0 && Number.isInteger(m) && Number.isInteger(n)) {
      return 3 * m + n;
    }
    return 0;
  }
  if (a.x * prize.y !== a.y * prize.x || b.x * prize.y !== b.y * prize.x) {
    return 0;
  }
  assume.fail('Button A, Button B and Prize are collinear');
}

interface Machine {
  a: Point;
  b: Point;
  prize: Point;
}

export const clawContraption: Puzzle = {
  day: 13,
  title: 'Claw Contraption',
  input: join(import.meta.dirname, 'input.txt'),
  solve1,
  solve2
};
