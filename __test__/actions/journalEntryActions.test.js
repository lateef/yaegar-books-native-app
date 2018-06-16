import logger from 'redux-logger';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import promise from 'redux-promise-middleware';

import * as actions from '../../src/actions/journalEntryActions';

const mockStore = configureStore([promise(), thunk, logger]);

describe('Journal entry action', () => {
    it('should return an update transaction time action', () => {
        const date = new Date();
        const expectedActions = [{type: 'UPDATE_JOURNAL_ENTRY_TRANSACTION_DATETIME', payload: date}];
        const action = actions.updateTransactionDateTime(date);
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should return an update primary general ledger action', () => {
        const generalLedger = {name: "Salary"};
        const expectedActions = [{type: 'UPDATE_PRIMARY_GENERAL_LEDGER', payload: generalLedger}];
        const action = actions.updateGeneralLedger(generalLedger, 'primary');
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should return an update secondary general ledger action', () => {
        const generalLedger = {name: "Salary"};
        const expectedActions = [{type: 'UPDATE_SECONDARY_GENERAL_LEDGER', payload: generalLedger}];
        const action = actions.updateGeneralLedger(generalLedger, 'secondary');
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should return an update amount action', () => {
        const amount = 20.0;
        const expectedActions = [{type: 'UPDATE_JOURNAL_ENTRY_AMOUNT', payload: amount}];
        const action = actions.updateAmount(amount);
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should return an update primary journal entry side action', () => {
        const journalEntrySide = 'CREDIT';
        const expectedActions = [{type: 'UPDATE_PRIMARY_JOURNAL_ENTRY_SIDE', payload: journalEntrySide}];
        const action = actions.updateJournalEntrySide(journalEntrySide, 'primary');
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should return an update secondary journal entry side action', () => {
        const journalEntrySide = 'CREDIT';
        const expectedActions = [{type: 'UPDATE_SECONDARY_JOURNAL_ENTRY_SIDE', payload: journalEntrySide}];
        const action = actions.updateJournalEntrySide(journalEntrySide, 'secondary');
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });

    // it('should return a save action', () => {
    //     const primaryJournalEntry = {amount: 20.0};
    //     const expectedActions = [{type: 'SAVE_JOURNAL_ENTRY', payload: primaryJournalEntry}];
    //     const action = actions.save(primaryJournalEntry);
    //     const store = mockStore({}, action);
    //
    //     store.dispatch(action);
    //
    //     expect(store.getActions()).toEqual(expectedActions);
    // });

    it('should return an update primary journal entry side action', () => {
        const journalEntrySide = 'CREDIT';
        const expectedActions = [{type: 'UPDATE_PRIMARY_JOURNAL_ENTRY_SIDE', payload: journalEntrySide}];
        const action = actions.updateJournalEntrySide(journalEntrySide, 'primary');
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should return an update secondary journal entry side action', () => {
        const journalEntrySide = 'CREDIT';
        const expectedActions = [{type: 'UPDATE_SECONDARY_JOURNAL_ENTRY_SIDE', payload: journalEntrySide}];
        const action = actions.updateJournalEntrySide(journalEntrySide, 'secondary');
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });

    // it('should return a get journal entry action', () => {
    //     const expectedActions = [{type: 'GET_JOURNAL_UUID', payload: [{journalEntrySide: 'DEBIT'}]}];
    //     const action = actions.list();
    //     const store = mockStore({}, action);
    //
    //     store.dispatch(action);
    //
    //     expect(store.getActions()).toEqual(expectedActions);
    // });

    // it('should return a get journal entry action', () => {
    //     const expectedActions = [{type: 'GET_JOURNAL_UUID', payload: {primaryJournalEntry: {amount: 50}}}];
    //     const action = actions.findByUuid();
    //     const store = mockStore({}, action);
    //
    //     store.dispatch(action);
    //
    //     expect(store.getActions()).toEqual(expectedActions);
    // });
});