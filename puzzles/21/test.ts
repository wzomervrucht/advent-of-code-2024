import assert from 'node:assert/strict';
import { suite, test } from 'node:test';
import { keypadConundrum } from './solution.ts';

suite('day 21', () => {
  test('part 1', () => {
    // prettier-ignore
    const example = [
      '029A',
      '980A',
      '179A',
      '456A',
      '379A'
    ];
    const answer = keypadConundrum.solve1(example);
    assert.equal(answer, 126384);
  });
});
