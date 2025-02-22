import assert from 'node:assert/strict';
import { suite, test } from 'node:test';
import { reindeerMaze } from './solution.ts';

suite('day 16', () => {
  const example1 = [
    '###############',
    '#.......#....E#',
    '#.#.###.#.###.#',
    '#.....#.#...#.#',
    '#.###.#####.#.#',
    '#.#.#.......#.#',
    '#.#.#####.###.#',
    '#...........#.#',
    '###.#.#####.#.#',
    '#...#.....#.#.#',
    '#.#.#.###.#.#.#',
    '#.....#...#.#.#',
    '#.###.#.#.#.#.#',
    '#S..#.....#...#',
    '###############'
  ];

  const example2 = [
    '#################',
    '#...#...#...#..E#',
    '#.#.#.#.#.#.#.#.#',
    '#.#.#.#...#...#.#',
    '#.#.#.#.###.#.#.#',
    '#...#.#.#.....#.#',
    '#.#.#.#.#.#####.#',
    '#.#...#.#.#.....#',
    '#.#.#####.#.###.#',
    '#.#.#.......#...#',
    '#.#.###.#####.###',
    '#.#.#...#.....#.#',
    '#.#.#.#####.###.#',
    '#.#.#.........#.#',
    '#.#.#.#########.#',
    '#S#.............#',
    '#################'
  ];

  suite('part 1', () => {
    test('example 1', () => {
      const answer = reindeerMaze.solve1(example1);
      assert.equal(answer, 7036);
    });

    test('example 2', () => {
      const answer = reindeerMaze.solve1(example2);
      assert.equal(answer, 11048);
    });
  });

  suite('part 2', () => {
    test('example 1', () => {
      const answer = reindeerMaze.solve2(example1);
      assert.equal(answer, 45);
    });

    test('example 2', () => {
      const answer = reindeerMaze.solve2(example2);
      assert.equal(answer, 64);
    });
  });
});
