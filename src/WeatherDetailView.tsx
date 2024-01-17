import React from "react";
import "./css/WeatherDetailView.css";
import WeatherDetailViewCard from "./WeatherDeatailViewCard";
import arrowBackIcon from "./assets/arrowBack.svg";
import checkIcon from "./assets/checkIcon.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { saveObject, removeObject } from "./store/reducer";
import store from "./store/configureStore";

function WeatherDetailView() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { type } = state || {};
  const [weatherData, setWeatherData] = useState(type as WeatherData);
  console.log(weatherData);
  fetchForecastInfo(weatherData.name);
  function goToHome() {
    navigate("/");
  }

  function addDataToList() {
    if (weatherData != null && weatherData != undefined) {
      const newItems = { ...weatherData };
      newItems.isAdded = true;
      console.log(newItems);
      setWeatherData(newItems);
      store.dispatch(saveObject(newItems));
    }
  }
  function removeDataFromList() {
    if (weatherData != null && weatherData != undefined) {
      const newItems = { ...weatherData };
      newItems.isAdded = false;
      setWeatherData(newItems);
      store.dispatch(removeObject(newItems.id));
    }
  }
  return (
    <div className="weather-detail-view">
      <div className="header-view">
        <button onClick={goToHome}>
          <img src={arrowBackIcon} alt="arrowBackIcon" />
          <div>Back</div>
        </button>
        <div className="actions">
          {weatherData != null && weatherData.isAdded ? (
            <div className="added-list">
              <div className="added-to-list">
                <div>Added to list</div>
                <img src={checkIcon} alt="checkIcon" />
              </div>
              <button onClick={removeDataFromList}>Remove</button>
            </div>
          ) : (
            <div className="add-to-list">
              <button onClick={addDataToList}>
                <div className="add-to-list-label">Add To List</div>
                <div className="plus-label">+</div>
              </button>
            </div>
          )}
        </div>
      </div>
      <WeatherDetailViewCard weatherData={weatherData} isFromDashboard ={false}  />
    </div>
  );
}

export default WeatherDetailView;

function fetchForecastInfo(city: string) {
    console.log("fetchForecastInfo", city)
    const API_KEY = "7abea1c2a90addf6e25624a5c05413af";
    const fetchData = async (city: string) => {
        try {
            console.log("fetchForecastInfo", city)
            const response = await fetch(
                `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
            );

            if (!response.ok) {
                throw new Error("Forecast data not available");
            }

            const data = await response.json();
            console.log(data)
                const parsedData: WeatherData = {
                    id: data.id,
                    name: data.name,
                    temperature: data.main.temp,
                    main: data.weather[0].main,
                    icon: data.weather[0].icon,
                    description: data.weather[0].description,
                    pressure: data.main.pressure,
                    humidity: data.main.humidity,
                    rain: (data.rain != undefined || data.rain != null) ? data.rain["1h"] * 100 : 0,
                    clouds: data.clouds.all,
                    isAdded: false,
                    date: data.dt_txt,
                    dayLength: '',
                    dayLight: '',
                };
                // setWeatherData(parsedData);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };
    return fetchData;
}