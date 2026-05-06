import { LegacyXMLWeatherService } from './WeatherService';
import { WeatherAdapter } from './WeatherAdapter';

export function run(): void {
  console.log('\n=== Adapter: Legacy XML Weather → Modern JSON ===');

  const legacy  = new LegacyXMLWeatherService();
  const adapter = new WeatherAdapter(legacy);

  console.log('\n  [Legacy XML output]:');
  console.log(legacy.getWeatherXML().split('\n').map(l => `  ${l}`).join('\n'));

  console.log('\n  [Adapted modern object]:');
  const data = adapter.getWeather();
  console.log(`  City:      ${data.city}`);
  console.log(`  Temp:      ${data.tempCelsius}°C`);
  console.log(`  Humidity:  ${data.humidity}%`);
  console.log(`  Condition: ${data.condition}`);
}

if (require.main === module) {
  run();
}

