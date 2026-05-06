// ─── Product Interface ────────────────────────────────────────────────────────
export interface Enemy {
  name: string;
  hp: number;
  attack(): string;
}

// ─── Concrete Products ────────────────────────────────────────────────────────
export class Goblin implements Enemy {
  name = 'Goblin';
  hp = 30;

  attack(): string {
    return `${this.name} strikes with a rusty dagger! (-5 HP)`;
  }
}

export class Dragon implements Enemy {
  name = 'Dragon';
  hp = 200;

  attack(): string {
    return `${this.name} breathes fire! (-50 HP)`;
  }
}

export class Skeleton implements Enemy {
  name = 'Skeleton';
  hp = 50;

  attack(): string {
    return `${this.name} hurls a bone! (-12 HP)`;
  }
}

