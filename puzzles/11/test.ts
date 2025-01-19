import assert from 'node:assert/strict';
import { suite, test } from 'node:test';
import { plutonianPebbles } from './solution.ts';

suite('day 11', () => {
  test('part 1', () => {
    const example = ['125 17'];
    const answer = plutonianPebbles.solve1(example);
    assert.equal(answer, 55312);
  });
});
