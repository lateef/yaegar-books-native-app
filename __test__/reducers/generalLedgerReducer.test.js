import reducer from '../../src/reducers/generalLedgerReducer';

describe('General ledger reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            error: null,
            generalLedger:
                    {code: null, description: "", name: "", ownerUuid: "GUEST", parentUuid: "", type: "", uuid: ""},
                accounts: [],
                categories: []
            });
    });

    it('should handle UPDATE_GENERAL_LEDGERS_NAME', () => {
        const action = {type: 'UPDATE_GENERAL_LEDGERS_NAME', payload: 'My Bank'};

        expect(reducer([], action)).toEqual({error: null, generalLedger: {name: "My Bank"}}
        );
    });

    it('should handle UPDATE_GENERAL_LEDGERS_TYPE', () => {
        const action = {type: 'UPDATE_GENERAL_LEDGERS_TYPE', payload: 'Bank'};

        expect(reducer([], action)).toEqual({error: null, generalLedger: {type: "Bank"}}
        );
    });

    it('should handle UPDATE_GENERAL_LEDGERS_PARENT_UUID', () => {
        const action = {type: 'UPDATE_GENERAL_LEDGERS_PARENT_UUID', payload: 'uuid'};

        expect(reducer([], action)).toEqual({error: null, generalLedger: {parentUuid: "uuid"}}
        );
    });

    it('should handle UPDATE_GENERAL_LEDGERS_CLASSIFIER', () => {
        const action = {type: 'UPDATE_GENERAL_LEDGERS_CLASSIFIER', payload: 'Bank'};

        expect(reducer([], action)).toEqual({error: null, generalLedger: {classifier: "Bank"}}
        );
    });

    it('should handle LIST_GENERAL_LEDGERS_ACCOUNTS', () => {
        const action = {type: 'LIST_GENERAL_LEDGERS_ACCOUNTS', payload: ['Bank', null]};

        expect(reducer([], action)).toEqual({error: null, accounts: ["Bank"]}
        );
    });

    it('should handle LIST_GENERAL_LEDGERS_CATEGORIES', () => {
        const action = {type: 'LIST_GENERAL_LEDGERS_CATEGORIES', payload: ['Salary', null]};

        expect(reducer([], action)).toEqual({error: null, categories: ["Salary"]}
        );
    });
});