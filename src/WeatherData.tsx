interface WeatherData {
    id: String;
    name: String;
    temperature: number;
    main: String;
    icon: String;
    description: String;
    pressure: number;
    humidity: String;
    // rain: number;
    clouds: number;
}

export default WeatherData;