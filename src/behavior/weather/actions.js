import types from './types';

const apiKey = '024ebc14324a2c20cca5995fb66ad8bf';
const baseUrl = 'https://api.openweathermap.org/data/2.5';

const loadSelectedCityWeather = (cityName) => {
    return (dispatch, getState, api) => {
        Promise.all([
            api.fetch(
                `${baseUrl}/weather?units=metric&q=${cityName}&appid=${apiKey}`
            ),
            api.fetch(
                `${baseUrl}/forecast?units=metric&q=${cityName}&appid=${apiKey}`
            ),
        ]).then(
            ([
                {
                    name,
                    main,
                    sys: { sunrise, sunset },
                    weather: [{ description, icon }],
                },
                { list },
            ]) => {
                dispatch(
                    setCityWeather({
                        name,
                        main,
                        sunrise,
                        sunset,
                        description,
                        icon,
                    })
                );
                dispatch(setCityForecast(list));
            }
        );
    };
};

const setCityForecast = (payload) => {
    return {
        type: types.setForecast,
        payload,
    };
};

const setCityWeather = (data) => {
    return {
        type: types.setWeather,
        payload: data,
    };
};

export default {
    loadSelectedCityWeather,
};
