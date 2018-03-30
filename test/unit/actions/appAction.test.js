import logger from 'redux-logger';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import promise from 'redux-promise-middleware';

import * as actions from '../../../src/actions/appActions';

const mockStore = configureStore([promise(), thunk, logger]);

describe('App action', () => {
    it('should create an action on init', () => {
        const expectedActions = [{type: 'NAVIGATION_CHANGE', payload: 'init'}];
        const action = actions.onInit();
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });
});