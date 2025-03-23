import { join } from 'node:path';
import { assert } from '../common/assert.ts';
import { add, multiply, parseIntegers, sum } from '../common/util.ts';
import type { Puzzle } from '../puzzle.ts';

function solve1(input: string[]) {
  const equations = input.map(parseEquation);
  const solvables = equations.filter(isSolvableV1);
  return sum(solvables.map(equation => equation.value));
}

function solve2(input: string[]) {
  const equations = input.map(parseEquation);
  const solvables = equations.filter(isSolvableV2);
  return sum(solvables.map(equation => equation.value));
}

function parseEquation(line: string) {
  const match = line.match(/^(?<value>\d+):(?<numbers>(?: \d+)+)$/);
  assert(match);
  const groups = match.groups as { value: string; numbers: string };
  return { value: parseInt(groups.value), numbers: parseIntegers(groups.numbers) };
}

function isSolvableV1(equation: { value: number; numbers: number[] }) {
  const { value, numbers } = equation;
  const operators = [add, multiply];
  return isSolvable(value, numbers[0]!, numbers.slice(1), operators);
}

function isSolvableV2(equation: { value: number; numbers: number[] }) {
  const { value, numbers } = equation;
  const operators = [add, multiply, concatenate];
  return isSolvable(value, numbers[0]!, numbers.slice(1), operators);
}

function isSolvable(value: number, partial: number, numbers: number[], operators: Operator[]): boolean {
  if (numbers.length === 0) {
    return value === partial;
  }
  const next = numbers[0]!;
  const remaining = numbers.slice(1);
  return operators.some(operator => {
    const result = operator(partial, next);
    return result <= value && isSolvable(value, result, remaining, operators);
  });
}

function concatenate(x: number, y: number) {
  return parseInt(`${x}${y}`);
}

type Operator = (x: number, y: number) => number;

export const bridgeRepair: Puzzle = {
  day: 7,
  title: 'Bridge Repair',
  input: join(import.meta.dirname, 'input.txt'),
  solve1,
  solve2
};
