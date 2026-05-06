import { Enemy, Goblin, Dragon, Skeleton } from './Enemy';

// ─── Abstract Creator ─────────────────────────────────────────────────────────
export abstract class EnemySpawner {
  /** Factory Method — subclass decides which enemy to create */
  abstract createEnemy(): Enemy;

  spawnAndDescribe(): void {
    const enemy = this.createEnemy();
    console.log(`  [Spawned] ${enemy.name} (HP: ${enemy.hp})`);
    console.log(`  [Action]  ${enemy.attack()}`);
  }
}

// ─── Concrete Creators ────────────────────────────────────────────────────────
export class GoblinSpawner extends EnemySpawner {
  createEnemy(): Enemy {
    return new Goblin();
  }
}

export class DragonSpawner extends EnemySpawner {
  createEnemy(): Enemy {
    return new Dragon();
  }
}

export class SkeletonSpawner extends EnemySpawner {
  createEnemy(): Enemy {
    return new Skeleton();
  }
}

