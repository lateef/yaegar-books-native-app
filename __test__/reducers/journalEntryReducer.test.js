import reducer from '../../src/reducers/journalEntryReducer';

describe('Journal entry reducer', () => {
    // it('should return initial state', () => {
    //     expect(reducer(undefined, {})).toEqual({
    //         error: null,
    //         journalEntry: {
    //             uuid: '',
    //             transactionDatetime: new Date(),  /*variable date breaking test*/
    //             generalLedger: {name: 'Select Category', uuid: 'noUuid'},
    //             amount: 0,
    //             ownerUuid: 'GUEST'
    //         }
    //     });
    // });

    it('should handle UPDATE_JOURNAL_ENTRY_TRANSACTION_DATETIME', () => {
        const date = new Date();
        const action = {type: 'UPDATE_JOURNAL_ENTRY_TRANSACTION_DATETIME', payload: date};

        expect(reducer([], action)).toEqual({error: null, journalEntry: {transactionDatetime: date}}
        );
    });

    it('should handle UPDATE_GENERAL_LEDGER', () => {
        const action = {type: 'UPDATE_GENERAL_LEDGER', payload: {name: "Salary"}};

        expect(reducer([], action)).toEqual({error: null, journalEntry: {generalLedger: {name: "Salary"}}}
        );
    });

    it('should handle UPDATE_JOURNAL_ENTRY_AMOUNT', () => {
        const action = {type: 'UPDATE_JOURNAL_ENTRY_AMOUNT', payload: 20.0};

        expect(reducer([], action)).toEqual({error: null, journalEntry: {amount: 20.00}}
        );
    });

    it('should handle UPDATE_JOURNAL_ENTRY_SIDE', () => {
        const action = {type: 'UPDATE_JOURNAL_ENTRY_SIDE', payload: 'DEBIT'};

        expect(reducer([], action)).toEqual({error: null, journalEntry: {journalEntrySide: 'DEBIT'}}
        );
    });

    it('should handle SAVE_JOURNAL_ENTRY', () => {
        const action = {type: 'SAVE_JOURNAL_ENTRY', payload: {amount: 20.0}};

        expect(reducer([], action)).toEqual({error: null, journalEntry: {amount: 20.00}}
        );
    });

    it('should handle LIST_JOURNAL_ENTRIES', () => {
        const action = {type: 'LIST_JOURNAL_ENTRIES', payload: [{journalEntrySide: 'DEBIT'}, null]};

        expect(reducer([], action)).toEqual({error: null, journalEntries: [{journalEntrySide: 'DEBIT'}]}
        );
    });

    it('should handle GET_JOURNAL_UUID', () => {
        const action = {type: 'GET_JOURNAL_UUID', payload: {amount: 50}};

        expect(reducer([], action)).toEqual({error: null, journalEntry: {amount: 50}}
        );
    });
});