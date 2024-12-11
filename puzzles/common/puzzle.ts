export interface Puzzle {
  day: number;
  title: string;
  input: string;
  solve1: (input: string[]) => string | number;
  solve2: (input: string[]) => string | number;
  answer1: string | number;
  answer2: string | number;
}
