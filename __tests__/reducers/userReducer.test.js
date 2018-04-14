import reducer from '../../src/reducers/userReducer';

describe('User reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            error: null,
            user: {
                email: "",
                isLoggedIn: false,
                password: "",
                passwordAgain: "",
                phoneNumber: ""
            }
        });
    });

    it('should handle RESET', () => {
        const action = {type: 'RESET', payload: 'a'};

        expect(reducer([], action)).toEqual({error: null, user:
            {email: "", hasSentForgottenPassword: false, isLoggedIn: false, isLoggedOut: false,
                password: "", passwordAgain: "", passwordMatched: false, passwordReset: false,
                phoneNumber: "", resetCode: null}}
        );
    });

    it('should handle UPDATE_EMAIL', () => {
        const action = {type: 'UPDATE_EMAIL', payload: 'a'};

        expect(reducer([], action)).toEqual({error: null, user: {email: "a"}});
    });

    it('should handle LOGGED_OUT', () => {
        const action = {type: 'LOGGED_OUT', payload: ''};

        expect(reducer([], action)).toEqual({error: null, user: {hasSentForgottenPassword: false,
            isLoggedIn: false, isLoggedOut: true, password: "", passwordAgain: "", passwordMatched: false,
            passwordReset: false, phoneNumber: "", resetCode: null}}
        );
    });

    it('should handle CLEAR_LOGGED_OUT', () => {
        const action = {type: 'CLEAR_LOGGED_OUT', payload: ''};

        expect(reducer([], action)).toEqual({user: {isLoggedOut: false}}
        );
    });

    it('should handle second request to UPDATE_EMAIL', () => {
        const action = {type: 'UPDATE_EMAIL', payload: 'ad'};
        const expectedState = {"0": {error: null, user: {email: "a"}}, error: null, user: {email: "ad"}};

        expect(reducer([{error: null, user: {email: "a"}}], action)).toEqual(expectedState);
    });

    it('should return error message if EMAIL_NOT_VALID', () => {
        const action = {type: 'EMAIL_NOT_VALID', payload: 'ad'};
        const expectedState = {error: "That's not a valid email address", user: {email: "ad"}};

        expect(reducer([], action)).toEqual(expectedState);
    });

    it('should return ok if EMAIL_VALID', () => {
        const action = {type: 'EMAIL_VALID', payload: 'email@email.com'};
        const expectedState = {error: null, user: {email: "email@email.com"}};

        expect(reducer([], action)).toEqual(expectedState);
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

    it('should return error if REGISTER_FAILED', () => {
        const action = {type: 'REGISTER_FAILED', payload: {invalidCredentialsMessage:'missing email or password'}};
        const expectedState = {error: 'missing email or password', user: {"passwordMatched": false}};

        expect(reducer([], action)).toEqual(expectedState);
    });

    it('should return error if UNREGISTER_SUCCEEDED', () => {
        const action = {type: 'UNREGISTER_SUCCEEDED', payload: {}};
        const expectedState = {user: {email: '', password: '', passwordAgain: '', phoneNumber: '', unregistered: true,
            isLoggedIn: false, hasSentForgottenPassword: false, passwordReset: false}, error: null};

        expect(reducer([], action)).toEqual(expectedState);
    });

    it('should return error if FORGOT_PASSWORD_SENT', () => {
        const action = {type: 'FORGOT_PASSWORD_SENT', payload: {}};
        const expectedState = {user: {hasSentForgottenPassword: true}, error: null};

        expect(reducer([], action)).toEqual(expectedState);
    });

    it('should return error if FORGOT_PASSWORD_SENT_FAILED', () => {
        const action = {type: 'FORGOT_PASSWORD_SENT_FAILED', payload: 'failed'};
        const expectedState = {error: 'failed'};

        expect(reducer([], action)).toEqual(expectedState);
    });

    it('should return error if PASSWORD_RESET', () => {
        const action = {type: 'PASSWORD_RESET', payload: {}};
        const expectedState = {user: {passwordReset: true}, error: null};

        expect(reducer([], action)).toEqual(expectedState);
    });

    it('should return error if PASSWORD_RESET_FAILED', () => {
        const action = {type: 'PASSWORD_RESET_FAILED', payload: 'failed'};
        const expectedState = {user: {passwordReset: false}, error: 'failed'};

        expect(reducer([], action)).toEqual(expectedState);
    });

    it('should return error if SET_CODE', () => {
        const action = {type: 'SET_CODE', payload: '11111'};
        const expectedState = {user: {resetCode: '11111'}, error: null};

        expect(reducer([], action)).toEqual(expectedState);
    });
});