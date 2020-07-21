import types from './types';

const initialState = {
    currentWeather: undefined,
    forecast: undefined,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.setWeather:
            return { ...state, currentWeather: action.payload };
        case types.setForecast:
            return { ...state, forecast: action.payload };
        default:
            return state;
    }
};

export default reducer;
