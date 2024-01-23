interface WeatherData {
  id: number;
  name: string;
  temperature: number;
  icon: string;
  description: string;
  pressure: number;
  humidity: string;
  rain: number;
  clouds: number;
  isAdded: boolean;
  date: number;
  dayLength: string;
  dayLight: string;
}

interface WeatherDataState {
  weatherInfos: WeatherData[]
}