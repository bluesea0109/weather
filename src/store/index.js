import { createStore, applyMiddleware, compose } from "redux"
import { routerMiddleware } from "react-router-redux"
import createSagaMiddleware from "redux-saga"
import * as createHistory from "history"
import rootReducer from "modules/reducers"
import sagas from "modules/sagas"

export const history = createHistory.createBrowserHistory()

const initialState = {}
const enhancers = []

const sagaMiddleware = createSagaMiddleware()

const middleware = [sagaMiddleware, routerMiddleware(history)]

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers)

const store = createStore(rootReducer, initialState, composedEnhancers)

sagaMiddleware.run(sagas)

export default store
