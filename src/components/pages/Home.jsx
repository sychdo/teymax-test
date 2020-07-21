import { connect } from 'react-redux';
import { weatherActions } from './../../behavior/weather';
import React, { useState } from 'react';
import Weather from '../widgets/Weather';
import Forecast from '../widgets/Forecast';

const Home = ({ loadSelectedCityWeather, currentWeather, forecast }) => {
    const [searchValue, setSearchValue] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        loadSelectedCityWeather(searchValue);
    };

    return (
        <>
            <div>
                <form action='#' onSubmit={handleFormSubmit}>
                    <h1>Select city</h1>
                    <input
                        type='text'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button>Go</button>
                </form>
            </div>

            {currentWeather ? <Weather weather={currentWeather} /> : null}
            {forecast ? <Forecast list={forecast} /> : null}
        </>
    );
};

const mapDispatchToProps = { ...weatherActions };

const mapStateToProps = ({ weather }) => ({
    currentWeather: weather.currentWeather,
    forecast: weather.forecast,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
