import reducer from '../../src/reducers/userReducer';

describe('User reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            error: null,
            user: {
                passCode: null,
                passCodeMatch: false,
                accessGranted: false,
                phones: [],
                password: "",
                passwordAgain: ""
            }
        });
    });

    it('should handle GET_USER_ACCOUNT', () => {
        const action = {type: 'GET_USER_ACCOUNT', payload: 'uuid'};

        expect(reducer([], action)).toEqual({error: null, user: {uuid: 'uuid'}});
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

    it('should handle UPDATE_PHONE', () => {
        const action = {type: 'UPDATE_PHONE', payload: {code: 234, number:808080}};

        expect(reducer({user: {phones: []}}, action)).toEqual({error: null, user: {phones: [{code: 234, number: 808080}]}});
    });

    it('should return ok if SET_PASSWORD', () => {
        const action = {type: 'SET_PASSWORD', payload: 'pass'};
        const expectedState = {error: null, user: {password: "pass", passwordMatched: false}};

        expect(reducer([], action)).toEqual(expectedState);
    });

    it('should return ok if SET_PASSWORD_AGAIN', () => {
        const action = {type: 'SET_PASSWORD_AGAIN', payload: 'password'};
        const expectedState = {error: null, user: {passwordAgain: "password", passwordMatched: false}};

        expect(reducer([], action)).toEqual(expectedState);
    });

    it('should return ok if PASSWORD_NOT_VALID', () => {
        const action = {type: 'PASSWORD_NOT_VALID', payload: 'pass'};
        const expectedState = {user: {password: "pass", passwordMatched: false}};

        expect(reducer([], action)).toEqual(expectedState);
    });

    it('should return ok if PASSWORD_NOT_MATCHED', () => {
        const action = {type: 'PASSWORD_NOT_MATCHED', payload: 'pass'};
        const expectedState = {user: {passwordAgain: "pass", passwordMatched: false}};

        expect(reducer([], action)).toEqual(expectedState);
    });

    it('should return ok if PASSWORD_MATCHED', () => {
        const action = {type: 'PASSWORD_MATCHED', payload: 'pass'};
        const expectedState = {user: {passwordMatched: true}};

        expect(reducer([], action)).toEqual(expectedState);
    });
});