import assert from 'node:assert/strict';
import { suite, test } from 'node:test';
import { codeChronicle } from './solution.ts';

suite('day 25', () => {
  test('part 1', () => {
    const example = [
      '#####',
      '.####',
      '.####',
      '.####',
      '.#.#.',
      '.#...',
      '.....',
      '',
      '#####',
      '##.##',
      '.#.##',
      '...##',
      '...#.',
      '...#.',
      '.....',
      '',
      '.....',
      '#....',
      '#....',
      '#...#',
      '#.#.#',
      '#.###',
      '#####',
      '',
      '.....',
      '.....',
      '#.#..',
      '###..',
      '###.#',
      '###.#',
      '#####',
      '',
      '.....',
      '.....',
      '.....',
      '#....',
      '#.#..',
      '#.#.#',
      '#####'
    ];
    const answer = codeChronicle.solve1(example);
    assert.equal(answer, 3);
  });
});
