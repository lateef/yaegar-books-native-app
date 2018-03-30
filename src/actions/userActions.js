import validator from 'validator';

export function updateEmail(email) {
    return function (dispatch) {
        dispatch({type: 'UPDATE_EMAIL', payload: email});
    }
}
``
export function validateEmail(email) {
    return function (dispatch) {
        if (!validator.isEmail(email)) {
            dispatch({type: 'EMAIL_NOT_VALID', payload: email});
        } else {
            dispatch({type: 'EMAIL_VALID', payload: email})
        }
    }
}