import { combineReducers } from "redux"
import { reducer as form } from "redux-form"

import weatherReducer from "./weather/reducers"

const rootReducer = combineReducers({
  form,
  weather: weatherReducer,
})

export default rootReducer
