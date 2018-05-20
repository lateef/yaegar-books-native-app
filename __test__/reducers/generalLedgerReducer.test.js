import reducer from '../../src/reducers/generalLedgerReducer';

describe('General ledger reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            error: null,
            generalLedger: {name: ""},
            list: []
        });
    });

    it('should handle UPDATE_NAME', () => {
        const action = {type: 'UPDATE_NAME', payload: 'Bank'};

        expect(reducer([], action)).toEqual({error: null, generalLedger: {"name": "Bank"}}
        );
    });
});