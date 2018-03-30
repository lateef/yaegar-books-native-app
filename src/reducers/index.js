import {combineReducers} from 'redux';

import appReducer from './appReducer';
import userReducer from './userReducer';

export default combineReducers({
    appReducer, userReducer
})