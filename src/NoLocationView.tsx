import React, { useEffect, useState } from "react";
import "./css/NoLocationView.css";
import searchIcon from "./assets/searchIcon.svg";
import noLoactionIcon from "./assets/noLoactionIcon.svg";
import WeatherCard from "./WeatherCard";
import { useSelector } from "react-redux";
import { useAppSelector } from "./store/configureStore";
import WeatherDetailView from "./WeatherDetailView";

function NoLocationView() {
  const { weatherInfos } = useAppSelector((state) => state.data);

  const [searchText, setSearchText] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const addSearchTag = () => {
    if (searchText.trim() !== "") {
      // setTags([...tags, searchText.trim()]);
      setSearchText("");
      fetchData(searchText.trim());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const API_KEY = "7abea1c2a90addf6e25624a5c05413af";
  // const CITY = 'Bangalore';

  // useEffect(() => {
  const fetchData = async (city: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("Weather data not available");
      }

      const data = await response.json();
      const parsedData: WeatherData = {
        key: Date.now(),
        id: data.weather[0].id,
        name: data.name,
        temperature: data.main.temp,
        main: data.weather[0].main,
        icon: data.weather[0].icon,
        description: data.weather[0].description,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        // rain: data.rain['1h'],
        clouds: data.clouds.all,
        isAdded: false,
        // Parse more data properties as needed
      };
      setWeatherData(parsedData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // }, [API_KEY, CITY]);

  return (
    <div className="no-location-view">
      <div className="search-container">
        <input
          type="text"
          value={searchText}
          onChange={handleInputChange}
          className="search-input"
          placeholder="Search Location"
        />
        <button type="submit" className="search-button" onClick={addSearchTag}>
          <img src={searchIcon} alt="Search Icon" />
        </button>
      </div>
      <div className="tag-container">
        {tags.map((tag, index) => (
          <div key={index} className="tag">
            {tag}
          </div>
        ))}
      </div>
      {
    //   weatherInfos != undefined && weatherInfos.length != 0 ? (
    //     <div className="weather-card-view">
    //       <WeatherDetailView />
    //     </div>
    //   ) : 
      weatherData ? (
        <div className="weather-card-view">
          <WeatherCard weatherData={weatherData} />
        </div>
      ) : (
        <div className="no-location-title">
          <img src={noLoactionIcon} alt="noLoactionIcon" />
          <div>No locations added to watchlist</div>
        </div>
      )}
    </div>
  );
}

export default NoLocationView;
