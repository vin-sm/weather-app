interface WeatherData {
  id: number;
  name: string;
  temperature: number;
  main: string;
  icon: string;
  description: string;
  pressure: number;
  humidity: string;
  rain: number;
  clouds: number;
  isAdded: boolean;
  date: string;
  dayLength: string;
  dayLight: string;
}

interface WeatherDataState {
  weatherInfos: WeatherData[]
}