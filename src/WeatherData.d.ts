interface WeatherData {
  key: number;
  id: string;
  name: string;
  temperature: number;
  main: string;
  icon: string;
  description: string;
  pressure: number;
  humidity: string;
  // rain: number;
  clouds: number;
  isAdded: boolean;
}

interface WeatherDataState {
  weatherInfos: WeatherData[]
}