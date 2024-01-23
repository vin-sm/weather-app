import React from 'react';
import './css/WeatherCard.css'
import celsiusIcon from './assets/degreeIcon.svg'
import warningIcon from './assets/warningIcon.svg'
import rightArrow from './assets/rightArrow.svg';

interface WeatherCardProps {
    weatherData: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
    const baseUrl = "https://openweathermap.org/img/wn/";
    const fullUrl = baseUrl + weatherData.icon + "@2x.png";
    return (
        <div className='weather-card'>
            <div className='weather-name-view'>
                <div>{weatherData.name}</div>
                <button><img src={rightArrow} alt="rightArrow" /></button>
            </div>
            <div className='temperature-view'>
                <div className='temperature'>
                    <div>{Math.floor(weatherData.temperature)}</div>
                    <img src={celsiusIcon} alt='celsiusIcon' />
                </div>
                <img src={fullUrl} alt='weatherIcon' />
            </div>
            <div className='detail-view'>
                {(weatherData.clouds >= 75) ?
                    <div className='warning-view'>
                        <img src={warningIcon} alt='celsiusIcon' />
                        <div>Warning</div> </div> : <div> </div>}
                <div className='description'>{weatherData.description}</div>
            </div>
        </div >
    );
};

export default WeatherCard;