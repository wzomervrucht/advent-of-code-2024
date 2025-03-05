export class Queue<T> {
  private readonly items: T[] = [];
  private readonly compare: (a: T, b: T) => number;

  constructor(compare: (a: T, b: T) => number, items: Iterable<T> = []) {
    this.compare = compare;
    this.push(...items);
  }

  push(...items: T[]) {
    items.forEach(item => {
      this.items.push(item);
      this.siftUp(this.items.length - 1);
    });
  }

  pop() {
    if (this.items.length <= 1) {
      return this.items.pop();
    }
    const root = this.items[0];
    this.items[0] = this.items.pop() as T;
    this.siftDown(0);
    return root;
  }

  private siftUp(index: number) {
    const parent = Math.floor((index - 1) / 2);
    if (index > 0 && !this.isOrdered(parent, index)) {
      this.swapItems(parent, index);
      this.siftUp(parent);
    }
  }

  private siftDown(index: number) {
    const child1 = 2 * index + 1;
    const child2 = 2 * index + 2;
    let first = index;
    if (child1 < this.items.length && !this.isOrdered(first, child1)) {
      first = child1;
    }
    if (child2 < this.items.length && !this.isOrdered(first, child2)) {
      first = child2;
    }
    if (first !== index) {
      this.swapItems(first, index);
      this.siftDown(first);
    }
  }

  private isOrdered(i: number, j: number) {
    return this.compare(this.items[i] as T, this.items[j] as T) <= 0;
  }

  private swapItems(i: number, j: number) {
    [this.items[i], this.items[j]] = [this.items[j] as T, this.items[i] as T];
  }
}
