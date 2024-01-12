import React from 'react';
import './css/WeatherDetailView.css'
import arrowBackIcon from './assets/arrowBack.svg'
import checkIcon from './assets/checkIcon.svg';
import sunIcon from './assets/sunIcon.svg';
import shareIcon from './assets/shareIcon.svg';
import celsiusIcon from './assets/degreeIcon.svg'
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import { useLocation } from 'react-router-dom';
import { saveObject, removeObject } from './store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import store, { useAppSelector } from './store/configureStore';

function WeatherDetailView() {
    const {weatherInfos} = useAppSelector((state) => state.data);
    // console.log(weatherInfos);
    // if (isAdded) {
        // const weatherDetails = useSelector((state: WeatherDataState) => state.weatherInfos);
        // console.log(`selectore: ${weatherDetails}`);
    // }
    const navigate = useNavigate();
    const { state } = useLocation();
    const { type } = state || {};
    const [weatherData, setWeatherData] = useState(type as WeatherData);
    // useWeatherData(weatherData.key);

    function goToHome() {
        navigate('/');
    }

    function addDataToList() {
        
        if (weatherData != null && weatherData != undefined) {
            const newItems = {...weatherData};
            newItems.isAdded = true
            console.log(newItems);
            setWeatherData(newItems);
            // console.log(`afterSetData: ${weatherData}`);
            store.dispatch(saveObject(newItems));
            // console.log(`updatedData: ${weatherData}`);
        }
    }
    function removeDataFromList() {
        if (weatherData != null && weatherData != undefined) {
            // console.log(weatherData);
            const newItems = {...weatherData};
            newItems.isAdded = false
            setWeatherData(newItems);
            store.dispatch(removeObject(newItems.key));
            // console.log(`removeData: ${weatherData}`);
        }
    }
    return (
        <div className='weather-detail-view'>
            <div className='header-view'>
                <button onClick={goToHome}>
                    <img src={arrowBackIcon} alt="arrowBackIcon" />
                    <div>Back</div>
                </button>
                <div className='actions'>
                    {(weatherData != null && weatherData.isAdded)
                    ?
                        <div className='added-list'>
                            <div className='added-to-list'>
                                <div>Added to list</div>
                                <img src={checkIcon} alt='checkIcon' />
                            </div>
                            <button onClick={removeDataFromList}>Remove</button>
                        </div>
                        : <div className='add-to-list'>
                            <button onClick={addDataToList}>
                                <div className='add-to-list-label'>Add To List</div>
                                <div className='plus-label'>+</div>
                            </button>
                        </div>
                    }
                </div>
            </div>
            <div className='detail-page'>
                <img src={sunIcon} alt="sunIcon" className='weather-icon'/>
                <div className='city-name'>
                    <div>{weatherData.name}</div>
                    <img src={shareIcon} alt='shareIcon' />
                </div>
                <div className='temperature'>
                    <div>{weatherData.temperature}</div>
                    <img src={celsiusIcon} alt='celsiusIcon' />
                </div>
                <div className='weather-detail'>
                    <div>
                        <div className='heading'>TIME</div>
                        <div className='sub-heading'>11:07 A.M</div>
                    </div>
                    <div>
                        <div className='heading'>PRESSURE</div>
                        <div className='sub-heading'>{weatherData.pressure}</div>
                    </div>
                    <div>
                        <div className='heading'>%RAIN</div>
                        <div className='sub-heading'>{weatherData.pressure}</div>
                    </div>
                    <div>
                        <div className='heading'>HUMIDITY</div>
                        <div className='sub-heading'>{weatherData.humidity}</div>
                    </div>
                </div>
                <div className='sunrise-sunset-view'>
                    <div className='sunrise-sunset-title'>SUNRISE & SUNSET</div>
                </div>
            </div>
        </div>
    );
}

export default WeatherDetailView;