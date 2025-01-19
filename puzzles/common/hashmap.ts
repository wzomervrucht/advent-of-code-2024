export abstract class HashMap<T, U> {
  private map = new Map<string, U>();

  has(key: T) {
    return this.map.has(this.hash(key));
  }

  get(key: T) {
    return this.map.get(this.hash(key));
  }

  set(key: T, value: U) {
    this.map.set(this.hash(key), value);
  }

  protected abstract hash(value: T): string;
}
