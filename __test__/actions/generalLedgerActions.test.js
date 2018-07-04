import logger from 'redux-logger';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import promise from 'redux-promise-middleware';

import * as actions from '../../src/actions/generalLedgerActions';

const mockStore = configureStore([promise(), thunk, logger]);

describe('General ledger action', () => {
    it('should return an update name action', () => {
        const name = 'Income';
        const expectedActions = [{type: 'UPDATE_GENERAL_LEDGERS_NAME', payload: name}];
        const action = actions.updateName(name);
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should return a save action', () => {
        //## should pass in class to method so we can mock. *****Investigate*****

        // let generalLedger = {name: 'Income', description: 'Income'};
        // const expectedActions = [{type: 'SAVE_GENERAL_LEDGERS', payload: generalLedger}];
        // const action = actions.save(generalLedger);
        // const store = mockStore({}, action);
        //
        // store.dispatch(action);
        //
        // expect(store.getActions()).toEqual(expectedActions);
    });

    it('should return an update profile action', () => {
        const profile = {uuid: 'uuid'};
        const expectedActions = [{type: 'UPDATE_GENERAL_LEDGERS_PROFILE', payload: profile}];
        const action = actions.updateProfile(profile);
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should return an update owner uuid action', () => {
        const uuid = 'uuid';
        const expectedActions = [{type: 'UPDATE_GENERAL_LEDGERS_OWNER_UUID', payload: uuid}];
        const action = actions.updateOwnerUuid(uuid);
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should return an update parent uuid action', () => {
        const uuid = 'uuid';
        const expectedActions = [{type: 'UPDATE_GENERAL_LEDGERS_PARENT_UUID', payload: uuid}];
        const action = actions.updateParentUuid(uuid);
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should return an update classifier action', () => {
        const classifier = 'Bank';
        const expectedActions = [{type: 'UPDATE_GENERAL_LEDGERS_CLASSIFIER', payload: classifier}];
        const action = actions.updateClassifier(classifier);
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });
});