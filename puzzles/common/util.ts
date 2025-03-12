export function range(length: number) {
  return [...Array(length).keys()];
}

export function array<T>(length: number, callback: (index: number) => T) {
  return range(length).map(callback);
}

export function* pairs<T>(values: T[]) {
  for (let i = 0; i < values.length; i++) {
    for (let j = i + 1; j < values.length; j++) {
      yield [values[i], values[j]] as [T, T];
    }
  }
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

export function mod(x: number, modulus: number) {
  return ((x % modulus) + modulus) % modulus;
}

export function xor(x: number, y: number) {
  // eslint-disable-next-line no-bitwise
  return Number(BigInt(x) ^ BigInt(y));
}

export function sum(values: number[]) {
  return values.reduce(add, 0);
}

export function max<T>(values: T[], callback: (value: T) => number) {
  return values.length ? values.reduce((m, value) => (callback(value) > callback(m) ? value : m)) : undefined;
}

export function argmax(values: number[]) {
  return max(range(values.length), i => values[i]!) ?? -1;
}
