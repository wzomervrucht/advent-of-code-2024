export function range(length: number) {
  return [...Array(length).keys()];
}

export function array<T>(length: number, callback: (index: number) => T) {
  return range(length).map(callback);
}
