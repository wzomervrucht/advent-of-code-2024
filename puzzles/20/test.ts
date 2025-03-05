import assert from 'node:assert/strict';
import { suite, test } from 'node:test';
import { raceCondition } from './solution.ts';

suite('day 20', () => {
  const example = [
    '###############',
    '#...#...#.....#',
    '#.#.#.#.#.###.#',
    '#S#...#.#.#...#',
    '#######.#.#.###',
    '#######.#.#...#',
    '#######.#.###.#',
    '###..E#...#...#',
    '###.#######.###',
    '#...###...#...#',
    '#.#####.#.###.#',
    '#.#...#.#.#...#',
    '#.#.#.#.#.#.###',
    '#...#...#...###',
    '###############'
  ];

  test('part 1', () => {
    const config = { threshold: 10 };
    const answer = raceCondition.solve1(example, config);
    assert.equal(answer, 10);
  });

  test('part 2', () => {
    const config = { threshold: 50 };
    const answer = raceCondition.solve2(example, config);
    assert.equal(answer, 285);
  });
});
