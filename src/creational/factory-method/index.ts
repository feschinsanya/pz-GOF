import { GoblinSpawner, DragonSpawner, SkeletonSpawner, EnemySpawner } from './EnemySpawner';

export function run(): void {
  console.log('\n=== Factory Method: RPG Enemy Spawner ===');

  const dungeon: EnemySpawner[] = [
    new GoblinSpawner(),
    new SkeletonSpawner(),
    new DragonSpawner(),
  ];

  dungeon.forEach((spawner, i) => {
    console.log(`\nRoom ${i + 1}:`);
    spawner.spawnAndDescribe();
  });
}

// Дозволяє запускати файл безпосередньо: ts-node src/creational/factory-method/index.ts
if (require.main === module) {
  run();
}

