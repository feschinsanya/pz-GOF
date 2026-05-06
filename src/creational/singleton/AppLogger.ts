// ─── Singleton: Application Logger ───────────────────────────────────────────
export class AppLogger {
  private static instance: AppLogger | null = null;
  private logs: string[] = [];

  // Приватний конструктор — заборона створення через new
  private constructor() {}

  static getInstance(): AppLogger {
    if (!AppLogger.instance) {
      AppLogger.instance = new AppLogger();
    }
    return AppLogger.instance;
  }

  private timestamp(): string {
    return new Date().toISOString();
  }

  info(message: string): void {
    const entry = `[${this.timestamp()}] INFO:  ${message}`;
    this.logs.push(entry);
    console.log(`  ${entry}`);
  }

  warn(message: string): void {
    const entry = `[${this.timestamp()}] WARN:  ${message}`;
    this.logs.push(entry);
    console.log(`  ${entry}`);
  }

  error(message: string): void {
    const entry = `[${this.timestamp()}] ERROR: ${message}`;
    this.logs.push(entry);
    console.log(`  ${entry}`);
  }

  getHistory(): string[] {
    return [...this.logs];
  }
}

