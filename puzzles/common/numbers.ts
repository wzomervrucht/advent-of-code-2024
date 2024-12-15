export function parseIntegers(string: string) {
  const matches = string.match(/-?\d+/g) ?? [];
  return matches.map(m => parseInt(m));
}

export function sum(values: number[]) {
  return values.reduce((x, y) => x + y, 0);
}
