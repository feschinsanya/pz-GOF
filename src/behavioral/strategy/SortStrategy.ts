// ─── Strategy Interface ───────────────────────────────────────────────────────
export interface ISortStrategy {
  readonly name: string;
  sort(data: number[]): number[];
}

// ─── Concrete Strategies ──────────────────────────────────────────────────────
export class BubbleSortStrategy implements ISortStrategy {
  readonly name = 'Bubble Sort';

  sort(data: number[]): number[] {
    const arr = [...data];
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  }
}

export class QuickSortStrategy implements ISortStrategy {
  readonly name = 'Quick Sort';

  sort(data: number[]): number[] {
    const arr = [...data];
    if (arr.length <= 1) return arr;
    const pivot = arr[Math.floor(arr.length / 2)];
    const left   = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right  = arr.filter(x => x > pivot);
    return [...this.sort(left), ...middle, ...this.sort(right)];
  }
}

export class MergeSortStrategy implements ISortStrategy {
  readonly name = 'Merge Sort';

  sort(data: number[]): number[] {
    const arr = [...data];
    if (arr.length <= 1) return arr;
    const mid   = Math.floor(arr.length / 2);
    const left  = this.sort(arr.slice(0, mid));
    const right = this.sort(arr.slice(mid));
    return this.merge(left, right);
  }

  private merge(left: number[], right: number[]): number[] {
    const result: number[] = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
      result.push(left[i] <= right[j] ? left[i++] : right[j++]);
    }
    return [...result, ...left.slice(i), ...right.slice(j)];
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
export class DataSorter {
  private strategy: ISortStrategy;

  constructor(strategy: ISortStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: ISortStrategy): void {
    this.strategy = strategy;
  }

  sort(data: number[]): number[] {
    console.log(`  [Strategy: ${this.strategy.name}]`);
    const result = this.strategy.sort(data);
    console.log(`  Input:  [${data.join(', ')}]`);
    console.log(`  Output: [${result.join(', ')}]`);
    return result;
  }
}

