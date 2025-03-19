import { join } from 'node:path';
import { assert, assume } from '../common/assert.ts';
import type { Puzzle } from '../puzzle.ts';

function solve1(input: string[]) {
  const { inputs, gates, z } = parseWires(input);
  const wires = new Map([...inputs, ...gates].map(wire => [wire.wire, wire]));
  const output = z.map(wire => getValue(wire, wires));
  return decimal(output);
}

function solve2(input: string[]) {
  const { gates, x, y, z } = parseWires(input);
  assert(y.length === x.length);
  assert(z.length === x.length + 1);
  const swaps = findSwaps(gates, x, y, z);
  return swaps.flat().sort().join();
}

function parseWires(input: string[]) {
  const blank = input.indexOf('');
  assert(blank >= 0);
  const inputs = input.slice(0, blank).map(parseInput);
  const gates = input.slice(blank + 1).map(parseGate);
  return {
    inputs,
    gates,
    x: getNamesWithPrefix(inputs, 'x'),
    y: getNamesWithPrefix(inputs, 'y'),
    z: getNamesWithPrefix(gates, 'z')
  };
}

function parseInput(line: string) {
  const match = line.match(/^(?<wire>[xy]\d{2}): (?<value>[01])$/);
  assert(match);
  const groups = match.groups as { wire: string; value: string };
  return { wire: groups.wire, value: groups.value === '1' };
}

function parseGate(line: string) {
  const match = line.match(/^(?<in1>\w{3}) (?<op>AND|OR|XOR) (?<in2>\w{3}) -> (?<wire>\w{3})$/);
  assert(match);
  return match.groups as { in1: string; in2: string; op: 'AND' | 'OR' | 'XOR'; wire: string };
}

function getNamesWithPrefix(wires: Wire[], prefix: string) {
  const names = wires.map(wire => wire.wire);
  const prefixed = names.filter(name => name.startsWith(prefix)).sort();
  assert(prefixed.every((name, i) => name === getPrefixedName(prefix, i)));
  return prefixed;
}

function getPrefixedName(prefix: string, index: number) {
  return index < 10 ? `${prefix}0${index}` : `${prefix}${index}`;
}

function getValue(name: string, wires: Map<string, Wire>): boolean {
  const wire = wires.get(name)!;
  wire.value ??= operations[wire.op](getValue(wire.in1, wires), getValue(wire.in2, wires));
  return wire.value;
}

function decimal(bits: boolean[]) {
  return bits.reduceRight((n, bit) => 2 * n + Number(bit), 0);
}

function findSwaps(gates: Gate[], x: string[], y: string[], z: string[]) {
  // swaps found by manual inspection of the input assuming a construction
  // where for each bit n, the system should have these inputs and gates:
  // x(n)
  // y(n)
  // and(n) =   x(n) AND   y(n)
  // xor(n) =   x(n) XOR   y(n)
  // ofx(n) = xor(n) AND ofl(n-1)
  // z(n)   = xor(n) XOR ofl(n-1)
  // ofl(n) = and(n)  OR ofx(n)
  const swaps: [string, string][] = [
    ['z10', 'mkk'],
    ['z14', 'qbw'],
    ['cvp', 'wjb'],
    ['z34', 'wcb']
  ];
  swaps.forEach(([a, b]) => {
    const gateA = gates.find(gate => gate.wire === a);
    const gateB = gates.find(gate => gate.wire === b);
    assume(gateA && gateB);
    gateA.wire = b;
    gateB.wire = a;
  });
  checkGates(gates, x, y, z);
  return swaps;
}

function checkGates(gates: Gate[], x: string[], y: string[], z: string[]) {
  const and0 = gates.find(gate => gate.op === 'AND' && hasInputs(gate, x[0]!, y[0]!));
  const xor0 = gates.find(gate => gate.op === 'XOR' && hasInputs(gate, x[0]!, y[0]!));
  assume(and0 && xor0 && xor0.wire === z[0]);
  let overflow = and0.wire;
  for (let i = 1; i < x.length; i++) {
    const and_i = gates.find(gate => gate.op === 'AND' && hasInputs(gate, x[i]!, y[i]!));
    const xor_i = gates.find(gate => gate.op === 'XOR' && hasInputs(gate, x[i]!, y[i]!));
    assume(and_i && xor_i);
    const ofx_i = gates.find(gate => gate.op === 'AND' && hasInputs(gate, xor_i.wire, overflow));
    const out_i = gates.find(gate => gate.op === 'XOR' && hasInputs(gate, xor_i.wire, overflow));
    assume(ofx_i && out_i && out_i.wire === z[i]);
    const ofl_i = gates.find(gate => gate.op === 'OR' && hasInputs(gate, and_i.wire, ofx_i.wire));
    assume(ofl_i);
    overflow = ofl_i.wire;
  }
  assume(overflow === z[x.length]);
}

function hasInputs(gate: Gate, in1: string, in2: string) {
  return gate.in1 === in1 ? gate.in2 === in2 : gate.in1 === in2 && gate.in2 === in1;
}

function and(in1: boolean, in2: boolean) {
  return in1 && in2;
}

function or(in1: boolean, in2: boolean) {
  return in1 || in2;
}

function xor(in1: boolean, in2: boolean) {
  return in1 !== in2;
}

const operations = { AND: and, OR: or, XOR: xor } as const;

interface Input {
  wire: string;
  value: boolean;
}

interface Gate {
  in1: string;
  in2: string;
  op: 'AND' | 'OR' | 'XOR';
  wire: string;
  value?: boolean;
}

type Wire = Input | Gate;

export const crossedWires: Puzzle = {
  day: 24,
  title: 'Crossed Wires',
  input: join(import.meta.dirname, 'input.txt'),
  solve1,
  solve2,
  answer1: 36902370467952,
  answer2: 'cvp,mkk,qbw,wcb,wjb,z10,z14,z34'
};
