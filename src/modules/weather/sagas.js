import { call, put, takeLatest } from "redux-saga/effects"
import axios from "axios"

import {
  TODAY_WEATHER,
  FORECAST,
  todayWeatherRequestSuccess,
  todayWeatherRequestFail,
  forecastRequestSuccess,
  forecastRequestFail,
} from "./actions"
import { API_KEY } from "config"
import { getErrorMessage } from "utils/auth-helpers"

import { notification } from "antd"

export function* todayWeatherRequestHandler({ payload }) {
  const params = {
    url: `/weather?id=${payload.currentCityId}&appid=${API_KEY}`,
    method: "get",
  }
  try {
    const res = yield call(axios.request, params)
    yield put(todayWeatherRequestSuccess(res.data))
  } catch (err) {
    const res = todayWeatherRequestFail(getErrorMessage(err.response))
    yield put(res)
    notification.open({
      message: "Error Found",
      description: res.payload,
    })
  }
}

export function* forecastRequestHandler({ payload }) {
  const params = {
    url: `/forecast?id=${payload.currentCityId}&appid=${API_KEY}`,
    method: "get",
  }
  try {
    const res = yield call(axios.request, params)
    yield put(forecastRequestSuccess(res.data))
  } catch (err) {
    const res = forecastRequestFail(getErrorMessage(err.response))
    yield put(res)
    notification.open({
      message: "Error Found",
      description: res.payload,
    })
  }
}

export default function* weatherSaga() {
  yield takeLatest(TODAY_WEATHER, todayWeatherRequestHandler)
  yield takeLatest(FORECAST, forecastRequestHandler)
}
