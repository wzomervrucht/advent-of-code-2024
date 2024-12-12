import { run } from './puzzles/run.ts';

run().catch((error: unknown) => {
  console.log(error instanceof Error ? error.message : 'Error');
  process.exit(1);
});
