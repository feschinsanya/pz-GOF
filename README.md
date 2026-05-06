# Практична робота pz-GOF
## Реалізація патернів проєктування GoF на TypeScript

---

## Про проєкт

У межах даної практичної роботи реалізовано класичні патерни проєктування **GoF (Gang of Four)** з використанням мови **TypeScript**.

Основна мета — зрозуміти, як патерни допомагають будувати більш чистий, зрозумілий та гнучкий код, а також спрощують підтримку і подальший розвиток програмних рішень.

У проєкті реалізовано **8 патернів** трьох груп. Кожен патерн виділено в окрему директорію та має власний консольний приклад.

---

## Реалізовані патерни

### 1. Породжувальні патерни (Creational)

#### Factory Method — RPG Enemy Spawner

**Призначення:** створення об'єктів без прямої залежності від конкретних класів; фабричний метод у підкласі вирішує, який об'єкт створити.

**Проблема без патерна:** клієнтський код містить `if/else` або `switch` при кожному створенні об'єкта, що ускладнює додавання нових типів.

**Приклад:** підземелля породжує різних ворогів (`Goblin`, `Skeleton`, `Dragon`) через відповідні фабрики-спавнери — клієнт викликає лише `spawner.spawnAndDescribe()`.

```
Room 1:
  [Spawned] Goblin (HP: 30)
  [Action]  Goblin strikes with a rusty dagger! (-5 HP)
Room 3:
  [Spawned] Dragon (HP: 200)
  [Action]  Dragon breathes fire! (-50 HP)
```

---

#### Builder — SQL Query Builder

**Призначення:** покрокове конструювання складного об'єкта, відокремлюючи процес побудови від представлення.

**Проблема без патерна:** конструктор із десятками параметрів («telescoping constructor»), де легко переплутати порядок аргументів або пропустити потрібні.

**Приклад:** `SQLQueryBuilder` дозволяє флюентно складати SQL-запити; `QueryDirector` надає готові сценарії для частих запитів.

```
SQL: SELECT id, name, email FROM users WHERE active = true ORDER BY name ASC
SQL: SELECT id, title, price, rating FROM products WHERE in_stock = true ORDER BY rating DESC LIMIT 5
SQL: SELECT order_id, total FROM orders WHERE status = "shipped" AND total > 100 ORDER BY total DESC LIMIT 10
```

---

#### Singleton — Application Logger

**Призначення:** гарантує існування рівно **одного** екземпляра класу та надає глобальну точку доступу до нього.

**Проблема без патерна:** кілька незалежних об'єктів-логерів пишуть у різні потоки / файли — логи розрізнені, загальна статистика недоступна.

**Приклад:** `AppLogger.getInstance()` з будь-якого місця коду повертає той самий об'єкт; перевірка `logger1 === logger2: true` підтверджує єдиність.

```
[INFO]  Application started
[WARN]  Low memory warning
[ERROR] Failed to connect to database
logger1 === logger2: true  |  Total log entries: 3
```

---

### 2. Структурні патерни (Structural)

#### Adapter — Legacy XML Weather → Modern JSON

**Призначення:** дозволяє об'єктам із несумісними інтерфейсами працювати разом без зміни їхнього коду.

**Проблема без патерна:** новий клієнтський код не може напряму використати старий сервіс — доводиться або переписувати легасі, або дублювати логіку.

**Приклад:** `LegacyXMLWeatherService` повертає рядок XML; `WeatherAdapter` парсить його і видає типізований об'єкт `WeatherData` — клієнт ніколи не бачить XML.

```
[Adapted modern object]:
  City: Kyiv | Temp: 18°C | Humidity: 65% | Condition: Partly Cloudy
```

---

#### Facade — Smart Home System

**Призначення:** надає спрощений інтерфейс до складної підсистеми, приховуючи деталі взаємодії між її компонентами.

**Проблема без патерна:** клієнт змушений знати про всі внутрішні системи та викликати методи в правильному порядку — висока зв'язність.

**Приклад:** `SmartHomeFacade` об'єднує `LightsSystem`, `HVACSystem`, `SecuritySystem` та `EntertainmentSystem`; один виклик `arriveHome()` / `leaveHome()` / `movieNight()` керує всіма підсистемами.

```
[Facade] → arriveHome scenario:
  [Security] Alarm DISARMED
  [Lights]   Lights turned ON
  [HVAC]     Heating to 22°C
  [Entertainment] Playing relaxing music
```

---

#### Decorator — RPG Character Equipment

**Призначення:** динамічне розширення поведінки об'єкта шляхом «обгортання» без зміни його класу.

**Проблема без патерна:** при успадкуванні кількість підкласів зростає за числом комбінацій — комбінаторний вибух.

**Приклад:** базовий персонаж `Artorias` декорується `SteelArmorDecorator` (+50 HP), `EnchantedSwordDecorator` (+30 ATK), `MagicRingDecorator` (+20 HP, +15 ATK) — кожен шар додає бонус поверх попереднього.

```
Artorias (base) + Steel Armor + Enchanted Sword + Magic Ring
HP: 170  |  ATK: 55
```

---

### 3. Поведінкові патерни (Behavioral)

#### Strategy — Sorting Algorithm Selector

