import { AppLogger } from './AppLogger';

export function run(): void {
  console.log('\n=== Singleton: Application Logger ===');

  const logger1 = AppLogger.getInstance();
  const logger2 = AppLogger.getInstance();

  logger1.info('Application started');
  logger1.warn('Low memory warning');
  logger2.error('Failed to connect to database');

  console.log(`\n  logger1 === logger2: ${logger1 === logger2}`);
  console.log(`  Total log entries: ${logger1.getHistory().length}`);
}

if (require.main === module) {
  run();
}

