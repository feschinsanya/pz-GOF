import {
  BaseCharacter,
  SteelArmorDecorator,
  EnchantedSwordDecorator,
  MagicRingDecorator,
  ICharacter,
} from './Character';

function printStats(char: ICharacter): void {
  console.log(`  ${char.getDescription()}`);
  console.log(`    HP: ${char.getHP()}  |  ATK: ${char.getAttack()}`);
}

export function run(): void {
  console.log('\n=== Decorator: RPG Character Equipment ===');

  let hero: ICharacter = new BaseCharacter('Artorias');
  console.log('\n  [Base character]:');
  printStats(hero);

  hero = new SteelArmorDecorator(hero);
  console.log('\n  [+ Steel Armor]:');
  printStats(hero);

  hero = new EnchantedSwordDecorator(hero);
  console.log('\n  [+ Enchanted Sword]:');
  printStats(hero);

  hero = new MagicRingDecorator(hero);
  console.log('\n  [+ Magic Ring]:');
  printStats(hero);
}

if (require.main === module) {
  run();
}

