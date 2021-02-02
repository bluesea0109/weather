import { createAction } from "redux-actions"

import { successAction, failAction } from "utils/state-helpers"

/**
 * Constants
 */

export const TODAY_WEATHER = "TODAY_WEATHER"
export const FORECAST = "FORECAST"

/**
 * Actions
 */

export const todayWeatherRequest = createAction(TODAY_WEATHER)
export const todayWeatherRequestSuccess = createAction(
  successAction(TODAY_WEATHER),
)
export const todayWeatherRequestFail = createAction(failAction(TODAY_WEATHER))

export const forecastRequest = createAction(FORECAST)
export const forecastRequestSuccess = createAction(successAction(FORECAST))
export const forecastRequestFail = createAction(failAction(FORECAST))
