export default function reducer(state = {
    user: {email: '', password: '', passwordAgain: '', phoneNumber: '', isLoggedIn: false},
    error: null
}, action) {
    switch (action.type) {
        case 'UPDATE_EMAIL': {
            return {...state, user: {...state.user, email: action.payload}, error: null}
        }
        case 'EMAIL_NOT_VALID': {
            return {
                ...state,
                user: {...state.user, email: action.payload},
                error: "That's not a valid email address"
            }
        }
        case 'EMAIL_VALID': {
            return {...state, user: {...state.user, email: action.payload}, error: null}
        }
        case 'SET_PASSWORD': {
            return {...state, user: {...state.user, password: action.payload, passwordMatched: false}, error: null}
        }
        case 'SET_PASSWORD_AGAIN': {
            return {...state, user: {...state.user, passwordAgain: action.payload, passwordMatched: false}, error: null}
        }
        case 'PASSWORD_NOT_VALID': {
            return {...state, user: {...state.user, password: action.payload, passwordMatched: false}}
        }
        case 'PASSWORD_NOT_MATCHED': {
            return {...state, user: {...state.user, passwordAgain: action.payload, passwordMatched: false}}
        }
        case 'PASSWORD_MATCHED': {
            return {...state, user: {...state.user, passwordMatched: true}}
        }
        case 'REGISTER_FAILED': {
            return {...state, error: action.payload.invalidCredentialsMessage, user: {...state.user, passwordMatched: false}}
        }
        case 'LOGIN_SUCCEEDED': {
            return {...state, user: {...state.user, password: '', passwordAgain: '', isLoggedIn: true, busy: false},
                error: null}
        }
        case 'LOGIN_IN_PROGRESS': {
            return {...state, user: {...state.user, busy: true}, error: null}
        }
        case 'LOGIN_FAILED': {
            return {...state, user: {...state.user, busy: false}, error: action.payload.invalidCredentialsMessage}
        }
        case 'UNREGISTER_SUCCEEDED': {
            return {...state, user: {email: '', password: '', passwordAgain: '', phoneNumber: '', unregistered: true,
                isLoggedIn: false, hasSentForgottenPassword: false, passwordReset: false}, error: null}
        }
        case 'FORGOT_PASSWORD_SENT': {
            return {...state, user: {...state.user, hasSentForgottenPassword: true}, error: null}
        }
        case 'FORGOT_PASSWORD_SENT_FAILED': {
            return {...state, error: action.payload}
        }
        case 'PASSWORD_RESET': {
            return {...state, user: {...state.user, passwordReset: true}, error: null}
        }
        case 'PASSWORD_RESET_FAILED': {
            return {...state,  user: {...state.user, passwordReset: false}, error: action.payload}
        }
        case 'SET_CODE': {
            return {...state, user: {...state.user, resetCode: action.payload}, error: null}
        }
        case 'INIT': {
            return {...state, user: {...state.user, password: '', passwordAgain: '', phoneNumber: '', passwordMatched: false, isLoggedIn: false, hasSentForgottenPassword: false, resetCode: null, passwordReset: false},
                error: null
            }
        }
        case 'RESET': {
            return {...state, user: {...state.user, email: '', password: '', passwordAgain: '', phoneNumber: '', passwordMatched: false, isLoggedIn: false, isLoggedOut: false, hasSentForgottenPassword: false, resetCode: null, passwordReset: false},
                error: null
            }
        }
        case 'REGISTER_SUCCEEDED': {
            return {...state, user: {...state.user, email: '', password: '', passwordAgain: '', phoneNumber: '', passwordMatched: false, isLoggedIn: false, hasSentForgottenPassword: false, resetCode: null, passwordReset: false},
                error: null
            }
        }
        case 'LOGGED_OUT': {
            return {...state, user: {...state.user, password: '', passwordAgain: '', phoneNumber: '', passwordMatched: false, isLoggedIn: false, isLoggedOut: true, hasSentForgottenPassword: false, resetCode: null, passwordReset: false},
                error: null
            }
        }
        case 'CLEAR_LOGGED_OUT': {
            return {...state, user: {...state.user, isLoggedOut: false}
            }
        }
        case 'UNREGISTER_FAILED': {
            return {...state, user: {...state.user, email: '', password: '', passwordAgain: '', phoneNumber: '', passwordMatched: false, isLoggedIn: false, hasSentForgottenPassword: false, resetCode: null, passwordReset: false},
                error: null
            }
        }
        default:
            return state
    }
}