import reducer from '../../src/reducers/generalLedgerReducer';

describe('General ledger reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            error: null,
            generalLedger:
                    {code: null, description: "", name: "", ownerUuid: "GUEST", parentUuid: "", type: "", uuid: ""},
                list: []
            });
    });

    it('should handle UPDATE_NAME', () => {
        const action = {type: 'UPDATE_NAME', payload: 'My Bank'};

        expect(reducer([], action)).toEqual({error: null, generalLedger: {name: "My Bank"}}
        );
    });

    it('should handle UPDATE_TYPE', () => {
        const action = {type: 'UPDATE_TYPE', payload: 'Bank'};

        expect(reducer([], action)).toEqual({error: null, generalLedger: {type: "Bank"}}
        );
    });

    it('should handle UPDATE_PARENT_UUID', () => {
        const action = {type: 'UPDATE_PARENT_UUID', payload: 'Bank'};

        expect(reducer([], action)).toEqual({error: null, generalLedger: {parentUuid: "Bank"}}
        );
    });

    it('should handle LIST', () => {
        const action = {type: 'LIST', payload: ['Bank', null]};

        expect(reducer([], action)).toEqual({error: null, list: ["Bank"]}
        );
    });
});