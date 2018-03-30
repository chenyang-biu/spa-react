import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'

import rootReducers from '../reducers'

let composeEnhancers = compose

if (typeof window === 'object' && process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-underscore-dangle
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
}

// TODO SSR
export default function configureStore(preloaedState = {}) {
  const middlewares = applyMiddleware(thunk)
  const store = createStore(
    rootReducers,
    preloaedState,
    composeEnhancers(middlewares),
  )

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducers)
    })
  }

  return store
}
