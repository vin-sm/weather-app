import React from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { ChartOptions, CategoryScale } from 'chart.js';
Chart.register(CategoryScale);

interface WeatherData {
  day: string;
  temperatureMax: number;
  temperatureMin: number;
}

interface WeatherForecastChartProps {
  forecastData: WeatherData[];
}

const WeatherForecastChart: React.FC<WeatherForecastChartProps> = ({ forecastData }) => {

  const labels = forecastData.map((day) => day.day);
  const temperatureMax = forecastData.map((day) => day.temperatureMax);
  const temperatureMin = forecastData.map((day) => day.temperatureMin);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: '',
        data: temperatureMax,
        fill: 'origin', // 'origin' fills the area below the line
        borderColor: 'rgba(255, 99, 132, 0.2)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: '',
        data: temperatureMin,
        fill: '-1', // '-1' fills the area above the line
        borderColor: 'rgba(54, 162, 235, 0.2)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },
    ],
  };

  // const chartOptions: ChartOptions<'line'> = {
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //     },
  //   },
  // };

  return (
    <div>
      <Line data={chartData}/>
    </div>
  );
};

export default WeatherForecastChart;
