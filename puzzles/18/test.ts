import assert from 'node:assert/strict';
import { suite, test } from 'node:test';
import { ramRun } from './solution.ts';

suite('day 18', () => {
  const example = [
    '5,4',
    '4,2',
    '4,5',
    '3,0',
    '2,1',
    '6,3',
    '2,4',
    '1,5',
    '0,6',
    '3,3',
    '2,6',
    '5,1',
    '1,2',
    '5,5',
    '2,5',
    '6,5',
    '1,4',
    '0,4',
    '6,4',
    '1,1',
    '6,1',
    '1,0',
    '0,5',
    '1,6',
    '2,0'
  ];
  const config = {
    size: 6,
    count: 12
  };

  test('part 1', () => {
    const answer = ramRun.solve1(example, config);
    assert.equal(answer, 22);
  });

  test('part 2', () => {
    const answer = ramRun.solve2(example, config);
    assert.equal(answer, '6,1');
  });
});
