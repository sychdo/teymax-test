import React from 'react';
import { connect } from 'react-redux';
import { weatherActions } from './../../behavior/weather';

function Weather({ weather }) {
    const { icon, main, description, name, sunrise, sunset } = weather;
    const { temp, feels_like, humidity, pressure } = main;
    const iconSrc = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString('uk-ua');
    const sunsetTime = new Date(sunset * 1000).toLocaleTimeString('uk-ua');

    return (
        <div className='weather'>
            <div className='weather__title'>Current weather in {name} city</div>
            <div className='weather__icon'>
                <img src={iconSrc} alt='weather icon' />
                <div className='weather__description'>{description}</div>
            </div>
            <div className='weather__temperature'>Temperature: {temp}°C</div>
            <div className='weather__feels-like'>
                Feels like: {feels_like}°C
            </div>
            <div className='weather__humidity'>Humidity: {humidity}</div>
            <div className='weather__preasure'>Pressure: {pressure}</div>
            <div className='weather__sunrise'>Sunrise: {sunriseTime}</div>
            <div className='weather__sunset'>Sunset: {sunsetTime}</div>
        </div>
    );
}

const mapStateToProps = ({ weather }) => {
    return { weather: weather.currentWeather };
};

const mapDispatchToProps = { ...weatherActions };

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
