import reducer from '../../../src/reducers/userReducer';

describe('User reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({"error": null, "user": {"email": ""}});
    });

    it('should handle UPDATE_EMAIL', () => {
        const action = {type: 'UPDATE_EMAIL', payload: 'a'};

        expect(reducer([], action)).toEqual({"error": null, "user": {"email": "a"}});
    });

    it('should handle second request to UPDATE_EMAIL', () => {
        const action = {type: 'UPDATE_EMAIL', payload: 'ad'};
        const expectedState = {"0": {"error": null, "user": {"email": "a"}}, "error": null, "user": {"email": "ad"}};

        expect(reducer([{"error": null, "user": {"email": "a"}}], action)).toEqual(expectedState);
    });

    it('should return error message if EMAIL_NOT_VALID', () => {
        const action = {type: 'EMAIL_NOT_VALID', payload: 'ad'};
        const expectedState = {"error": "That's not a valid email address", "user": {"email": "ad"}};

        expect(reducer([], action)).toEqual(expectedState);
    });

    it('should return ok if EMAIL_VALID', () => {
        const action = {type: 'EMAIL_VALID', payload: 'email@email.com'};
        const expectedState = {"error": null, "user": {"email": "email@email.com"}};

        expect(reducer([], action)).toEqual(expectedState);
    });
});