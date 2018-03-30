import validator from 'validator';

export function init() {
    return function (dispatch) {
        dispatch({type: 'INIT'});
    }
}

export function updateEmail(email) {
    return function (dispatch) {
        dispatch({type: 'UPDATE_EMAIL', payload: email});
    }
}

export function validateEmail(email) {
    return function (dispatch) {
        if (!validator.isEmail(email)) {
            dispatch({type: 'EMAIL_NOT_VALID', payload: email});
        } else {
            dispatch({type: 'EMAIL_VALID', payload: email})
        }
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

function passesPasswordTest(password) {
    // at least one digit, one lowercase, one uppercase and minimum 6 characters
    return validator.matches(password, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{6,})$/);
}