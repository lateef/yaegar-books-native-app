const user = {
    phones: [],
    password: '',
    isLoggedIn: false,
    error: null
};
const defaultState = {
    user: user
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'USER_RESET': {
            return {...state, user: {...user}}
        }
        case 'SET_USER_UUID': {
            return {...state, user: {...state.user, uuid: action.payload}}
        }
        case 'UPDATE_PHONE': {
            if (state.user.phones) {
                state.user.phones.splice(0, 1, action.payload);
            } else {
                state.user.phones = [];
            }
            return {...state, user: {...state.user, phones: state.user.phones, error: null}}
        }
        case 'SET_PASSWORD': {
            return {...state, user: {...state.user, password: action.payload, error: null}}
        }
        case 'PASSWORD_VALID': {
            return {...state, user: {...state.user, passwordValid: action.payload, error: null}}
        }
        case 'PASSWORD_NOT_VALID': {
            return {...state, user: {...state.user, passwordValid: action.payload, error: null}}
        }
        case 'SET_SMS_CODE': {
            return {...state, user: {...state.user, smsCode: action.payload, error: null}}
        }
        case 'UPDATE_USER': {
            return {...state, user: {...state.user, ...action.payload}}
        }
        case 'UPDATE_USER_LOGIN_STATE': {
            return {...state, user: {...state.user, isLoggedIn: action.payload}}
        }
        case 'USER_WARNING': {
            return {...state, user: {...state.user, error: action.payload}}
        }
        case 'LOGOUT_USER': {
            return {...state, user: {...state.user, ...action.payload, error: null}}
        }
        default:
            return state
    }
}