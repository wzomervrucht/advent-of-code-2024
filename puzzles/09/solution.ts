import { join } from 'node:path';
import { assert } from '../common/assert.ts';
import type { Puzzle } from '../puzzle.ts';

function solve1(input: string[]) {
  const { files, gaps } = parseDiskMap(input);
  let checksum = 0;
  let file = files.at(-1);
  while (file) {
    gaps.length && gaps.at(-1)!.start >= file.start && gaps.pop();
    const gap = gaps[0];
    const size = Math.min(file.size, (gap ?? file).size);
    checksum += getChecksum(files.length - 1, (gap ?? file).start, size);
    file.size -= size;
    file.size === 0 && files.pop();
    if (gap) {
      gap.start += size;
      gap.size -= size;
      gap.size === 0 && gaps.shift();
    }
    file = files.at(-1);
  }
  return checksum;
}

function solve2(input: string[]) {
  const { files, gaps } = parseDiskMap(input);
  files.length === gaps.length && gaps.pop();
  return files.reduceRight((checksum, file, id) => {
    const gap = gaps.find(g => g.size >= file.size);
    if (gap) {
      file.start = gap.start;
      gap.start += file.size;
      gap.size -= file.size;
    }
    gaps.pop();
    return checksum + getChecksum(id, file.start, file.size);
  }, 0);
}

function parseDiskMap(input: string[]) {
  assert(input.length === 1);
  assert(input[0]!.match(/^\d*$/));
  const map = [...input[0]!].map(d => parseInt(d));
  const files: { start: number; size: number }[] = [];
  const gaps: { start: number; size: number }[] = [];
  let start = 0;
  map.forEach((size, i) => {
    const array = i % 2 === 0 ? files : gaps;
    array.push({ start, size });
    start += size;
  });
  return { files, gaps };
}

function getChecksum(id: number, start: number, size: number) {
  return (id * size * (2 * start + size - 1)) / 2;
}

export const diskFragmenter: Puzzle = {
  day: 9,
  title: 'Disk Fragmenter',
  input: join(import.meta.dirname, 'input.txt'),
  solve1,
  solve2
};
