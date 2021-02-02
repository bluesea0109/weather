export const selectWeatherState = (state) => state.weather
export const selectTodayWeather = (state) => state.weather.todayWeather
export const selectForecast = (state) => state.weather.forecast
export const selectError = (state) => state.data.error
