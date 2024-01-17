import React from "react";
import shareIcon from "./assets/shareIcon.svg";
import celsiusIcon from "./assets/degreeIcon.svg";
import { format } from "date-fns";
import WeatherChart from "./WeatherForecastGraph";

interface WeatherCardProps {
  weatherData: WeatherData;
  isFromDashboard: boolean;
  onRemoveClick?: (data: WeatherData) => void;
}

const WeatherDetailViewCard: React.FC<WeatherCardProps> = ({
  weatherData,
  isFromDashboard,
  onRemoveClick,
}) => {
  const baseUrl = "https://openweathermap.org/img/wn/";
  const fullUrl = baseUrl + weatherData.icon + "@2x.png";
  const weatherInfo = [
    { day: "Day 1", temperatureMax: 25, temperatureMin: 18 },
    { day: "Day 2", temperatureMax: 27, temperatureMin: 20 },
    { day: "Day 3", temperatureMax: 22, temperatureMin: 15 },
    { day: "Day 4", temperatureMax: 20, temperatureMin: 14 },
    { day: "Day 5", temperatureMax: 23, temperatureMin: 17 },
  ];

  const handleClick = () => {
    if (onRemoveClick != null) {
      onRemoveClick(weatherData);
    }
  };
  return (
    <div>
      {isFromDashboard ? (
        <div className="remove-button-view">
          <button onClick={handleClick}>Remove</button>
        </div>
      ) : null}
      <div className="detail-page">
        <img src={fullUrl} alt="fullUrl" className="weather-icon" />
        <div className="city-name">
          <div>{weatherData.name}</div>
          <img src={shareIcon} alt="shareIcon" />
        </div>
        <div className="temperature">
          <div>{Math.floor(weatherData.temperature)}</div>
          <img src={celsiusIcon} alt="celsiusIcon" />
        </div>
        <div className="weather-detail">
          <div>
            <div className="heading">TIME</div>
            <div className="sub-heading">{format(new Date(), "hh:mm a")}</div>
          </div>
          <div>
            <div className="heading">PRESSURE</div>
            <div className="sub-heading">{weatherData.pressure}</div>
          </div>
          <div>
            <div className="heading">%RAIN</div>
            <div className="sub-heading">
              {weatherData.rain == undefined ? "-" : weatherData.rain}
            </div>
          </div>
          <div>
            <div className="heading">HUMIDITY</div>
            <div className="sub-heading">{weatherData.humidity}</div>
          </div>
        </div>
        <div className="sunrise-sunset-view">
          <div className="sunrise-sunset-title">SUNRISE & SUNSET</div>
          <div className="weather-grapgh">
            <WeatherChart forecastData={weatherInfo} />
          </div>
          <div className="day-info">
            <div className="length-of-day">
              <div className="day-title">Length of day: </div>
              <div className="day-sub-title">{weatherData.dayLength}</div>
            </div>
            <div className="length-of-day">
              <div className="day-title">Remaining daylight: </div>
              <div className="day-sub-title">{weatherData.dayLight}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetailViewCard;
