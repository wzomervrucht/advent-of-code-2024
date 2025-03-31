import { join } from 'node:path';
import { assert } from '../common/assert.ts';
import { parseIntegers, range } from '../common/util.ts';
import type { Puzzle } from '../puzzle.ts';

function solve1(input: string[]) {
  const reports = input.map(parseReport);
  const safeReports = reports.filter(isSafe);
  return safeReports.length;
}

function solve2(input: string[]) {
  const reports = input.map(parseReport);
  const safeReports = reports.filter(isSafeAfterDamping);
  return safeReports.length;
}

function parseReport(line: string) {
  assert(line.match(/^\d+(?: \d+)*$/));
  return parseIntegers(line);
}

function isSafeAfterDamping(report: number[]) {
  return report.some((_, i) => isSafe(report.toSpliced(i, 1)));
}

function isSafe(report: number[]) {
  const differences = range(report.length - 1).map(i => report[i + 1]! - report[i]!);
  return differences.every(d => 1 <= d && d <= 3) || differences.every(d => -1 >= d && d >= -3);
}

export const redNosedReports: Puzzle = {
  day: 2,
  title: 'Red-Nosed Reports',
  input: join(import.meta.dirname, 'input.txt'),
  solve1,
  solve2
};
