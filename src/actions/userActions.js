import validator from 'validator';
import uuid from "uuid/v4";

import axios from '../../axios';
import DeviceStorage from '../storage/DeviceStorage';

export function reset() {
    return function (dispatch) {
        new DeviceStorage().removeItem('user_type');
        new DeviceStorage().removeItem('id_token');
        dispatch({
            type: 'USER_RESET'
        });
        dispatch({
            type: 'COMPANY_RESET'
        });
        dispatch({
            type: 'LEDGER_RESET'
        });
    }
}

export function updatePhone(phone) {
    if (!phone.uuid) {
        phone.uuid = uuid();
    }
    return function (dispatch) {
        dispatch({type: 'UPDATE_PHONE', payload: phone});
    }
}

export function setPassword(password) {
    return function (dispatch) {
        dispatch({type: 'SET_PASSWORD', payload: password});
    }
}

export function validatePassword(password) {
    return function (dispatch) {

        if (!password) {
            dispatch({type: 'PASSWORD_VALID', payload: undefined});
        } else if (passesPasswordTest(password)) {
            dispatch({type: 'PASSWORD_VALID', payload: true});
        } else {
            dispatch({type: 'PASSWORD_NOT_VALID', payload: false});
        }
    }
}

export function updateUserWarning(warning) {
    return function (dispatch) {
        dispatch({type: 'USER_WARNING', payload: warning});
    }
}

export function setSmsCode(smsCode) {
    return function (dispatch) {
        dispatch({type: 'SET_SMS_CODE', payload: smsCode});
    }
}

export function createUnregisteredUser() {
    return async function (dispatch) {
        await new DeviceStorage().saveItem('user_type', 'unregisteredUser');
        dispatch({type: 'UPDATE_USER', payload: {uuid: uuid()}});
    }
}

export function register(user) {
    return async function (dispatch) {
        if (!user.uuid) {
            user.uuid = uuid();
        }
        user.userId = null;
        user.phoneNumber = user.phones[0].number;
        return axios.post('/register', user)
            .then(response => {
                let responseUser = response.data;
                if (responseUser) {
                    responseUser.authorities = [];
                    dispatch({type: 'UPDATE_USER', payload: responseUser});
                } else {
                    dispatch({type: 'USER_WARNING', payload: "Failed to register user"});
                }
            })
            .catch(error => {
                console.log(error);
                dispatch({type: 'USER_WARNING', payload: "Failed to register user"});
            });
    }
}

export function confirmUser(user) {
    return async function (dispatch) {
        let userConfirmation = {
            "code": user.smsCode,
            "user": user
        };

        return axios.post('/confirm-user', userConfirmation)
            .then(response => {
                let responseUser = response.data.user;
                if (response.data.confirmed) {
                    responseUser.authorities = [];
                    responseUser.isLoggedIn = true;
                    new DeviceStorage().saveItem('id_token', response.headers.access_token);
                    new DeviceStorage().saveItem('user_type', 'registeredUser');
                    dispatch({type: 'UPDATE_USER', payload: responseUser});
                } else {
                    dispatch({type: 'USER_WARNING', payload: "Failed to confirm user"});
                }
            })
            .catch(error => {
                console.log(error);
                dispatch({type: 'USER_WARNING', payload: "Failed to confirm user"});
            });
    }
}

export function login(user) {
    return async function (dispatch) {
        user.phoneNumber = user.phones[0].number;
        return axios.post('/log-in', user)
            .then(response => {
                let responseUser = response.data;
                if (responseUser) {
                    responseUser.authorities = [];
                    responseUser.isLoggedIn = true;
                    const jwt = JSON.parse(response.headers.access_token);
                    new DeviceStorage().saveItem('id_token', response.headers.access_token);
                    new DeviceStorage().saveItem('user_type', 'registeredUser');
                    dispatch({type: 'UPDATE_USER', payload: responseUser});
                } else {
                    dispatch({type: 'USER_WARNING', payload: "Failed to log in user"});
                }
            })
            .catch(error => {
                console.log(error);
                dispatch({type: 'USER_WARNING', payload: "Failed to log in user"});
            });
    }
}

export function isLoggedIn() {
    return function (dispatch) {
        new DeviceStorage().getItem('id_token')
            .then(user => {
                dispatch({type: 'UPDATE_USER_LOGIN_STATE', payload: !!(user)});
            });
    };
}

export function logout() {
    return async function (dispatch) {
        new DeviceStorage().saveItem('user_type', 'registeredUser');
        new DeviceStorage().removeItem('id_token');
        dispatch({type: 'LOGOUT_USER', payload: {isLoggedIn: false}});
    }
}

function passesPasswordTest(password) {
    // at least one digit, one lowercase, one uppercase and minimum 6 characters
    return validator.matches(password, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{6,})$/);
}