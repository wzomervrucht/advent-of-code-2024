export interface Puzzle<in TConfig = never> {
  day: number;
  title: string;
  input: string;
  solve1: (input: string[], config?: TConfig) => string | number;
  solve2: (input: string[], config?: TConfig) => string | number;
}
