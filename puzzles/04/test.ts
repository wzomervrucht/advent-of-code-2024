import assert from 'node:assert/strict';
import { suite, test } from 'node:test';
import { ceresSearch } from './solution.ts';

suite('day 4', () => {
  const example = [
    'MMMSXXMASM',
    'MSAMXMSMSA',
    'AMXSXMAAMM',
    'MSAMASMSMX',
    'XMASAMXAMM',
    'XXAMMXXAMA',
    'SMSMSASXSS',
    'SAXAMASAAA',
    'MAMMMXMMMM',
    'MXMXAXMASX'
  ];

  test('part 1', () => {
    const answer = ceresSearch.solve1(example);
    assert.equal(answer, 18);
  });

  test('part 2', () => {
    const answer = ceresSearch.solve2(example);
    assert.equal(answer, 9);
  });
});
