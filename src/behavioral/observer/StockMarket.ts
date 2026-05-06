// ─── Observer Interface ───────────────────────────────────────────────────────
export interface IStockObserver {
  update(symbol: string, price: number): void;
}

// ─── Subject ──────────────────────────────────────────────────────────────────
export class StockMarket {
  private observers: IStockObserver[] = [];
  private prices: Map<string, number> = new Map();

  subscribe(observer: IStockObserver): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: IStockObserver): void {
    this.observers = this.observers.filter(o => o !== observer);
  }

  setPrice(symbol: string, price: number): void {
    this.prices.set(symbol, price);
    this.notify(symbol, price);
  }

  private notify(symbol: string, price: number): void {
    this.observers.forEach(o => o.update(symbol, price));
  }
}

// ─── Concrete Observers ───────────────────────────────────────────────────────
export class InvestorPortfolio implements IStockObserver {
  private holdings: Map<string, number>;

  constructor(holdings: Record<string, number>) {
    this.holdings = new Map(Object.entries(holdings));
  }

  update(symbol: string, price: number): void {
    const shares = this.holdings.get(symbol) ?? 0;
    if (shares > 0) {
      console.log(`  [Portfolio]  ${symbol} @ $${price} — holding ${shares} shares → value $${(shares * price).toFixed(2)}`);
    }
  }
}

export class PriceAlertBot implements IStockObserver {
  constructor(
    private readonly symbol: string,
    private readonly threshold: number,
  ) {}

  update(symbol: string, price: number): void {
    if (symbol === this.symbol && price >= this.threshold) {
      console.log(`  [AlertBot]   ⚠ ${symbol} crossed $${this.threshold}! Current: $${price}`);
    }
  }
}

export class AuditLogger implements IStockObserver {
  update(symbol: string, price: number): void {
    console.log(`  [AuditLog]   tick — ${symbol}: $${price}`);
  }
}

