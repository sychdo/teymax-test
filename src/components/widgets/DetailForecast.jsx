import React from 'react';
import './DetailForecast.css';

export default function DetailForecast({ list }) {
    return (
        <div className='forecast-detail'>
            <div className='forecast-detail__item'>
                <div>Time</div>
                <div className='forecast-detail__icon'></div>
                <div>Temperature</div>
                <div>Feels like</div>
                <div>Pressure</div>
                <div>Humidity</div>
                <div>Wind speed</div>
            </div>
            {list.map((item) => {
                return (
                    <div className='forecast-detail__item' key={item.dt}>
                        <div>
                            {new Date(item.dt_txt).toLocaleTimeString('uk-ua')}
                        </div>
                        <div className='forecast-detail__icon'>
                            <img
                                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                alt='weather icon'
                            />
                        </div>
                        <div>{item.main.temp}</div>
                        <div>{item.main.feels_like}</div>
                        <div>{item.main.pressure}</div>
                        <div>{item.main.humidity}</div>
                        <div>{item.wind.speed}</div>
                    </div>
                );
            })}
        </div>
    );
}
