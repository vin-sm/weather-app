import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
Chart.register(CategoryScale);

interface WeatherChartProps {
  city: string;
}
interface WeatherData {
city: {sunrise: number},
  list: {
    dt: number;
    sys: { pod: 'd' | 'n' };
  }[];
}

const WeatherChart: React.FC<WeatherChartProps> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const API_KEY = "7abea1c2a90addf6e25624a5c05413af";

    const fetchWeatherData = async () => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
          );
          const data = await response.json();
          setWeatherData(data);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      };

      fetchWeatherData();
  }, []);

  const createChartData = () => {
    const timestamps = weatherData?.list.map(() => []);
    const dayNight = weatherData?.list.map(entry => (entry.sys.pod === 'd' ? 10 : 20));

    return {
      labels: timestamps,
      datasets: [
        {
          label: 'Day',
          data: dayNight,
          borderColor: 'blue',
          backgroundColor: 'blue',
          fill: true,
        }
      ],
    };
  };

  return (
    <div>
      {weatherData && (
        <Line
          data={createChartData()}
          options={{
            responsive: true
          }}
        />
      )}
    </div>
  );
};

export default WeatherChart;
