import assert from 'node:assert/strict';
import { suite, test } from 'node:test';
import { monkeyMarket } from './solution.ts';

suite('day 22', () => {
  test('part 1', () => {
    // prettier-ignore
    const example = [
      '1',
      '10',
      '100',
      '2024'
    ];
    const answer = monkeyMarket.solve1(example);
    assert.equal(answer, 37327623);
  });

  test('part 2', () => {
    // prettier-ignore
    const example = [
      '1',
      '2',
      '3',
      '2024'
    ];
    const answer = monkeyMarket.solve2(example);
    assert.equal(answer, 23);
  });
});
