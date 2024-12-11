import { readFile } from 'node:fs/promises';
import type { Puzzle } from './common/puzzle.ts';

export async function run(puzzle: Puzzle, part?: 1 | 2, input?: string) {
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
