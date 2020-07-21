import React, { useState, useEffect } from 'react';
import './Forecast.css';
import DetailForecast from './DetailForecast';

export default function Forecast({ list }) {
    const [selectedDay, setSelectedDay] = useState();
    const forecastHtml = [];
    const forecastByDate = {};
    let minDate = Infinity;

    list.map((item) => {
        const date = new Date(item.dt_txt).getDate();
        if (forecastByDate[date]) {
            forecastByDate[date].push(item);
        } else {
            forecastByDate[date] = [item];
        }
    });

    useEffect(function () {
        setSelectedDay(forecastByDate[minDate]);

        const forecastItem = document.querySelector(
            `.forecast__item[data-date="${minDate}"]`
        );

        forecastItem.classList.add('forecast__item--selected');
    }, []);

    function handleForecastItemClick(e) {
        const forecastItem = e.target.closest('.forecast__item');
        const forecast = forecastItem.closest('.forecast');
        const date = forecastItem.dataset.date;

        forecast
            .querySelector('.forecast__item--selected')
            .classList.remove('forecast__item--selected');
        forecastItem.classList.add('forecast__item--selected');

        setSelectedDay(forecastByDate[date]);
    }

    for (const prop in forecastByDate) {
        let maxClouds = 0;
        let tempMin = Infinity;
        let tempMax = -Infinity;
        let icon;

        const dateForecast = forecastByDate[prop];
        const date = new Date(dateForecast[0].dt_txt).toLocaleDateString();

        minDate = minDate > +prop ? prop : minDate;

        dateForecast.map((item) => {
            if (item.clouds.all > maxClouds) {
                maxClouds = item.clouds.all;
                icon = item.weather[0].icon;
            }

            tempMin =
                item.main.temp_min < tempMin ? item.main.temp_min : tempMin;
            tempMax =
                item.main.temp_max > tempMax ? item.main.temp_max : tempMax;
        });

        forecastHtml.push(
            <div
                key={date}
                className='forecast__item'
                data-date={prop}
                onClick={handleForecastItemClick}
            >
                <div>date: {date}</div>
                <div>
                    <img
                        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                        alt='weather icon'
                    />
                </div>
                <div>min: {tempMin}°</div>
                <div>max: {tempMax}°</div>
            </div>
        );
    }

    return (
        <>
            <div className='forecast'>{forecastHtml}</div>
            {selectedDay ? (
                <DetailForecast
                    className='forecast-detail'
                    list={selectedDay}
                />
            ) : null}
        </>
    );
}
