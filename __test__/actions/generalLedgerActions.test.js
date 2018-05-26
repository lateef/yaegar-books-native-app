import logger from 'redux-logger';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import promise from 'redux-promise-middleware';

import * as actions from '../../src/actions/generalLedgerActions';

const mockStore = configureStore([promise(), thunk, logger]);

describe('General ledger action', () => {
    it('should return an update name action', () => {
        const name = 'Income';
        const expectedActions = [{type: 'UPDATE_NAME', payload: name}];
        const action = actions.updateName(name);
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should return a save action', () => {
        //## should pass in class to method so we can mock. *****Investigate*****

        // let generalLedger = {name: 'Income', description: 'Income'};
        // const expectedActions = [{type: 'SAVE', payload: generalLedger}];
        // const action = actions.save(generalLedger);
        // const store = mockStore({}, action);
        //
        // store.dispatch(action);
        //
        // expect(store.getActions()).toEqual(expectedActions);
    });

    it('should return an update parent uuid action', () => {
        const uuid = 'uuid';
        const expectedActions = [{type: 'UPDATE_PARENT_UUID', payload: uuid}];
        const action = actions.updateParentUuid(uuid);
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });
});