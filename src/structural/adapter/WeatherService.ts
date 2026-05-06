// ─── Modern Interface (Target) ────────────────────────────────────────────────
export interface WeatherData {
  city: string;
  tempCelsius: number;
  humidity: number;
  condition: string;
}

export interface IWeatherService {
  getWeather(): WeatherData;
}

// ─── Legacy Service (Adaptee) ─────────────────────────────────────────────────
export class LegacyXMLWeatherService {
  /** Returns weather as a raw XML-like string */
  getWeatherXML(): string {
    return `<weather>
      <city>Kyiv</city>
      <temperature unit="celsius">18</temperature>
      <humidity>65</humidity>
      <condition>Partly Cloudy</condition>
    </weather>`;
  }
}