**Призначення:** визначає сімейство алгоритмів, інкапсулює кожен і дає змогу їх взаємозамінювати під час виконання програми.

**Проблема без патерна:** усі варіанти алгоритму змішані в одному методі через `if/switch` — зміна одного зачіпає весь клас.

**Приклад:** `DataSorter` зберігає поточну стратегію; `setStrategy()` дозволяє перемикатися між `BubbleSortStrategy`, `QuickSortStrategy` та `MergeSortStrategy` без зміни контексту.

```
[Strategy: Bubble Sort]  [38,27,43,3,9,82,10] → [3,9,10,27,38,43,82]
[Strategy: Quick Sort]   [38,27,43,3,9,82,10] → [3,9,10,27,38,43,82]
[Strategy: Merge Sort]   [38,27,43,3,9,82,10] → [3,9,10,27,38,43,82]
```

---

#### Observer — Stock Market Price Tracker

**Призначення:** визначає залежність «один до багатьох»: при зміні стану суб'єкта всі підписники автоматично отримують сповіщення.

**Проблема без патерна:** суб'єкт явно знає про споживачів і викликає їх напряму — жорстка зв'язність, неможливо додати нового спостерігача без зміни суб'єкта.

**Приклад:** `StockMarket` сповіщає `InvestorPortfolio` (вартість портфеля), `PriceAlertBot` (спрацьовує при перетині порогу) та `AuditLogger` (логує кожен тік). `unsubscribe()` від'єднує спостерігача незалежно від суб'єкта.

```
[Tick 3] AAPL @ $202:
  [Portfolio]  AAPL @ $202 — holding 10 shares → value $2020.00
  [AlertBot]   ⚠ AAPL crossed $200! Current: $202
  [AuditLog]   tick — AAPL: $202
```

---

## Структура проєкту

```
pz-GOF/
├── src/
│   ├── creational/
│   │   ├── factory-method/   ← Enemy.ts, EnemySpawner.ts, index.ts
│   │   ├── builder/          ← SQLQueryBuilder.ts, index.ts
│   │   └── singleton/        ← AppLogger.ts, index.ts
│   ├── structural/
│   │   ├── adapter/          ← WeatherService.ts, WeatherAdapter.ts, index.ts
│   │   ├── facade/           ← subsystems.ts, SmartHomeFacade.ts, index.ts
│   │   └── decorator/        ← Character.ts, index.ts
│   └── behavioral/
│       ├── strategy/         ← SortStrategy.ts, index.ts
│       └── observer/         ← StockMarket.ts, index.ts
├── examples/
│   └── run-all.ts            ← запускає всі 8 патернів послідовно
├── package.json
├── tsconfig.json
└── .gitignore
```

---

## Встановлення та запуск

### Встановлення залежностей
```bash
npm install
```

### Запуск усіх патернів
```bash
npm run start
```

### Запуск окремого патерна
```bash
npm run run:factory    # Factory Method
npm run run:builder    # Builder
npm run run:singleton  # Singleton
npm run run:adapter    # Adapter
npm run run:facade     # Facade
npm run run:decorator  # Decorator
npm run run:strategy   # Strategy
npm run run:observer   # Observer
```

---

## Висновки

У ході виконання практичної роботи реалізовано **8 класичних патернів GoF** мовою TypeScript.

**Породжувальні патерни** вирішують задачу створення об'єктів:
- **Factory Method** позбавляє клієнтський код від знання конкретних класів — нові типи ворогів додаються без зміни точки виклику.
- **Builder** усуває «telescoping constructor» і дозволяє покроково будувати складний об'єкт через флюентний API.
- **Singleton** гарантує єдиний глобальний стан і запобігає дублюванню ресурсів.

**Структурні патерни** описують, як комбінувати об'єкти:
- **Adapter** дозволяє інтегрувати легасі-компоненти без переписування, лише додавши «обгортку».
- **Facade** знижує зв'язність між клієнтом і складною підсистемою, надаючи зручний єдиний інтерфейс.
- **Decorator** замінює вибухову ієрархію успадкування гнучким ланцюгом обгорток, де кожен шар відповідає лише за свою функцію.

**Поведінкові патерни** описують взаємодію об'єктів:
- **Strategy** дозволяє замінювати алгоритм «на льоту» без зміни контексту, дотримуючись принципу відкритості/закритості (OCP).
- **Observer** реалізує слабку зв'язність між суб'єктом та споживачами — підписники додаються та видаляються незалежно від джерела подій.

Загалом застосування патернів GoF значно покращує **читабельність**, **розширюваність** та **тестованість** коду порівняно з «наївними» реалізаціями.

---

## Корисні посилання

- [Refactoring Guru — Патерни проєктування](https://refactoring.guru/uk/design-patterns)
- [Design Patterns in JavaScript](https://www.patterns.dev/posts/classic-design-patterns/)
- [Head First Design Patterns (book)](https://www.oreilly.com/library/view/head-first-design/0596007124/)
- [Gang of Four (GoF) Patterns Overview](https://www.digitalocean.com/community/tutorials/gangs-of-four-gof-design-patterns)
- [Ти мусиш знати ці патерни проєктування!](https://www.youtube.com/watch?v=Dc6AEjHvpP8)
