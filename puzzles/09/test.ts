import assert from 'node:assert/strict';
import { suite, test } from 'node:test';
import { diskFragmenter } from './solution.ts';

suite('day 9', () => {
  const example = ['2333133121414131402'];

  test('part 1', () => {
    const answer = diskFragmenter.solve1(example);
    assert.equal(answer, 1928);
  });

  test('part 2', () => {
    const answer = diskFragmenter.solve2(example);
    assert.equal(answer, 2858);
  });
});
