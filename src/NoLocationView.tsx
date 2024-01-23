import React, { useState } from "react";
import "./css/NoLocationView.css";
import searchIcon from "./assets/searchIcon.svg";
import noLoactionIcon from "./assets/noLoactionIcon.svg";
import WeatherCard from "./WeatherCard";
import store, { useAppSelector } from "./store/configureStore";
import CarouselView from "./CarouselView";
import { removeObject } from "./store/reducer";
import { Link } from "react-router-dom";
import { differenceInSeconds } from "date-fns";

function NoLocationView() {
  const { weatherInfos } = useAppSelector((state) => state.data);
  const [searchText, setSearchText] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [addedWeatherData, setAddedWeatherData] = useState(weatherInfos);

  const addSearchTag = () => {
    if (searchText.trim() !== "") {
      const tag: string[] = [];
      weatherInfos.map((data) => {
        tag.push(data.name);
      });
      setTags(tag);
      setAddedWeatherData([]);
      setSearchText("");
      fetchedData(searchText.trim());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const fetchedData = fetchWeatherInfo(weatherInfos, setWeatherData);

  const handleClick = (data: WeatherData) => {
    if (data != null && data != undefined) {
      store.dispatch(removeObject(data.id));
      const newData = addedWeatherData.filter((item) => item.id !== data.id);
      setAddedWeatherData(newData);
    }
  };

  return (
    <div className="no-location-view">
      <div className="search-container">
        <input
          type="text"
          autoComplete="on"
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
      {addedWeatherData != undefined && addedWeatherData.length != 0 ? (
        <div className="weather-detail-card-view">
          <CarouselView
            weatherInfo={addedWeatherData}
            onRemoveClick={handleClick}
          />
        </div>
      ) : weatherData ? (
        <div className="weather-card-view">
          <Link
            to="/details"
            state={{ type: weatherData }}
            style={{ textDecoration: "none" }}
          >
            <WeatherCard weatherData={weatherData} />
          </Link>
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

function fetchWeatherInfo(
  weatherInfos: WeatherData[],
  setWeatherData: React.Dispatch<React.SetStateAction<WeatherData | null>>
) {
  const API_KEY = "7abea1c2a90addf6e25624a5c05413af";
  const fetchData = async (city: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("Weather data not available");
      }

      const data = await response.json();
      const newData = weatherInfos.find((item) => item.id == data.id);
      if (newData != null && newData != undefined) {
        setWeatherData(newData);
      } else {
        const sunriseDate = new Date(data.sys.sunrise * 1000);
        const sunsetDate = new Date(data.sys.sunset * 1000);

        // Calculate the day length in seconds
        const dayLengthInSeconds = differenceInSeconds(sunsetDate, sunriseDate);

        // Convert the length of the day from milliseconds to hours and minutes
        const hours = Math.floor(dayLengthInSeconds / 3600);
        const minutes = Math.floor((dayLengthInSeconds % 3600) / 60);
        // Get the current timestamp
        const currentTimestamp = Date.now();

        // Calculate the remaining daylight in seconds
        const remainingDaylightSeconds = differenceInSeconds(
          sunsetDate,
          currentTimestamp
        );
        // Convert remaining daylight from seconds to hours and minutes
        const remainingHours = Math.floor(remainingDaylightSeconds / 3600);
        const remainingMinutes = Math.floor(
          (remainingDaylightSeconds % 3600) / 60
        );
        
        const parsedData: WeatherData = {
          id: data.id,
          name: data.name,
          temperature: data.main.temp,
          icon: data.weather[0].icon,
          description: data.weather[0].description,
          pressure: data.main.pressure,
          humidity: data.main.humidity,
          rain:
            data.rain != undefined || data.rain != null
              ? data.rain["1h"] * 100
              : 0,
          clouds: data.clouds.all,
          isAdded: false,
          date: data.timezone,
          dayLength: `${hours}H ${minutes}M`,
          dayLight: `${remainingHours}H ${remainingMinutes}M`,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset
        };
        setWeatherData(parsedData);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
  return fetchData;
}
