import reducer from '../../src/reducers/userReducer';

describe('User reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            error: null,
            user: {
                passCode: null,
                passCodeMatch: false,
                accessGranted: false
            }
        });
    });

    it('should handle UPDATE_PASSCODE', () => {
        const action = {type: 'UPDATE_PASSCODE', payload: 'passcode'};

        expect(reducer([], action)).toEqual({error: null, user: {passCode: 'passcode'}});
    });

    it('should handle UPDATE_PASSCODE_MATCH', () => {
        const action = {type: 'UPDATE_PASSCODE_MATCH', payload: true};

        expect(reducer([], action)).toEqual({error: null, user: {passCodeMatch: true}});
    });

    it('should handle UPDATE_ACCESS_GRANTED', () => {
        const action = {type: 'UPDATE_ACCESS_GRANTED', payload: true};

        expect(reducer([], action)).toEqual({error: null, user: {accessGranted: true}});
    });
});