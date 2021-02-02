import { handleActions } from "redux-actions"

import { successAction, failAction } from "utils/state-helpers"

import { TODAY_WEATHER, FORECAST } from "./actions"

const initialState = {
  todayWeather: null,
  forecast: [],
  status: null,
  error: null,
}

export default handleActions(
  {
    [TODAY_WEATHER]: (state, { type }) => ({
      ...state,
      todayWeather: null,
      status: type,
      error: null,
    }),

    [successAction(TODAY_WEATHER)]: (state, { payload, type }) => ({
      ...state,
      todayWeather: payload,
      status: type,
      error: null,
    }),

    [failAction(TODAY_WEATHER)]: (state, { payload, type }) => ({
      ...state,
      todayWeather: null,
      status: type,
      error: payload,
    }),

    [FORECAST]: (state, { type }) => ({
      ...state,
      forecast: null,
      status: type,
      error: null,
    }),

    [successAction(FORECAST)]: (state, { payload, type }) => ({
      ...state,
      forecast: payload.list,
      status: type,
      error: null,
    }),

    [failAction(FORECAST)]: (state, { payload, type }) => ({
      ...state,
      forecast: payload.list,
      status: type,
      error: payload,
    }),
  },
  initialState,
)
