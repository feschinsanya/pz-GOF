// ─── Product ──────────────────────────────────────────────────────────────────
export class Query {
  private sql: string;

  constructor(sql: string) {
    this.sql = sql;
  }

  print(): void {
    console.log(`  SQL: ${this.sql}`);
  }

  toString(): string {
    return this.sql;
  }
}

// ─── Builder Interface ────────────────────────────────────────────────────────
export interface IQueryBuilder {
  select(fields: string[]): this;
  from(table: string): this;
  where(condition: string): this;
  orderBy(field: string, direction?: 'ASC' | 'DESC'): this;
  limit(n: number): this;
  build(): Query;
  reset(): this;
}

// ─── Concrete Builder ─────────────────────────────────────────────────────────
export class SQLQueryBuilder implements IQueryBuilder {
  private fields: string[] = [];
  private table = '';
  private conditions: string[] = [];
  private order = '';
  private limitValue = 0;

  reset(): this {
    this.fields = [];
    this.table = '';
    this.conditions = [];
    this.order = '';
    this.limitValue = 0;
    return this;
  }

  select(fields: string[]): this {
    this.fields = fields;
    return this;
  }

  from(table: string): this {
    this.table = table;
    return this;
  }

  where(condition: string): this {
    this.conditions.push(condition);
    return this;
  }

  orderBy(field: string, direction: 'ASC' | 'DESC' = 'ASC'): this {
    this.order = `ORDER BY ${field} ${direction}`;
    return this;
  }

  limit(n: number): this {
    this.limitValue = n;
    return this;
  }

  build(): Query {
    const select = `SELECT ${this.fields.length ? this.fields.join(', ') : '*'}`;
    const from   = `FROM ${this.table}`;
    const where  = this.conditions.length ? `WHERE ${this.conditions.join(' AND ')}` : '';
    const order  = this.order;
    const limit  = this.limitValue > 0 ? `LIMIT ${this.limitValue}` : '';

    const parts = [select, from, where, order, limit].filter(Boolean);
    this.reset();
    return new Query(parts.join(' '));
  }
}

// ─── Director ─────────────────────────────────────────────────────────────────
export class QueryDirector {
  constructor(private builder: IQueryBuilder) {}

  buildActiveUsersQuery(): Query {
    return this.builder
      .select(['id', 'name', 'email'])
      .from('users')
      .where('active = true')
      .orderBy('name')
      .build();
  }

  buildTopProductsQuery(limit: number): Query {
    return this.builder
      .select(['id', 'title', 'price', 'rating'])
      .from('products')
      .where('in_stock = true')
      .orderBy('rating', 'DESC')
      .limit(limit)
      .build();
  }
}

