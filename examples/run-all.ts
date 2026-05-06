import { run as runFactoryMethod } from '../src/creational/factory-method/index';
import { run as runBuilder }       from '../src/creational/builder/index';
import { run as runSingleton }     from '../src/creational/singleton/index';

import { run as runAdapter }       from '../src/structural/adapter/index';
import { run as runFacade }        from '../src/structural/facade/index';
import { run as runDecorator }     from '../src/structural/decorator/index';

import { run as runStrategy }      from '../src/behavioral/strategy/index';
import { run as runObserver }      from '../src/behavioral/observer/index';

console.log('╔══════════════════════════════════════════════╗');
console.log('║       GoF Design Patterns — TypeScript       ║');
console.log('╠══════════════════════════════════════════════╣');
console.log('║   Creational  │  Structural  │  Behavioral   ║');
console.log('╚══════════════════════════════════════════════╝');

// ── Creational ─────────────────────────────────────────────────────────────────
console.log('\n\n★ CREATIONAL PATTERNS ★');
runFactoryMethod();
runBuilder();
runSingleton();

// ── Structural ─────────────────────────────────────────────────────────────────
console.log('\n\n★ STRUCTURAL PATTERNS ★');
runAdapter();
runFacade();
runDecorator();

// ── Behavioral ─────────────────────────────────────────────────────────────────
console.log('\n\n★ BEHAVIORAL PATTERNS ★');
runStrategy();
runObserver();

console.log('\n\n✔ All patterns executed successfully.\n');

