import { StockMarket, InvestorPortfolio, PriceAlertBot, AuditLogger } from './StockMarket';

export function run(): void {
  console.log('\n=== Observer: Stock Market Price Tracker ===');

  const market    = new StockMarket();
  const portfolio = new InvestorPortfolio({ AAPL: 10, TSLA: 5 });
  const alertBot  = new PriceAlertBot('AAPL', 200);
  const auditLog  = new AuditLogger();

  market.subscribe(portfolio);
  market.subscribe(alertBot);
  market.subscribe(auditLog);

  console.log('\n  [Tick 1] Price update:');
  market.setPrice('AAPL', 185);

  console.log('\n  [Tick 2] Price update:');
  market.setPrice('TSLA', 240);

  console.log('\n  [Tick 3] Price update (AAPL crosses threshold):');
  market.setPrice('AAPL', 202);

  console.log('\n  [Unsubscribe AuditLogger]');
  market.unsubscribe(auditLog);

  console.log('\n  [Tick 4] After unsubscribing AuditLogger:');
  market.setPrice('AAPL', 210);
}

if (require.main === module) {
  run();
}

