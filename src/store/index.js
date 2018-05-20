import {applyMiddleware, createStore, compose} from 'redux';
import {persistCombineReducers} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import reducers from '../reducers';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [],
    stateReconciler: autoMergeLevel2
};

const combinedReducer = persistCombineReducers(persistConfig, reducers);

let middleware = [promise(), thunk];

if (__DEV__) {
    middleware = middleware.concat(logger);
}

export default createStore(combinedReducer, compose(applyMiddleware(...middleware)));