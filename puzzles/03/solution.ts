import { join } from 'node:path';
import { sum } from '../common/util.ts';
import type { Puzzle } from '../puzzle.ts';

function solve1(input: string[]) {
  return sum(input.flatMap(getProducts));
}

function solve2(input: string[]) {
  const instructions = input.flatMap(getInstructions);
  let enabled = true;
  return instructions.reduce<number>((result, instruction) => {
    if (typeof instruction === 'boolean') {
      enabled = instruction;
      return result;
    }
    return enabled ? result + instruction : result;
  }, 0);
}

function getProducts(line: string) {
  const matches = [...line.matchAll(/mul\((?<x>\d{1,3}),(?<y>\d{1,3})\)/g)];
  return matches.map(match => {
    const groups = match.groups as { x: string; y: string };
    return parseInt(groups.x) * parseInt(groups.y);
  });
}

function getInstructions(line: string) {
  const matches = [...line.matchAll(/do\(\)|don't\(\)|mul\((?<x>\d{1,3}),(?<y>\d{1,3})\)/g)];
  return matches.map(match => {
    if (match[0] === 'do()') {
      return true;
    }
    if (match[0] === "don't()") {
      return false;
    }
    const groups = match.groups as { x: string; y: string };
    return parseInt(groups.x) * parseInt(groups.y);
  });
}

export const mullItOver: Puzzle = {
  day: 3,
  title: 'Mull It Over',
  input: join(import.meta.dirname, 'input.txt'),
  solve1,
  solve2,
  answer1: 188192787,
  answer2: 113965544
};
