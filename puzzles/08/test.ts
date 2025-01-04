import assert from 'node:assert/strict';
import { suite, test } from 'node:test';
import { resonantCollinearity } from './solution.ts';

suite('day 8', () => {
  const example = [
    '............',
    '........0...',
    '.....0......',
    '.......0....',
    '....0.......',
    '......A.....',
    '............',
    '............',
    '........A...',
    '.........A..',
    '............',
    '............'
  ];

  test('part 1', () => {
    const answer = resonantCollinearity.solve1(example);
    assert.equal(answer, 14);
  });

  test('part 2', () => {
    const answer = resonantCollinearity.solve2(example);
    assert.equal(answer, 34);
  });
});
