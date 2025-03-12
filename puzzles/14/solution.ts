import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { assert } from '../common/assert.ts';
import { Grid } from '../common/grid.ts';
import type { Point } from '../common/point.ts';
import { argmax, array, mod, range } from '../common/util.ts';
import type { Puzzle } from '../puzzle.ts';

function solve1(input: string[], config?: RestroomRedoubtConfig) {
  const robots = input.map(parseRobot);
  const size = config?.size ?? { x: 101, y: 103 };
  robots.forEach(({ p }) => assert(p.x < size.x && p.y < size.y));
  moveRobots(robots, size, 100);
  return getSafetyFactor(robots, size);
}

function solve2(input: string[]) {
  const robots = input.map(parseRobot);
  const size = { x: 101, y: 103 };
  robots.forEach(({ p }) => assert(p.x < size.x && p.y < size.y));
  const r = { x: 51, y: -50 }; // 51 * 101 - 50 * 103 = 1
  const t = getMaxTimes(robots, size);
  const time = mod(t.y * r.x * size.x + t.x * r.y * size.y, size.x * size.y);
  moveRobots(robots, size, time);
  writeMapToFile(robots, size);
  return time;
}

function parseRobot(line: string) {
  const match = line.match(/^p=(?<px>\d+),(?<py>\d+) v=(?<vx>-?\d+),(?<vy>-?\d+)$/);
  assert(match);
  const groups = match.groups as { px: string; py: string; vx: string; vy: string };
  return {
    p: { x: parseInt(groups.px), y: parseInt(groups.py) },
    v: { x: parseInt(groups.vx), y: parseInt(groups.vy) }
  };
}

function moveRobots(robots: Robot[], size: Point, time = 1) {
  robots.forEach(robot => {
    robot.p.x = mod(robot.p.x + time * robot.v.x, size.x);
    robot.p.y = mod(robot.p.y + time * robot.v.y, size.y);
  });
}

function getSafetyFactor(robots: Robot[], size: Point) {
  assert(size.x % 2 === 1 && size.y % 2 === 1);
  const middle = { x: (size.x - 1) / 2, y: (size.y - 1) / 2 };
  let [q1, q2] = [0, 0];
  let [q3, q4] = [0, 0];
  robots.forEach(robot => {
    robot.p.x < middle.x && robot.p.y < middle.y && q1++;
    robot.p.x > middle.x && robot.p.y < middle.y && q2++;
    robot.p.x < middle.x && robot.p.y > middle.y && q3++;
    robot.p.x > middle.x && robot.p.y > middle.y && q4++;
  });
  return q1 * q2 * q3 * q4;
}

function getMaxTimes(robots: Robot[], size: Point) {
  // the x and y positions of the robots repeat every size.x and size.y seconds,
  // and the Easter egg has many robots concentrated in a few columns and rows,
  // so we find the times with the most robots in a single column or row.
  const n = Math.max(size.x, size.y);
  const max: Point[] = [];
  for (let i = 0; i < n; i++) {
    max.push(getMax(robots, size));
    moveRobots(robots, size);
  }
  moveRobots(robots, size, -n);
  return { x: argmax(max.map(m => m.x)), y: argmax(max.map(m => m.y)) };
}

function getMax(robots: Robot[], size: Point) {
  const countX = array(size.x, () => 0);
  const countY = array(size.y, () => 0);
  robots.forEach(robot => {
    countX[robot.p.x]!++;
    countY[robot.p.y]!++;
  });
  return { x: Math.max(...countX), y: Math.max(...countY) };
}

function writeMapToFile(robots: Robot[], size: Point) {
  const map = new Grid(size, () => false);
  robots.forEach(robot => map.set(robot.p, true));
  const rows = range(size.y);
  const cols = range(size.x);
  const contents = rows.map(y => cols.map(x => (map.get({ x, y }) ? 'X' : ' ')).join('')).join('\n');
  const filename = join(import.meta.dirname, 'map.txt');
  writeFileSync(filename, contents, { encoding: 'utf8' });
}

interface Robot {
  p: Point;
  v: Point;
}

export interface RestroomRedoubtConfig {
  size: Point;
}

export const restroomRedoubt: Puzzle<RestroomRedoubtConfig> = {
  day: 14,
  title: 'Restroom Redoubt',
  input: join(import.meta.dirname, 'input.txt'),
  solve1,
  solve2,
  answer1: 230435667,
  answer2: 7709
};
