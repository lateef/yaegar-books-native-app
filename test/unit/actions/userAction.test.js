import logger from 'redux-logger';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import promise from 'redux-promise-middleware';

import * as actions from '../../../src/actions/userActions';

const mockStore = configureStore([promise(), thunk, logger]);

describe('User action', () => {
    it('should return an update email action', () => {
        const expectedActions = [{type: 'UPDATE_EMAIL', payload: 'a'}];
        const action = actions.updateEmail('a');
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should return an email not valid action', () => {
        const expectedActions = [{type: 'EMAIL_NOT_VALID', payload: 'a'}];
        const action = actions.validateEmail('a');
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should return an email valid action', () => {
        const expectedActions = [{type: 'EMAIL_VALID', payload: 'email@email.com'}];
        const action = actions.validateEmail('email@email.com');
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });
});