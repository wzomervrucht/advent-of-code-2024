import assert from 'node:assert/strict';
import { suite, test } from 'node:test';
import { restroomRedoubt } from './solution.ts';

suite('day 14', () => {
  test('part 1', () => {
    const example = [
      'p=0,4 v=3,-3',
      'p=6,3 v=-1,-3',
      'p=10,3 v=-1,2',
      'p=2,0 v=2,-1',
      'p=0,0 v=1,3',
      'p=3,0 v=-2,-2',
      'p=7,6 v=-1,-3',
      'p=3,0 v=-1,-2',
      'p=9,3 v=2,3',
      'p=7,3 v=-1,2',
      'p=2,4 v=2,-3',
      'p=9,5 v=-3,-3'
    ];
    const config = {
      size: { x: 11, y: 7 }
    };
    const answer = restroomRedoubt.solve1(example, config);
    assert.equal(answer, 12);
  });
});
