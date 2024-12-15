import assert from 'node:assert/strict';
import { suite, test } from 'node:test';
import { redNosedReports } from './solution.ts';

suite('day 2', () => {
  // prettier-ignore
  const example = [
    '7 6 4 2 1',
    '1 2 7 8 9',
    '9 7 6 2 1',
    '1 3 2 4 5',
    '8 6 4 4 1',
    '1 3 6 7 9'
  ];

  test('part 1', () => {
    const answer = redNosedReports.solve1(example);
    assert.equal(answer, 2);
  });

  test('part 2', () => {
    const answer = redNosedReports.solve2(example);
    assert.equal(answer, 4);
  });
});
