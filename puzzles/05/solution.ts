import assert from 'node:assert/strict';
import path from 'node:path';
import { parseIntegers, sum } from '../common/numbers.ts';
import type { Puzzle } from '../puzzle.ts';

function solve1(input: string[]) {
  const { rules, updates } = parseInput(input);
  const correct = updates.filter(update => isOrdered(update, rules));
  return sum(correct.map(getMiddlePage));
}

function solve2(input: string[]) {
  const { rules, updates } = parseInput(input);
  const incorrect = updates.filter(update => !isOrdered(update, rules));
  incorrect.forEach(update => order(update, rules));
  return sum(incorrect.map(getMiddlePage));
}

function parseInput(input: string[]) {
  const blank = input.indexOf('');
  assert(blank >= 0);
  return {
    rules: input.slice(0, blank).map(parseRule),
    updates: input.slice(blank + 1).map(parseUpdate)
  };
}

function parseRule(line: string): [number, number] {
  const match = line.match(/^(?<x>\d+)\|(?<y>\d+)$/);
  assert(match);
  const groups = match.groups as { x: string; y: string };
  return [parseInt(groups.x), parseInt(groups.y)];
}

function parseUpdate(line: string) {
  assert(line.match(/^\d+(?:,\d+)*$/));
  return parseIntegers(line);
}

function isOrdered(update: number[], rules: [number, number][]) {
  return rules.every(([x, y]) => {
    const i = update.indexOf(x);
    const j = update.indexOf(y);
    return i < 0 || j < 0 || i < j;
  });
}

function order(update: number[], rules: [number, number][]) {
  update.sort((p, q) => compare(p, q, rules));
  assert(isOrdered(update, rules));
}

function compare(p: number, q: number, rules: [number, number][]) {
  return rules.some(([x, y]) => x === p && y === q) ? -1 : 1;
}

function getMiddlePage(update: number[]) {
  assert(update.length % 2 === 1);
  return update[(update.length - 1) / 2]!;
}

export const printQueue: Puzzle = {
  day: 5,
  title: 'Print Queue',
  input: path.join(import.meta.dirname, 'input.txt'),
  solve1,
  solve2,
  answer1: 4637,
  answer2: 6370
};
