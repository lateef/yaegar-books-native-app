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
    it('should return no action when passcode is not a number', () => {
        const action1 = actions.updatePassCode('passcode', false);
        expect(action1).toEqual(undefined);

        const action2 = actions.updatePassCode('', false);
        expect(action2).toEqual(undefined);
    });

    it('should return no action when passcode is not 4 digits', () => {
        const action1 = actions.updatePassCode(123, false);
        expect(action1).toEqual(undefined);

        const action2 = actions.updatePassCode(12345, false);
        expect(action2).toEqual(undefined);

    });

    // it('should return get user action', () => {
    //     const expectedActions = [{"type": "GET_USER", "payload": 'uuid'}];
    //     const action = actions.findByUuid('uuid');
    //     const store = mockStore({}, action);
    //
    //     store.dispatch(action);
    //
    //     expect(store.getActions()).toEqual(expectedActions);
    // });

    it('should return update userAccount action', () => {

        const userAccount = {uuid: 'uuid'};
        const expectedActions = [{type: "UPDATE_USER_ACCOUNT", payload: userAccount}];
        const action = actions.updateUserAccount(userAccount);
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should return update passcode action', () => {
        const expectedActions = [{type: "UPDATE_PASSCODE", payload: 1234}];
        const action = actions.updatePassCode(1234, false);
        const store = mockStore({}, action);

        store.dispatch(action);

        expect(store.getActions()).toEqual(expectedActions);
    });

    // it('should return update access granted action', () => {
    //     const expectedActions = [{"type": "UPDATE_ACCESS_GRANTED", "payload": true}];
    //     const action = actions.grantAccess(1234);
    //     const store = mockStore({}, action);
    //
    //     store.dispatch(action);
    //
    //     expect(store.getActions()).toEqual(expectedActions);
    // });

    it('should return an update phone action', () => {

        const phone = {code: 234, number: 808080};
        const expectedActions = [{type: 'UPDATE_PHONE', payload: phone}];
        const action = actions.updatePhone(phone);
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

    // it('should return list accounts action', () => {
    //     const expectedActions = [{type: "LIST_PERSONAL_USER_ACCOUNTS", payload: {}}];
    //     const action = actions.listUserAccounts('LIST_PERSONAL_USER_ACCOUNTS', false);
    //     const store = mockStore({}, action);
    //
    //     store.dispatch(action);
    //
    //     expect(store.getActions()).toEqual(expectedActions);
    // });
});