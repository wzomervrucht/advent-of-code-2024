import assert from 'node:assert/strict';
import { suite, test } from 'node:test';
import { hoofIt } from './solution.ts';

suite('day 10', () => {
  // prettier-ignore
  const example = [
    '89010123',
    '78121874',
    '87430965',
    '96549874',
    '45678903',
    '32019012',
    '01329801',
    '10456732'
  ];

  test('part 1', () => {
    const answer = hoofIt.solve1(example);
    assert.equal(answer, 36);
  });

  test('part 2', () => {
    const answer = hoofIt.solve2(example);
    assert.equal(answer, 81);
  });
});
