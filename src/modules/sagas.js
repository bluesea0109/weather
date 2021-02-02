import { all } from "redux-saga/effects"

import weatherSagas from "./weather/sagas"

export default function* rootSaga() {
  yield all([weatherSagas()])
}
