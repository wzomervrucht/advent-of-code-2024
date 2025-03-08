import { join } from 'node:path';
import { assert } from '../common/assert.ts';
import { array, range, sum } from '../common/util.ts';
import type { Puzzle } from '../puzzle.ts';

function solve1(input: string[]) {
  const secrets = input.map(parseSecret);
  const finalSecrets = secrets.map(getFinalSecret);
  return sum(finalSecrets);
}

function solve2(input: string[]) {
  const secrets = input.map(parseSecret);
  const priceLists = secrets.map(getPriceList);
  const priceByChanges = new Map<string, number>();
  priceLists.forEach(prices => {
    const occured = new Set<string>();
    for (let i = 4; i < prices.length; i++) {
      const changes = array(4, j => prices[i + j - 3]! - prices[i + j - 4]!).join();
      if (!occured.has(changes)) {
        occured.add(changes);
        priceByChanges.set(changes, (priceByChanges.get(changes) ?? 0) + prices[i]!);
      }
    }
  });
  return Math.max(...priceByChanges.values());
}

function parseSecret(line: string) {
  assert(line.match(/^\d+$/));
  return parseInt(line);
}

function getFinalSecret(initial: number) {
  return range(2000).reduce(getNextSecret, initial);
}

function getPriceList(initial: number) {
  let secret: number;
  return array(2001, i => {
    secret = i ? getNextSecret(secret) : initial;
    return secret % 10;
  });
}

function getNextSecret(secret: number) {
  let s = BigInt(secret);
  s = prune(mix(s, s * 64n));
  s = prune(mix(s, s / 32n));
  s = prune(mix(s, s * 2048n));
  return Number(s);
}

function mix(a: bigint, b: bigint) {
  // eslint-disable-next-line no-bitwise
  return a ^ b;
}

function prune(a: bigint) {
  return a % 16777216n;
}

export const monkeyMarket: Puzzle = {
  day: 22,
  title: 'Monkey Market',
  input: join(import.meta.dirname, 'input.txt'),
  solve1,
  solve2,
  answer1: 14119253575,
  answer2: 1600
};
