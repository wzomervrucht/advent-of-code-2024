import assert from 'node:assert/strict';
import { suite, test } from 'node:test';
import { chronospatialComputer } from './solution.ts';

suite('day 17', () => {
  test('part 1', () => {
    // prettier-ignore
    const example = [
      'Register A: 729',
      'Register B: 0',
      'Register C: 0',
      '',
      'Program: 0,1,5,4,3,0'
    ];
    const answer = chronospatialComputer.solve1(example);
    assert.equal(answer, '4,6,3,5,6,3,5,2,1,0');
  });

  test('part 2', () => {
    // prettier-ignore
    const example = [
      'Register A: 2024',
      'Register B: 0',
      'Register C: 0',
      '',
      'Program: 0,3,5,4,3,0'
    ];
    const answer = chronospatialComputer.solve2(example);
    assert.equal(answer, 117440);
  });
});
