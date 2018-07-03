import SInfo from 'react-native-sensitive-info';
import validator from 'validator';
import UserAccountQueries from "../models/queries/UserAccountQueries";

const options = {sharedPreferencesName: 'mySharedPrefs', keychainService: 'myKeychain'};

export async function initUser(uuid) {
    const userAccounts = await new UserAccountQueries().list();

    if (userAccounts.length === 0) {
        const userAccount = {
            uuid: uuid,
            default: true,
            name: 'My Personal Account'
        };
        await saveUser(userAccount, false);
    }
}

export function updateUserAccount(userAccount) {
    return function (dispatch) {
        dispatch({type: 'UPDATE_USER_ACCOUNT', payload: userAccount});
    }
}

export function save(userAccount, update) {
    return async function (dispatch) {
        await saveUser(userAccount, update);
        dispatch({type: 'GET_USER', payload: userAccount});
    }
}

export function findByUuid(uuid) {//return default user if no argument is passed
    return async function (dispatch) {
        let userAccount = null;
        if (uuid) {
            userAccount = await new UserAccountQueries().findByUuid(uuid);
        } else {
            const userAccounts = await new UserAccountQueries().list();
            userAccount = userAccounts.filter(userAccount => userAccount.default === true)[0];
        }
        dispatch({
            type: 'GET_USER',
            payload: userAccount
        });
    }
}

export function updatePassCode(passCode, save) {
    if (passCode !== null) {
        if (Number.isNaN(passCode) || passCode.toString().length !== 4) {
            return
        }
    }

    if (save) {
        if (passCode) {
            SInfo.setItem('passCode', passCode, options);
            return function (dispatch) {
                dispatch({type: 'UPDATE_PASSCODE', payload: null});
                dispatch({type: 'UPDATE_PASSCODE_MATCH', payload: true});
            }
        } else {
            SInfo.deleteItem('passCode', options);
            return function (dispatch) {
                dispatch({type: 'UPDATE_PASSCODE', payload: null});
                dispatch({type: 'UPDATE_PASSCODE_MATCH', payload: false});
            }
        }
    }
    return function (dispatch) {
        dispatch({type: 'UPDATE_PASSCODE', payload: passCode});
    }
}

export function grantAccess(passCode) {
    return async function (dispatch) {
        return await SInfo.getItem('passCode', options)
            .then((value) => {
                if (value === passCode) {
                    dispatch({type: 'UPDATE_ACCESS_GRANTED', payload: true});
                } else {
                    dispatch({type: 'UPDATE_ACCESS_GRANTED', payload: false});
                }
            });
    }
}

export function updatePhone(phone) {
    return function (dispatch) {
        dispatch({type: 'UPDATE_PHONE', payload: phone});
    }
}

export function setPassword(password) {
    return function (dispatch) {
        dispatch({type: 'SET_PASSWORD', payload: password});
    }
}

export function setPasswordAgain(password) {
    return function (dispatch) {
        dispatch({type: 'SET_PASSWORD_AGAIN', payload: password});
    }
}

export function validatePassword(password1, password2) {
    return function (dispatch) {

        if (passesPasswordTest(password1) || passesPasswordTest(password2)) {
            dispatch({type: 'SET_PASSWORD', payload: password1});
            if (password2.length > 0) {
                confirmPassword(password1, password2, dispatch);
            }
        } else {
            dispatch({type: 'PASSWORD_NOT_VALID', payload: password1});
        }
    }
}

export function completeRegistration(smsCode) {
    return async function (smsCode) {
        return true;
    }
}

export function listUserAccounts(dispatchType, isBusiness) {
    return async function (dispatch) {
        const userAccounts = await new UserAccountQueries().listByAccountType(isBusiness);
        dispatch({type: dispatchType, payload: userAccounts});
    }
}

function confirmPassword(password1, password2, dispatch) {
    if (!passesPasswordTest(password2)) {
        return;
    }
    if (!validator.equals(password1, password2)) {
        dispatch({type: 'PASSWORD_NOT_MATCHED', payload: password2});
    } else {
        dispatch({type: 'PASSWORD_MATCHED', payload: password1});
    }
}

function saveUser(userAccount, update) {
    new UserAccountQueries().save(userAccount, update);
}

function passesPasswordTest(password) {
    // at least one digit, one lowercase, one uppercase and minimum 6 characters
    return validator.matches(password, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{6,})$/);
}
