import assert from 'node:assert/strict';
import { suite, test } from 'node:test';
import { historianHysteria } from './solution.ts';

suite('day 1', () => {
  // prettier-ignore
  const example = [
    '3   4',
    '4   3',
    '2   5',
    '1   3',
    '3   9',
    '3   3'
  ];

  test('part 1', () => {
    const answer = historianHysteria.solve1(example);
    assert.equal(answer, 11);
  });

  test('part 2', () => {
    const answer = historianHysteria.solve2(example);
    assert.equal(answer, 31);
  });
});
