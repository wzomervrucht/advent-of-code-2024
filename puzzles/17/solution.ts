import { join } from 'node:path';
import { assert, assume } from '../common/assert.ts';
import { array, parseIntegers, xor } from '../common/util.ts';
import type { Puzzle } from '../puzzle.ts';

function solve1(input: string[]) {
  const { a, b, c, program } = parseInput(input);
  const state = { a, b, c, pointer: 0, output: [] };
  runProgram(program, state);
  return state.output.join();
}

function solve2(input: string[]) {
  const { program } = parseInput(input);
  verifyAssumptions(program);
  const a = findRegisterA(program);
  assert(a);
  return a;
}

function parseInput(input: string[]) {
  assert(input.length === 5);
  assert(input[3] === '');
  const matchA = input[0]!.match(/^Register A: (?<a>\d+)$/);
  const matchB = input[1]!.match(/^Register B: (?<b>\d+)$/);
  const matchC = input[2]!.match(/^Register C: (?<c>\d+)$/);
  const matchProgram = input[4]!.match(/^Program: [0-7],[0-7](?:,[0-7],[0-7])*$/);
  assert(matchA && matchB && matchC && matchProgram);
  return {
    a: parseInt(matchA.groups!['a']!),
    b: parseInt(matchB.groups!['b']!),
    c: parseInt(matchC.groups!['c']!),
    program: parseIntegers(input[4]!) as Octal[]
  };
}

function verifyAssumptions(program: Octal[]) {
  const instructions = array(program.length / 2, i => ({
    opcode: program[2 * i]!,
    operand: program[2 * i + 1]!
  }));
  assume(instructions.filter(s => s.opcode === 0).length === 1, 'The program should have a single adv instruction');
  assume(instructions.filter(s => s.opcode === 3).length === 1, 'The program should have a single jnz instruction');
  assume(instructions.filter(s => s.opcode === 5).length === 1, 'The program should have a single out instruction');
  const shiftA = instructions.find(s => s.opcode === 0)!;
  assume(shiftA.operand === 3, 'The adv instruction should have operand 3');
  const last = instructions.at(-1)!;
  assume(last.opcode === 3 && last.operand === 0, 'The last instruction should be a jump to 0');
  const readB = instructions.findIndex(s => (s.operand === 5 ? s.opcode !== 3 : [1, 4].includes(s.opcode)));
  const writeB = instructions.findIndex(s => [1, 2, 4, 6].includes(s.opcode));
  assume(readB === -1 || (0 <= writeB && writeB < readB), 'Each loop should write to B before reading B');
  const readC = instructions.findIndex(s => (s.operand === 6 ? ![1, 3].includes(s.opcode) : s.opcode === 4));
  const writeC = instructions.findIndex(s => s.opcode === 7);
  assume(readC === -1 || (0 <= writeC && writeC < readC), 'Each loop should write to C before reading C');
}

function findRegisterA(program: Octal[], partial = 0): number | null {
  for (let octal = partial ? 0 : 1; octal < 8; octal++) {
    const a = 8 * partial + octal;
    const state = { a, b: 0, c: 0, pointer: 0, output: [] };
    runProgram(program, state);
    if (program.join().endsWith(state.output.join())) {
      const result = program.length === state.output.length ? a : findRegisterA(program, a);
      if (result) {
        return result;
      }
    }
  }
  return null;
}

function runProgram(program: Octal[], state: State) {
  while (state.pointer < program.length) {
    const operation = operations[program[state.pointer]!];
    operation(state, program[state.pointer + 1]!);
    state.pointer += 2;
  }
}

function adv(state: State, operand: Octal) {
  state.a = Math.floor(state.a / 2 ** combo(state, operand));
}

function bxl(state: State, operand: Octal) {
  state.b = xor(state.b, operand);
}

function bst(state: State, operand: Octal) {
  state.b = combo(state, operand) % 8;
}

function jnz(state: State, operand: Octal) {
  if (state.a) {
    assert(operand % 2 === 0);
    state.pointer = operand - 2;
  }
}

function bxc(state: State) {
  state.b = xor(state.b, state.c);
}

function out(state: State, operand: Octal) {
  state.output.push(combo(state, operand) % 8);
}

function bdv(state: State, operand: Octal) {
  state.b = Math.floor(state.a / 2 ** combo(state, operand));
}

function cdv(state: State, operand: Octal) {
  state.c = Math.floor(state.a / 2 ** combo(state, operand));
}

function combo(state: State, operand: Octal) {
  switch (operand) {
    case 0:
    case 1:
    case 2:
    case 3:
      return operand;
    case 4:
      return state.a;
    case 5:
      return state.b;
    case 6:
      return state.c;
    case 7:
      assert.fail();
  }
}

const operations = [adv, bxl, bst, jnz, bxc, out, bdv, cdv] as const;

interface State {
  a: number;
  b: number;
  c: number;
  pointer: number;
  output: number[];
}

type Octal = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const chronospatialComputer: Puzzle = {
  day: 17,
  title: 'Chronospatial Computer',
  input: join(import.meta.dirname, 'input.txt'),
  solve1,
  solve2,
  answer1: '1,6,3,6,5,6,5,1,7',
  answer2: 247839653009594
};
