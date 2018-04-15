import logger from 'redux-logger';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import promise from 'redux-promise-middleware';
import fetchMock from 'fetch-mock'

import * as actions from '../../src/actions/userActions';

const mockStore = configureStore([promise(), thunk, logger]);

afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
});

describe('User action', () => {
    it('should return init action', () => {
        const expectedActions = [{"type": "INIT"}];
        const action = actions.init();
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should return reset action', () => {
        const expectedActions = [{"type": "RESET"}];
        const action = actions.reset();
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should return an update email action', () => {
        const expectedActions = [{type: 'UPDATE_EMAIL', payload: 'a'}];
        const action = actions.updateEmail('a');
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should return an email not valid action', () => {
        const expectedActions = [{type: 'EMAIL_NOT_VALID', payload: 'a'}];
        const action = actions.validateEmail('a');
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should return a email valid action', () => {
        const expectedActions = [{type: 'EMAIL_VALID', payload: 'email@email.com'}];
        const action = actions.validateEmail('email@email.com');
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should return a set password action', () => {
        const expectedActions = [{type: 'SET_PASSWORD', payload: 'pass'}];
        const action = actions.setPassword('pass');
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should return a set password again action', () => {
        const expectedActions = [{type: 'SET_PASSWORD_AGAIN', payload: 'password'}];
        const action = actions.setPasswordAgain('password');
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should return password not valid action', () => {
        const expectedActions = [{type: 'PASSWORD_NOT_VALID', payload: 'password'}];
        const action = actions.validatePassword('password', 'password');
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should return password not matched action', () => {
        const expectedActions = [
            {type: 'SET_PASSWORD', payload: 'Qq1111'},
            {type: 'PASSWORD_NOT_MATCHED', payload: 'Qq11111'}
        ];
        const action = actions.validatePassword('Qq1111', 'Qq11111');
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should return password again not matched action', () => {
        const expectedActions = [{type: 'SET_PASSWORD', payload: 'Qq1111'}];
        const action = actions.validatePassword('Qq1111', 'QQ1111');
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should return empty password again not matched action', () => {
        const expectedActions = [{type: 'SET_PASSWORD', payload: 'Qq1111'}];
        const action = actions.validatePassword('Qq1111', '');
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should return password matched action', () => {
        const expectedActions = [
            {type: 'SET_PASSWORD', payload: 'Qq1111'},
            {type: 'PASSWORD_MATCHED', payload: 'Qq1111'}
        ];
        const action = actions.validatePassword('Qq1111', 'Qq1111');
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should return register failed action when sign up failed', async () => {
        const action = actions.signUp({email: 'email'});
        const store = mockStore({}, action);

        fetchMock.once('https://fail-on-purpose/', {throws: {message:'InvalidParameterException: Missing required parameter'}});

        return store.dispatch(action).then(() => {
            expect(store.getActions()[0].type).toBe('REGISTER_FAILED');
        });
    });

    it('should return register success action when sign up succeed', async () => {
        const action = actions.signUp({email: 'email'});
        const store = mockStore({}, action);

        fetchMock.once('https://cognito-idp.eu-west-1.amazonaws.com/', {body: {}});

        return store.dispatch(action).then(() => {
            expect(store.getActions()[0].type).toBe('REGISTER_SUCCEEDED');
        });
    });

    it('should return login failed action when log in failed', async () => {
        const action = actions.logIn({email: 'email', password: 'password'});
        const store = mockStore({}, action);

        fetchMock.once('https://fail-on-purpose/', {throws: {message:'InvalidParameterException: Missing required parameter'}});

        return store.dispatch(action).then(() => {
            expect(store.getActions()[0].type).toBe('LOGIN_FAILED');
        });
    });

    // it('should return login success action when log in succeed', async () => {
    //     const action = actions.logIn({email: 'email', password: 'password'});
    //     const store = mockStore({}, action);
    //
    //     fetchMock.once('https://cognito-idp.eu-west-1.amazonaws.com/', {body: jest.fn()});
    //
    //     return store.dispatch(action).then(() => {
    //         expect(store.getActions()[0].type).toBe('LOGIN_SUCCEEDED');
    //     });
    // });

    // it('should return log out action', () => {
    //    const action = actions.logout();
    //     const store = mockStore({}, action);
    //
    //     fetchMock.once('https://cognito-idp.eu-west-1.amazonaws.com/', {body: {}});
    //
    //     return store.dispatch(action).then(() => {
    //         expect(store.getActions()[0].type).toBe('LOGGED_OUT');
    //     });
    // });

    // it('should return clear log out action', () => {
    //     const expectedActions = [{"type": "CLEAR_LOGGED_OUT"}];
    //     const action = actions.clearLogout();
    //     const store = mockStore({}, action);
    //
    //     store.dispatch(action);
    //
    //     expect(store.getActions()).toEqual(expectedActions);
    // });

    // it('should return unregister action', () => {
    //    const action = actions.unregister();
    //     const store = mockStore({}, action);
    //
    //     fetchMock.once('https://cognito-idp.eu-west-1.amazonaws.com/', {body: {}});
    //
    //     return store.dispatch(action).then(() => {
    //         expect(store.getActions()[0].type).toBe('UNREGISTER_SUCCEEDED');
    //     });
    // });

    it('should fail forgotPassword action', () => {
        const action = actions.forgotPassword();
        const store = mockStore({}, action);

        fetchMock.once('https://fail/', {body: {}});

        return store.dispatch(action).then(() => {
            expect(store.getActions()[0].type).toBe('FORGOT_PASSWORD_SENT_FAILED');
        });
    });

    // it('should return forgotPassword action', () => {
    //     const action = actions.forgotPassword();
    //     const store = mockStore({}, action);
    //
    //     fetchMock.once('https://cognito-idp.eu-west-1.amazonaws.com/', {body: {}});
    //
    //     return store.dispatch(action).then(() => {
    //         expect(store.getActions()[0].type).toBe('FORGOT_PASSWORD_SENT');
    //     });
    // });

    it('should fail forgotPasswordReset action', () => {
        const action = actions.forgotPasswordReset();
        const store = mockStore({}, action);

        fetchMock.once('https://fail/', {body: {}});

        return store.dispatch(action).then(() => {
            expect(store.getActions()[0].type).toBe('PASSWORD_RESET_FAILED');
        });
    });

    // it('should return forgotPasswordReset action', () => {
    //     const action = actions.forgotPasswordReset();
    //     const store = mockStore({}, action);
    //
    //     fetchMock.once('https://cognito-idp.eu-west-1.amazonaws.com/', {body: {}});
    //
    //     return store.dispatch(action).then(() => {
    //         expect(store.getActions()[0].type).toBe('PASSWORD_RESET');
    //     });
    // });

    it('should return reset code action', () => {
        const expectedActions = [{type: 'SET_CODE', payload: '11111'}];
        const action = actions.setResetCode('11111');
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should return can delete action', () => {
        const expectedActions = [{type: 'CAN_DELETE', payload: true}];
        const action = actions.setCanDelete('delete');
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });
});