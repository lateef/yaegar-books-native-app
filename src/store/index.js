import { applyMiddleware, createStore } from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import reducer from '../reducers';

let middleware = [promise(), thunk];

if (__DEV__) {
    middleware = middleware.concat(logger);
}

export default createStore(reducer, applyMiddleware(...middleware));