import {
  DataSorter,
  BubbleSortStrategy,
  QuickSortStrategy,
  MergeSortStrategy,
} from './SortStrategy';

export function run(): void {
  console.log('\n=== Strategy: Sorting Algorithm Selector ===');

  const dataset = [38, 27, 43, 3, 9, 82, 10];
  const sorter  = new DataSorter(new BubbleSortStrategy());

  console.log();
  sorter.sort(dataset);

  console.log();
  sorter.setStrategy(new QuickSortStrategy());
  sorter.sort(dataset);

  console.log();
  sorter.setStrategy(new MergeSortStrategy());
  sorter.sort(dataset);
}

if (require.main === module) {
  run();
}

