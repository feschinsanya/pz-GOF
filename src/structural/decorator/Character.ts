// ─── Component Interface ──────────────────────────────────────────────────────
export interface ICharacter {
  getName(): string;
  getHP(): number;
  getAttack(): number;
  getDescription(): string;
}

// ─── Base Component ───────────────────────────────────────────────────────────
export class BaseCharacter implements ICharacter {
  constructor(private readonly name: string) {}

  getName(): string     { return this.name; }
  getHP(): number       { return 100; }
  getAttack(): number   { return 10; }
  getDescription(): string {
    return `${this.name} (base)`;
  }
}

// ─── Abstract Decorator ───────────────────────────────────────────────────────
export abstract class EquipmentDecorator implements ICharacter {
  constructor(protected character: ICharacter) {}

  getName(): string    { return this.character.getName(); }
  getHP(): number      { return this.character.getHP(); }
  getAttack(): number  { return this.character.getAttack(); }
  getDescription(): string { return this.character.getDescription(); }
}

// ─── Concrete Decorators ──────────────────────────────────────────────────────
export class SteelArmorDecorator extends EquipmentDecorator {
  getHP(): number { return this.character.getHP() + 50; }
  getDescription(): string {
    return `${this.character.getDescription()} + Steel Armor`;
  }
}

export class EnchantedSwordDecorator extends EquipmentDecorator {
  getAttack(): number { return this.character.getAttack() + 30; }
  getDescription(): string {
    return `${this.character.getDescription()} + Enchanted Sword`;
  }
}

export class MagicRingDecorator extends EquipmentDecorator {
  getHP(): number     { return this.character.getHP() + 20; }
  getAttack(): number { return this.character.getAttack() + 15; }
  getDescription(): string {
    return `${this.character.getDescription()} + Magic Ring`;
  }
}

