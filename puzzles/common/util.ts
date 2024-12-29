export function range(length: number) {
  return [...Array(length).keys()];
}

export function array<T>(length: number, callback: (index: number) => T) {
  return range(length).map(callback);
}

export function parseIntegers(string: string) {
  const matches = string.match(/-?\d+/g) ?? [];
  return matches.map(m => parseInt(m));
}

export function add(x: number, y: number) {
  return x + y;
}

export function multiply(x: number, y: number) {
  return x * y;
}

export function sum(values: number[]) {
  return values.reduce(add, 0);
}
