import { readFile } from 'node:fs/promises';
import { parseArgs } from 'node:util';
import type { Puzzle } from './puzzle.ts';
import { puzzles } from './puzzles.ts';

export async function run() {
  const { values } = parseArgs({
    options: {
      day: { short: 'd', type: 'string' },
      part: { short: 'p', type: 'string' },
      input: { short: 'i', type: 'string' }
    }
  });

  if (!values.day) {
    values.part && throwError("Option '-p, --part' not allowed without option '-d, --day'");
    values.input && throwError("Option '-i, --input' not allowed without option '-d, --day'");
    await runAll();
  } else {
    const day = parseDay(values.day);
    const part = parsePart(values.part);
    await runDay(day, part, values.input);
  }
}

function parseDay(day: string) {
  day.match(/^\d+$/) ?? throwError(`Invalid argument '${day}' for option '-d, --day'`);
  return parseInt(day);
}

function parsePart(part?: string) {
  if (part) {
    part.match(/^[12]$/) ?? throwError(`Invalid argument '${part}' for option '-p, --part'`);
    return parseInt(part) as 1 | 2;
  }
  return undefined;
}

export async function runAll() {
  for (const puzzle of puzzles) {
    // eslint-disable-next-line no-await-in-loop
    await runPuzzle(puzzle);
  }
}

export async function runDay(day: number, part?: 1 | 2, input?: string) {
  const puzzle = getPuzzle(day);
  await runPuzzle(puzzle, part, input);
}

function getPuzzle(day: number) {
  const puzzle = puzzles.find(p => p.day === day);
  return puzzle ?? throwError(`No puzzle found for day ${day}`);
}

async function runPuzzle(puzzle: Puzzle, part?: 1 | 2, input?: string) {
  const lines = await getInput(input ?? puzzle.input);
  if (part) {
    const solve = part === 1 ? puzzle.solve1 : puzzle.solve2;
    console.log(solve(lines));
  } else {
    console.log(`Day ${puzzle.day}: ${puzzle.title}`);
    console.log(`Part One: ${puzzle.solve1(lines)}`);
    console.log(`Part Two: ${puzzle.solve2(lines)}`);
  }
}

async function getInput(file: string) {
  const input = await readFile(file, { encoding: 'utf8' });
  input.includes('\r') && throwError('Input file should have LF line endings');
  input.endsWith('\n') || throwError('Input file should include a final newline');
  return input.slice(0, -1).split('\n');
}

function throwError(message?: string): never {
  throw new Error(message);
}
