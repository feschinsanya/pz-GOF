import { SmartHomeFacade } from './SmartHomeFacade';

export function run(): void {
  console.log('\n=== Facade: Smart Home System ===');

  const home = new SmartHomeFacade();

  console.log();
  home.arriveHome();
  console.log();
  home.movieNight();
  console.log();
  home.leaveHome();
}

if (require.main === module) {
  run();
}

