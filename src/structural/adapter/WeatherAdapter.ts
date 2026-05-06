import { LegacyXMLWeatherService, IWeatherService, WeatherData } from './WeatherService';

// ─── Adapter ──────────────────────────────────────────────────────────────────
export class WeatherAdapter implements IWeatherService {
  private legacy: LegacyXMLWeatherService;

  constructor(legacy: LegacyXMLWeatherService) {
    this.legacy = legacy;
  }

  getWeather(): WeatherData {
    const xml = this.legacy.getWeatherXML();

    const extract = (tag: string): string => {
      const match = xml.match(new RegExp(`<${tag}[^>]*>([^<]+)<\/${tag}>`));
      return match ? match[1].trim() : '';
    };

    return {
      city:        extract('city'),
      tempCelsius: parseFloat(extract('temperature')),
      humidity:    parseFloat(extract('humidity')),
      condition:   extract('condition'),
    };
  }
}

