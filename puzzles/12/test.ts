import assert from 'node:assert/strict';
import { suite, test } from 'node:test';
import { gardenGroups } from './solution.ts';

suite('day 12', () => {
  const example = [
    'RRRRIICCFF',
    'RRRRIICCCF',
    'VVRRRCCFFF',
    'VVRCCCJFFF',
    'VVVVCJJCFE',
    'VVIVCCJJEE',
    'VVIIICJJEE',
    'MIIIIIJJEE',
    'MIIISIJEEE',
    'MMMISSJEEE'
  ];

  test('part 1', () => {
    const answer = gardenGroups.solve1(example);
    assert.equal(answer, 1930);
  });

  test('part 2', () => {
    const answer = gardenGroups.solve2(example);
    assert.equal(answer, 1206);
  });
});
