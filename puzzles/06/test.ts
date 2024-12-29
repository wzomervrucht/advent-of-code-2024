import assert from 'node:assert/strict';
import { suite, test } from 'node:test';
import { guardGallivant } from './solution.ts';

suite('day 6', () => {
  const example = [
    '....#.....',
    '.........#',
    '..........',
    '..#.......',
    '.......#..',
    '..........',
    '.#..^.....',
    '........#.',
    '#.........',
    '......#...'
  ];

  test('part 1', () => {
    const answer = guardGallivant.solve1(example);
    assert.equal(answer, 41);
  });

  test('part 2', () => {
    const answer = guardGallivant.solve2(example);
    assert.equal(answer, 6);
  });
});
