import assert from 'node:assert/strict';
import { suite, test } from 'node:test';
import { linenLayout } from './solution.ts';

suite('day 19', () => {
  const example = [
    'r, wr, b, g, bwu, rb, gb, br',
    '',
    'brwrr',
    'bggr',
    'gbbr',
    'rrbgbr',
    'ubwu',
    'bwurrg',
    'brgr',
    'bbrgwb'
  ];

  test('part 1', () => {
    const answer = linenLayout.solve1(example);
    assert.equal(answer, 6);
  });

  test('part 2', () => {
    const answer = linenLayout.solve2(example);
    assert.equal(answer, 16);
  });
});
