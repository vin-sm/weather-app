import React from 'react';
import './css/NavBar.css';
import weatherIcon from './assets/weather.svg'

function NavBar() {
    return (
    <div className="navbar">
        <div className="left-side">
            <img src={weatherIcon} alt="weatherIcon" className="header-weather-icon" />
            <div className='title'>Weather Forecaster</div>
        </div>
    </div>
    );
}

export default NavBar;