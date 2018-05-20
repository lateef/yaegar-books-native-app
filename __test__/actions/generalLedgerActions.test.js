import logger from 'redux-logger';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import promise from 'redux-promise-middleware';

import * as actions from '../../src/actions/generalLedgerActions';

const mockStore = configureStore([promise(), thunk, logger]);

describe('General ledger action', () => {
    it('should return an update name action', () => {
        const expectedActions = [{type: 'UPDATE_NAME', payload: 'a'}];
        const action = actions.updateName('a');
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });
});