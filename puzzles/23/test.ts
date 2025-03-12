import assert from 'node:assert/strict';
import { suite, test } from 'node:test';
import { lanParty } from './solution.ts';

suite('day 23', () => {
  const example = [
    'kh-tc',
    'qp-kh',
    'de-cg',
    'ka-co',
    'yn-aq',
    'qp-ub',
    'cg-tb',
    'vc-aq',
    'tb-ka',
    'wh-tc',
    'yn-cg',
    'kh-ub',
    'ta-co',
    'de-co',
    'tc-td',
    'tb-wq',
    'wh-td',
    'ta-ka',
    'td-qp',
    'aq-cg',
    'wq-ub',
    'ub-vc',
    'de-ta',
    'wq-aq',
    'wq-vc',
    'wh-yn',
    'ka-de',
    'kh-ta',
    'co-tc',
    'wh-qp',
    'tb-vc',
    'td-yn'
  ];

  test('part 1', () => {
    const answer = lanParty.solve1(example);
    assert.equal(answer, 7);
  });

  test('part 2', () => {
    const answer = lanParty.solve2(example);
    assert.equal(answer, 'co,de,ka,ta');
  });
});
