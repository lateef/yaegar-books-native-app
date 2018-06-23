import logger from 'redux-logger';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import promise from 'redux-promise-middleware';
import fetchMock from 'fetch-mock'

import * as actions from '../../src/actions/userActions';

const mockStore = configureStore([promise(), thunk, logger]);

afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
});

describe('User action', () => {
    it('should return no action when passcode is not a number', () => {
        const action1 = actions.updatePassCode('passcode', false);
        expect(action1).toEqual(undefined);

        const action2 = actions.updatePassCode('', false);
        expect(action2).toEqual(undefined);
    });

    it('should return no action when passcode is not 4 digits', () => {
        const action1 = actions.updatePassCode(123, false);
        expect(action1).toEqual(undefined);

        const action2 = actions.updatePassCode(12345, false);
        expect(action2).toEqual(undefined);

    });

    it('should return update passcode action', () => {
        const expectedActions = [{"type": "UPDATE_PASSCODE", "payload": 1234}];
        const action = actions.updatePassCode(1234, false);
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });

    // it('should return update access granted action', () => {
    //     const expectedActions = [{"type": "UPDATE_ACCESS_GRANTED", "payload": true}];
    //     const action = actions.grantAccess(1234);
    //     const store = mockStore({}, action);
    //
    //     store.dispatch(action);
    //
    //     expect(store.getActions()).toEqual(expectedActions);
    // });
});