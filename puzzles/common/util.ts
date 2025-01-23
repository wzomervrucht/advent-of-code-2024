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

export function sum(values: number[]) {
  return values.reduce(add, 0);
}

export function argmax(values: number[]) {
  return values.reduce((i, value, index) => (i === -1 || value > values[i]! ? index : i), -1);
}
