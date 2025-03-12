import { join } from 'node:path';
import { assert } from '../common/assert.ts';
import { max, pairs } from '../common/util.ts';
import type { Puzzle } from '../puzzle.ts';

function solve1(input: string[]) {
  const connections = getConnections(input);
  const ts = [...connections.keys()].filter(a => a.startsWith('t'));
  const triples = ts.flatMap(t => getTriples(t, connections));
  const unique = new Set(triples.map(triple => triple.sort().join()));
  return unique.size;
}

function solve2(input: string[]) {
  assert(input.length);
  const connections = getConnections(input);
  const computers = [...connections.keys()];
  const cliques = getMaximalCliques([], computers, [], connections);
  const largest = max(cliques, c => c.length)!;
  return largest.sort().join();
}

function getConnections(input: string[]) {
  const connections = new Map<string, Set<string>>();
  for (const line of input) {
    const { a, b } = parseConnection(line);
    connections.get(a)?.add(b) ?? connections.set(a, new Set([b]));
    connections.get(b)?.add(a) ?? connections.set(b, new Set([a]));
  }
  return connections;
}

function parseConnection(line: string) {
  const match = line.match(/^(?<a>[a-z]{2})-(?<b>[a-z]{2})$/);
  assert(match);
  return match.groups as { a: string; b: string };
}

function getTriples(t: string, connections: Map<string, Set<string>>) {
  const triples: [string, string, string][] = [];
  const connected = [...connections.get(t)!.values()];
  for (const [a, b] of pairs(connected)) {
    if (connections.get(a)!.has(b)) {
      triples.push([t, a, b]);
    }
  }
  return triples;
}

// Bron-Kerbosch algorithm
function getMaximalCliques(
  required: string[],
  possible: string[],
  excluded: string[],
  connections: Map<string, Set<string>>
) {
  if (!possible.length && !excluded.length) {
    return [required];
  }
  const cliques: string[][] = [];
  while (possible.length) {
    const a = possible.pop()!;
    const c = connections.get(a)!;
    cliques.push(
      ...getMaximalCliques(
        required.concat([a]),
        possible.filter(p => c.has(p)),
        excluded.filter(x => c.has(x)),
        connections
      )
    );
    excluded.push(a);
  }
  return cliques;
}

export const lanParty: Puzzle = {
  day: 23,
  title: 'LAN Party',
  input: join(import.meta.dirname, 'input.txt'),
  solve1,
  solve2,
  answer1: 1512,
  answer2: 'ac,ed,fh,kd,lf,mb,om,pe,qt,uo,uy,vr,wg'
};
