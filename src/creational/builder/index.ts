import { SQLQueryBuilder, QueryDirector } from './SQLQueryBuilder';

export function run(): void {
  console.log('\n=== Builder: SQL Query Builder ===');

  const builder  = new SQLQueryBuilder();
  const director = new QueryDirector(builder);

  console.log('\n  [Director] Active users query:');
  director.buildActiveUsersQuery().print();

  console.log('\n  [Director] Top-5 products query:');
  director.buildTopProductsQuery(5).print();

  console.log('\n  [Manual]   Custom query:');
  builder
    .select(['order_id', 'total'])
    .from('orders')
    .where('status = "shipped"')
    .where('total > 100')
    .orderBy('total', 'DESC')
    .limit(10)
    .build()
    .print();
}

if (require.main === module) {
  run();
}

