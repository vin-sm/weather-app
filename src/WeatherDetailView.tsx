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
  
  function goToHome() {
    navigate("/");
  }
  function addDataToList() {
    if (weatherData != null && weatherData != undefined) {
      const newItems = { ...weatherData };
      newItems.isAdded = true;
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