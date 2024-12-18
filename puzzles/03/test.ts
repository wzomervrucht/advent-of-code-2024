import assert from 'node:assert/strict';
import { suite, test } from 'node:test';
import { mullItOver } from './solution.ts';

suite('day 3', () => {
  test('part 1', () => {
    const example = ['xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))'];
    const answer = mullItOver.solve1(example);
    assert.equal(answer, 161);
  });

  test('part 2', () => {
    const example = ["xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"];
    const answer = mullItOver.solve2(example);
    assert.equal(answer, 48);
  });
});
