import assert from 'node:assert/strict';
import { suite, test } from 'node:test';
import { bridgeRepair } from './solution.ts';

suite('day 7', () => {
  const example = [
    '190: 10 19',
    '3267: 81 40 27',
    '83: 17 5',
    '156: 15 6',
    '7290: 6 8 6 15',
    '161011: 16 10 13',
    '192: 17 8 14',
    '21037: 9 7 18 13',
    '292: 11 6 16 20'
  ];

  test('part 1', () => {
    const answer = bridgeRepair.solve1(example);
    assert.equal(answer, 3749);
  });

  test('part 2', () => {
    const answer = bridgeRepair.solve2(example);
    assert.equal(answer, 11387);
  });
});
