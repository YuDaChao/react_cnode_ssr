import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux'
import reduxThunk from 'redux-thunk'
import {
  routerReducer,
  routerMiddleware,
} from 'react-router-redux'
import reducers from '../reducer'

function createAppStore(history, preloadedState = {}) {
  let composeEnhancers = compose;

  if (typeof window !== 'undefined') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }

  const routeMiddleware = routerMiddleware(history);
  const middlewares = [
    routeMiddleware,
    reduxThunk,
  ];
  const store = createStore(
    combineReducers({
      ...reducers,
      router: routerReducer,
    }),
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );
  return store
}

export default createAppStore
