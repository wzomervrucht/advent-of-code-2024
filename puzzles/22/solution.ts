import { join } from 'node:path';
import { assert } from '../common/assert.ts';
import { range, sum } from '../common/util.ts';
import type { Puzzle } from '../puzzle.ts';

function solve1(input: string[]) {
  const secrets = input.map(parseSecret);
  const finalSecrets = secrets.map(getFinalSecret);
  return sum(finalSecrets);
}

function solve2(input: string[]) {
  const secrets = input.map(parseSecret);
  const prices = secrets.map(getPriceByChanges);
  const totals = new Map<string, number>();
  prices.forEach(priceByChanges => {
    priceByChanges.forEach((price, changes) => {
      totals.set(changes, (totals.get(changes) ?? 0) + price);
    });
  });
  return Math.max(...totals.values());
}

function parseSecret(line: string) {
  assert(line.match(/^\d+$/));
  return parseInt(line);
}

function getFinalSecret(initial: number) {
  return range(2000).reduce(getNextSecret, initial);
}

function getPriceByChanges(initial: number) {
  const priceByChanges = new Map<string, number>();
  let secret = initial;
  let price = initial % 10;
  // eslint-disable-next-line no-useless-assignment
  let [d1, d2, d3, d4] = [0, 0, 0, 0];
  for (let i = 0; i < 2000; i++) {
    secret = getNextSecret(secret);
    [d1, d2, d3, d4] = [d2, d3, d4, (secret % 10) - price];
    price = secret % 10;
    if (i >= 4) {
      const changes = `${d1},${d2},${d3},${d4}`;
      priceByChanges.has(changes) || priceByChanges.set(changes, price);
    }
  }
  return priceByChanges;
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
  solve2
};
