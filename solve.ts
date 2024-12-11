import type { Puzzle } from './puzzles/common/puzzle.ts';
import { run } from './puzzles/run.ts';

declare const puzzle: Puzzle;

run(puzzle).catch((error: unknown) => {
  console.log(error instanceof Error ? error.message : 'Error');
  process.exit(1);
});
